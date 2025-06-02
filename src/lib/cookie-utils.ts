import { cookies } from 'next/headers';

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
  // 서버 사이드: Next.js cookies() 사용
  if (typeof window === 'undefined') {
    try {
      const cookieStore = await cookies();
      return cookieStore.get(name)?.value || null;
    } catch (error) {
      console.warn(`서버 쿠키 "${name}" 가져오기 실패:`, error);
      return null;
    }
  }

  // 클라이언트 사이드: document.cookie 파싱
  if (typeof window !== 'undefined') {
    const cookieMatch = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
  }

  return null;
}

/**
 * 쿠키 값을 설정하는 함수입니다.
 * @description 클라이언트 사이드에서만 사용 가능합니다.
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param options 쿠키 옵션
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof window === 'undefined') {
    console.warn(
      'setCookie는 클라이언트 사이드에서만 사용 가능합니다. 서버 사이드 쿠키 설정은 Next.js API 라우트 또는 미들웨어를 사용하세요.',
    );
    return;
  }

  const {
    maxAge,
    expires,
    path = '/',
    domain,
    secure = window.location.protocol === 'https:',
    sameSite = 'lax',
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}`;

  if (maxAge !== undefined) {
    cookieString += `; max-age=${maxAge}`;
  }

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * 쿠키 값을 제거하는 함수입니다.
 * @description 클라이언트 사이드에서만 사용 가능합니다.
 * @param name 쿠키 이름
 * @param options 쿠키 옵션
 */
export function removeCookie(
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {},
): void {
  if (typeof window === 'undefined') {
    console.warn('removeCookie는 클라이언트 사이드에서만 사용 가능합니다.');
    return;
  }

  const { path = '/', domain } = options;

  setCookie(name, '', {
    ...options,
    maxAge: 0,
    expires: new Date(0),
    path,
    domain,
  });
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
 * @description 클라이언트 사이드에서만 사용 가능합니다.
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
 * @description 클라이언트 사이드에서만 사용 가능합니다.
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
 * @description 클라이언트 사이드에서만 사용 가능합니다.
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
 * @description 클라이언트 사이드에서만 사용 가능합니다.
 */
export function removeAccessToken(): void {
  removeCookie('accessToken');
}

/**
 * 리프레시 토큰을 제거하는 함수입니다.
 * @description 클라이언트 사이드에서만 사용 가능합니다.
 */
export function removeRefreshToken(): void {
  removeCookie('refreshToken');
}

/**
 * 액세스 토큰과 리프레시 토큰을 제거하는 함수입니다.
 * @description 클라이언트 사이드에서만 사용 가능합니다.
 */
export function removeAllTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}
