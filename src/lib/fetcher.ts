import { errorCode } from '@/types/error-code';
import { ErrorResponse, SuccessResponse } from '@/types/response';

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeAllTokens,
  setRefreshToken,
} from './cookie-utils';

export interface FetcherConfig {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
  requiresAuth?: boolean;
  token?: string;
}

export class FetcherError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: ErrorResponse,
    public url?: string,
  ) {
    super(`Fetcher Error: ${status} ${statusText}`);
    this.name = 'FetcherError';
  }

  get errorCode(): string | undefined {
    return this.data?.errorCode;
  }
}

export function isFetcherError(error: unknown): error is FetcherError {
  return (
    error instanceof Error && error.name === 'FetcherError' && 'status' in error && 'data' in error
  );
}

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

export class CustomFetcher {
  private config: Required<FetcherConfig>;
  private refreshPromise: Promise<string> | null = null;
  private requestQueue: QueuedRequest[] = [];

  constructor(config: FetcherConfig = {}) {
    this.config = {
      baseURL: config.baseURL || this.getDefaultBaseURL(),
      timeout: config.timeout || 10000,
      defaultHeaders: {
        'Content-Type': 'application/json',
        ...config.defaultHeaders,
      },
    };
  }

  private getDefaultBaseURL(): string {
    return process.env.NEXT_PUBLIC_KOK_BASE_URL || 'https://chkok.kr/api';
  }

  private async getAuthToken(token?: string): Promise<string | null> {
    if (token) return token;
    return await getAccessToken();
  }

