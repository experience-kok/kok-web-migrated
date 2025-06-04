import {
  getCookie as cookiesGetCookie,
  setCookie as cookiesSetCookie,
  deleteCookie,
} from 'cookies-next';

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * 쿠키 값을 가져오는 함수입니다.
 * @description 서버 사이드와 클라이언트 사이드 모두 사용 가능합니다.
 * @param name 쿠키 이름
 * @returns 쿠키 값
 */
export async function getCookie(name: string): Promise<string | null> {
  try {
    const value = cookiesGetCookie(name);
    return typeof value === 'string' ? value : null;
  } catch (error) {
    console.warn(`쿠키 "${name}" 가져오기 실패:`, error);
    return null;
  }
}

/**
 * 쿠키 값을 설정하는 함수입니다.
 * @description 서버 사이드와 클라이언트 사이드 모두 사용 가능합니다.
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param options 쿠키 옵션
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  try {
    const {
      maxAge,
      expires,
      path = '/',
      domain,
      secure = typeof window !== 'undefined' && window.location.protocol === 'https:',
      httpOnly,
      sameSite = 'lax',
    } = options;

    cookiesSetCookie(name, value, {
      maxAge,
      expires,
      path,
      domain,
      secure,
      httpOnly,
      sameSite,
    });
  } catch (error) {
    console.warn(`쿠키 "${name}" 설정 실패:`, error);
  }
}

/**
 * 쿠키 값을 제거하는 함수입니다.
 * @description 서버 사이드와 클라이언트 사이드 모두 사용 가능합니다.
 * @param name 쿠키 이름
 * @param options 쿠키 옵션
 */
export function removeCookie(
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {},
): void {
  try {
    const { path = '/', domain } = options;
    deleteCookie(name, { path, domain });
  } catch (error) {
    console.warn(`쿠키 "${name}" 제거 실패:`, error);
  }
}

/**
 * 액세스 토큰을 가져오는 함수입니다.
 * @returns 액세스 토큰
 */
export async function getAccessToken(): Promise<string | null> {
  return getCookie('accessToken');
}

/**
 * 리프레시 토큰을 가져오는 함수입니다.
 * @returns 리프레시 토큰
 */
export async function getRefreshToken(): Promise<string | null> {
  return getCookie('refreshToken');
}

/**
 * 액세스 토큰을 설정하는 함수입니다.
 * @param token 액세스 토큰
 * @param options 쿠키 옵션
 */
export function setAccessToken(token: string, options: CookieOptions = {}): void {
  const defaultOptions: CookieOptions = {
    maxAge: 60 * 15, // 15 minutes (short-lived)
    secure: true,
    sameSite: 'lax',
    ...options,
  };

  setCookie('accessToken', token, defaultOptions);
}

/**
 * 리프레시 토큰을 설정하는 함수입니다.
 * @param token 리프레시 토큰
 * @param options 쿠키 옵션
 */
export function setRefreshToken(token: string, options: CookieOptions = {}): void {
  const defaultOptions: CookieOptions = {
    maxAge: 60 * 60 * 24 * 7, // 7 days (long-lived)
    secure: true,
    sameSite: 'lax',
    httpOnly: false, // Note: client-side accessible for token refresh
    ...options,
  };

  setCookie('refreshToken', token, defaultOptions);
}

/**
 * 액세스 토큰과 리프레시 토큰을 설정하는 함수입니다.
 * @param accessToken 액세스 토큰
 * @param refreshToken 리프레시 토큰
 * @param options 쿠키 옵션
 */
export function setTokens(
  accessToken: string,
  refreshToken: string,
  options: { access?: CookieOptions; refresh?: CookieOptions } = {},
): void {
  setAccessToken(accessToken, options.access);
  setRefreshToken(refreshToken, options.refresh);
}

/**
 * 액세스 토큰을 제거하는 함수입니다.
 */
export function removeAccessToken(): void {
  removeCookie('accessToken');
}

/**
 * 리프레시 토큰을 제거하는 함수입니다.
 */
export function removeRefreshToken(): void {
  removeCookie('refreshToken');
}

/**
 * 액세스 토큰과 리프레시 토큰을 제거하는 함수입니다.
 */
export function removeAllTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}
