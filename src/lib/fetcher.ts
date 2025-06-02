import { errorCode } from '@/types/error-code';
import { ErrorResponse, SuccessResponse } from '@/types/response';

import { getAccessToken, getRefreshToken, setAccessToken, removeAllTokens } from './cookie-utils';

export interface FetcherConfig {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
  requiresAuth?: boolean;
  token?: string;
  useKokAPI?: boolean; // KOK API를 사용하는지 BFF를 사용하는지 확인하는 플래그
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
    // 기본 BFF 엔드포인트
    return process.env.NEXT_PUBLIC_BFF_BASE_URL || 'http://localhost:3000/bff';
  }

  private getBaseURL(useKokAPI?: boolean): string {
    if (useKokAPI) {
      return process.env.NEXT_PUBLIC_KOK_BASE_URL || 'https://ckok.kr/api';
    }
    return process.env.NEXT_PUBLIC_BFF_BASE_URL || 'http://localhost:3000/bff';
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
      window.location.href = process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI || '/login';
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
      // BFF를 사용하여 액세스 토큰 리프레시
      const refreshResponse = await this.request<SuccessResponse<{ accessToken: string }>>(
        '/auth/refresh',
        {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
          requiresAuth: false,
          useKokAPI: false, // 항상 BFF를 사용하여 토큰 리프레시
        },
      );

      // 새로운 액세스 토큰 저장
      setAccessToken(refreshResponse.data.accessToken);

      // 원래 요청 다시 시도
      return this.request<T>(url, {
        ...options,
        token: refreshResponse.data.accessToken,
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
      useKokAPI = false,
      headers = {},
      ...fetchOptions
    } = options;

    // 기본 URL 결정
    const baseURL = this.getBaseURL(useKokAPI);
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
          // Check if it's already in ErrorResponse format
          if (jsonData.success === false && jsonData.errorCode) {
            errorData = jsonData as ErrorResponse;
          } else {
            // Transform to ErrorResponse format
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

  // Convenience methods for BFF endpoints
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

  // Convenience methods for KOK API endpoints
  async getKok<T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body' | 'useKokAPI'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET', useKokAPI: true });
  }

  async postKok<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method' | 'useKokAPI'>,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      useKokAPI: true,
    });
  }

  async putKok<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method' | 'useKokAPI'>,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      useKokAPI: true,
    });
  }

  async patchKok<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method' | 'useKokAPI'>,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      useKokAPI: true,
    });
  }

  async deleteKok<T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body' | 'useKokAPI'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE', useKokAPI: true });
  }
}

// Create default instances
export const fetcher = new CustomFetcher();

// Convenience functions using the default instance
export const fetchBFF = {
  get: <T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    fetcher.get<T>(endpoint, options),
  post: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    fetcher.post<T>(endpoint, data, options),
  put: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    fetcher.put<T>(endpoint, data, options),
  patch: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method'>,
  ) => fetcher.patch<T>(endpoint, data, options),
  delete: <T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    fetcher.delete<T>(endpoint, options),
};

export const fetchKok = {
  get: <T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body' | 'useKokAPI'>,
  ) => fetcher.getKok<T>(endpoint, options),
  post: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method' | 'useKokAPI'>,
  ) => fetcher.postKok<T>(endpoint, data, options),
  put: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method' | 'useKokAPI'>,
  ) => fetcher.putKok<T>(endpoint, data, options),
  patch: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'method' | 'useKokAPI'>,
  ) => fetcher.patchKok<T>(endpoint, data, options),
  delete: <T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body' | 'useKokAPI'>,
  ) => fetcher.deleteKok<T>(endpoint, options),
};
