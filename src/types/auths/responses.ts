import { User } from '@/types/users/models';

import { LoginType } from './models';

/**
 * 신규 유저 로그인 응답
 * 회원가입시 신규 유저일 경우 동의 항목을 받아야합니다.
 */
export interface NewUserLoginResponse {
  loginType: Extract<LoginType, 'consentRequired'>;
  tempToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
  };
}

/**
 * 기존 유저 로그인 응답
 * 기존에 가입된 유저일 경우 동의 항목을 받지 않고 메인 페이지로 이동합니다.
 */
export interface ExistingUserLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  loginType: Exclude<LoginType, 'consentRequired'>;
}

/**
 * 유저 로그인 응답
 * 유저 로그인은 2가지로 분리되며 아래 유니온 타입에 포함됩니다.
 *
 * /api/auth/login, api/auth/kakao API를 이용해 로그인시 아래 타입을 반환합니다.
 */
export type LoginResponse = ExistingUserLoginResponse | NewUserLoginResponse;

/**
 * 동의 완료 및 회원가입 성공 응답
 */
export interface PostConsentRespones {
  loginType: Exclude<LoginType, 'consentRequired'>;
  user: User;
  accessToken: string;
  refreshToken: string;
}
