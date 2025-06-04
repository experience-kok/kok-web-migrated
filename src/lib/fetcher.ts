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

export class CustomFetcher {
  private config: Required<FetcherConfig>;

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
    return process.env.NEXT_PUBLIC_KOK_BASE_URL || 'https://ckok.kr/api';
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

  private async refreshTokenAndRetry<T>(url: string, options: RequestOptions): Promise<T> {
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
      const refreshResponse = await this.post<{ accessToken: string; refreshToken: string }>(
        '/auth/refresh',
        {
          refreshToken,
        },
        {
          // 현재 액세스 토큰을 Authorization 헤더에 추가
          token: currentAccessToken || undefined,
        },
      );

      // 새로운 액세스 토큰 저장
      setAccessToken(refreshResponse.accessToken);
      setRefreshToken(refreshResponse.refreshToken);

      // 원래 요청 다시 시도
      return this.request<T>(url, {
        ...options,
        token: refreshResponse.accessToken,
      });
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

      console.log('인증처리');

      // 인증 처리
      if (requiresAuth || token) {
        const authToken = await this.getAuthToken(token);
        if (authToken) {
          requestHeaders.Authorization = `Bearer ${authToken}`;
        } else if (requiresAuth) {
          console.log('토큰 없음');
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
