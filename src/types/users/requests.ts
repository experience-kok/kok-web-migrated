import { Gender, SNSPlatformType } from './models';

// 프로필 이미지 수정 요청
export interface PatchProfileImageRequest {
  profileImage: string;
}

// 내 정보 수정 요청
export interface PutProfileRequest {
  nickname: string;
  profileImage: string | null;
  phone: string;
  gender: Gender;
  age: number;
}

// SNS 플랫폼 등록 요청
export interface PostPlatformsConnectRequest {
  type: SNSPlatformType;
  url: string;
}

// SNS 플랫폼 삭제 요청
