import { fetcher } from '@/lib/fetcher';

import {
  PostConsentRequest,
  PostKakaoLoginRequest,
  PostLoginRequest,
} from '@/types/auths/requests';
import { LoginResponse, PostConsentRespones } from '@/types/auths/responses';

/**
 * POST /api/auth/kakao 카카오 로그인 API
 * @returns 로그인 유저 정보
 */
export async function postKakaoLogin({ authorizationCode, redirectUri }: PostKakaoLoginRequest) {
  const requestBody: PostKakaoLoginRequest = {
    authorizationCode,
    redirectUri,
  };
  const response = await fetcher.post<LoginResponse>(`/auth/kakao`, requestBody);

  return response;
}

/**
 * POST /api/auth/login 자체 이메일 로그인 API
 * @returns 로그인 유저 정보
 */
export async function postLogin({ email, password }: PostLoginRequest) {
  const requestBody: PostLoginRequest = {
    email,
    password,
  };
  const response = await fetcher.post<LoginResponse>(`/auth/login`, requestBody);

  return response;
}

/**
 * POST /api/auth/logout 로그아웃 API
 */
export async function postLogout() {
  const response = await fetcher.post(
    `/auth/logout`,
    {},
    {
      requiresAuth: true,
    },
  );

  return response;
}

/**
 * POST /api/auth/consent 동의 완료 API
 * 신규 회원일 경우 이용약관, 개인정보처리방침을 동의받기 위한 API입니다.
 */
export async function postConsent({ tempToken, agreements }: PostConsentRequest) {
  const requestBody: PostConsentRequest = {
    tempToken,
    agreements,
  };

  const response = await fetcher.post<PostConsentRespones>(`/auth/consent`, requestBody);

  return response;
}