  private createAbortController(timeout: number) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    return { controller, timeoutId };
  }

  private redirectToLogin(): void {
    removeAllTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      // 리프레시 토큰이 없을 때 로그인 페이지로 리다이렉트
      this.redirectToLogin();
      throw new FetcherError(401, 'Unauthorized', {
        errorCode: errorCode.UNAUTHORIZED,
        status: 401,
        message: 'No refresh token available',
        success: false,
      });
    }

    try {
      // 현재 (만료된) 액세스 토큰 가져오기
      const currentAccessToken = await getAccessToken();

      // 액세스 토큰 리프레시 - Authorization 헤더에 현재 토큰 추가
      console.log('토큰 요청');

      // Create a direct fetch request to avoid recursion
      const url = `${this.config.baseURL}/auth/refresh`;
      const headers: Record<string, string> = {
        ...this.config.defaultHeaders,
      };

      if (currentAccessToken) {
        headers.Authorization = `Bearer ${currentAccessToken}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const refreshResponse = await response.json();
      let tokenData: { accessToken: string; refreshToken: string };

      // Handle both SuccessResponse and direct response formats
      if (refreshResponse.success === true && refreshResponse.data) {
        tokenData = refreshResponse.data;
      } else {
        tokenData = refreshResponse;
      }

      // 새로운 액세스 토큰 저장
      setAccessToken(tokenData.accessToken);
      setRefreshToken(tokenData.refreshToken);

      return tokenData.accessToken;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (refreshError) {
      // 리프레시 실패, 로그아웃
      this.redirectToLogin();
      throw new FetcherError(401, 'Unauthorized', {
        errorCode: errorCode.TOKEN_REFRESH_ERROR,
        status: 401,
        message: 'Token refresh failed',
        success: false,
      });
    }
  }

  private async getValidToken(): Promise<string> {
    // If there's already a refresh in progress, wait for it
    if (this.refreshPromise) {
      try {
        return await this.refreshPromise;
      } catch (error) {
        // If the current refresh fails, clear it and let the new request try
        this.refreshPromise = null;
        throw error;
      }
    }

    // Start a new refresh process
    this.refreshPromise = this.performTokenRefresh();

    try {
      const newToken = await this.refreshPromise;

      // Process queued requests
      const queue = [...this.requestQueue];
      this.requestQueue = [];

      queue.forEach(({ resolve }) => {
        resolve(newToken);
      });

      return newToken;
    } catch (error) {
      // Reject all queued requests
      const queue = [...this.requestQueue];
      this.requestQueue = [];

      queue.forEach(({ reject }) => {
        reject(error as Error);
      });

      throw error;
    } finally {
      // Clear the refresh promise
      this.refreshPromise = null;
    }
  }

  private async waitForTokenRefresh(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.requestQueue.push({ resolve, reject });
    });
  }

  private async refreshTokenAndRetry<T>(url: string, options: RequestOptions): Promise<T> {
    let newToken: string;

    if (this.refreshPromise) {
      // If refresh is already in progress, wait for it
      newToken = await this.waitForTokenRefresh();
    } else {
      // Start new refresh
      newToken = await this.getValidToken();
    }

    // 원래 요청 다시 시도
    return this.request<T>(url, {
      ...options,
      token: newToken,
    });
  }

  private async handleAuthError<T>(
    error: FetcherError,
    endpoint: string,
    options: RequestOptions,
  ): Promise<T> {
    const errorCodeValue = error.errorCode;

    // 인증 오류시 로그인 페이지로 리다이렉트
    if (
      errorCodeValue === errorCode.UNAUTHORIZED ||
      errorCodeValue === errorCode.TOKEN_REFRESH_ERROR
    ) {
      this.redirectToLogin();
      throw error;
    }

    // 토큰 만료시 토큰 리프레시
    if (errorCodeValue === errorCode.TOKEN_EXPIRED) {
      return this.refreshTokenAndRetry<T>(endpoint, options);
    }

    // 401 에러 코드가 없을 때 토큰 리프레시
    if (error.status === 401 && options.requiresAuth && !options.token) {
      return this.refreshTokenAndRetry<T>(endpoint, options);
    }

    throw error;
  }

  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      timeout = this.config.timeout,
      requiresAuth = false,
      token,
      headers = {},
      ...fetchOptions
    } = options;

    // 기본 URL 결정
    const baseURL = this.config.baseURL;
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const { controller, timeoutId } = this.createAbortController(timeout);

    try {
      // 헤더 준비
      const requestHeaders: Record<string, string> = {
        ...this.config.defaultHeaders,
      };

      // RequestInit에서 다른 헤더 타입 처리
      if (headers) {
        if (headers instanceof Headers) {
          // Headers 객체 변환
          headers.forEach((value, key) => {
            requestHeaders[key] = value;
          });
        } else if (Array.isArray(headers)) {
          // 배열 형식의 [key, value] 쌍 변환
          headers.forEach(([key, value]) => {
            requestHeaders[key] = value;
          });
        } else {
          // Record<string, string> 형식 가정
          Object.assign(requestHeaders, headers);
        }
      }

      // 인증 처리
      if (requiresAuth || token) {
        const authToken = await this.getAuthToken(token);
        if (authToken) {
          requestHeaders.Authorization = `Bearer ${authToken}`;
        } else if (requiresAuth) {
          this.redirectToLogin();
          removeAllTokens();
          throw new FetcherError(401, 'Unauthorized', {
            errorCode: errorCode.UNAUTHORIZED,
            status: 401,
            message: 'No access token found',
            success: false,
          });
        }
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers: requestHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData: ErrorResponse;
        try {
          const jsonData = await response.json();

          if (jsonData.success === false && jsonData.errorCode) {
            errorData = jsonData as ErrorResponse;
          } else {
            // 에러 타입 변환
            errorData = {
              errorCode: jsonData.errorCode || jsonData.code || 'UNKNOWN_ERROR',
              status: response.status,
              message: jsonData.message || response.statusText,
              success: false,
            };
          }
        } catch {
          const textData = await response.text();
          errorData = {
            errorCode: 'PARSE_ERROR',
            status: response.status,
            message: textData || response.statusText,
            success: false,
          };
        }

        const fetcherError = new FetcherError(response.status, response.statusText, errorData, url);

        // Handle authentication errors
        if (response.status === 401) {
          return this.handleAuthError<T>(fetcherError, endpoint, options);
        }

        throw fetcherError;
      }

      // Handle successful response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return (await response.text()) as T;
      }

      const jsonResponse = await response.json();

      // Check if it's a SuccessResponse format
      if (jsonResponse.success === true && jsonResponse.data !== undefined) {
        const successResponse = jsonResponse as SuccessResponse<unknown>;
        return successResponse.data as T;
      }

      // Return raw response if not in SuccessResponse format
      return jsonResponse as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new FetcherError(
          408,
          'Request Timeout',
          {
            errorCode: 'TIMEOUT',
            status: 408,
            message: 'Request timed out',
            success: false,
          },
          url,
        );
      }

      throw error;
    }
  }

  // HTTP method convenience functions
  async get<T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method'>,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method'>,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method'>,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create default instance
export const fetcher = new CustomFetcher();
