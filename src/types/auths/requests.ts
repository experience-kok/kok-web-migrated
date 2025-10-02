/**
 * POST /api/auth/consent 동의 완료 요청
 */
export interface PostConsentRequest {
  tempToken: string;
  agreements: {
    termsAgreed: boolean;
    privacyPolicyAgreed: boolean;
  };
}

/**
 * POST /api/auth/login 이메일 로그인 요청
 */
export interface PostLoginRequest {
  email: string;
  password: string;
}

/**
 * POST /api/auth/kakao 카카오 로그인 요청
 */
export interface PostKakaoLoginRequest {
  authorizationCode: string;
  redirectUri: string;
}
