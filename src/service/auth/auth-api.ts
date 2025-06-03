import { fetchKok } from '@/lib/fetcher';

import { PostKakaoLoginRequest, PostKakaoLoginResponse } from './types';

/**
 * 카카오 로그인
 * @returns 로그인 유저 정보
 */
export async function postKakaoLogin({ authorizationCode, redirectUri }: PostKakaoLoginRequest) {
  const requestBody = {
    authorizationCode,
    redirectUri,
  };
  const response = await fetchKok.post<PostKakaoLoginResponse>(`/auth/kakao`, requestBody);

  return response;
}
