/**
 * 카카오 로그인 요청
 */
export interface PostKakaoLoginRequest {
  authorizationCode: string;
  redirectUri: string;
}
