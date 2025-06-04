import { User } from '@/models/user';

/**
 * 카카오 로그인 요청
 */
export interface PostKakaoLoginRequest {
  authorizationCode: string;
  redirectUri: string;
}
export interface PostKakaoLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  loginType: 'registration' | 'login';
}
