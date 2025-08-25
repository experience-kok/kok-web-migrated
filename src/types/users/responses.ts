import { SNSPlatformType, User } from './models';

/**
 * 내 정보 조회 응답
 */
export interface GetUsersProfileResponse {
  user: User;
}

// 프로필 이미지 수정 응답
export interface PatchProfileImageResponse {
  user: {
    profileImage: string;
    id: number;
  };
}

// 내 정보 수정 응답
export interface PutProfileResponse {
  user: User;
}

// SNS 플랫폼 목록 조회 응답
export interface GetSNSPlatformResponse {
  platforms: Array<{
    platformType: SNSPlatformType;
    isConnected: true;
    id?: number;
    accountUrl?: string;
  }>;
}

// SNS 플랫폼 등록 해제 응답
export interface DeleteSNSPlatformResponse {
  platformId: number;
  platformType: SNSPlatformType;
  accountUrl: string;
  message: string;
}
