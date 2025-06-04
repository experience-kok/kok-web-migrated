import { Gender, User } from '@/models/user';

/**
 * 내 정보 조회 응답
 */
export interface GetUsersProfileResponse {
  user: User;
}

// 프로필 이미지 수정 요청
export interface PatchProfileImageRequest {
  profileImage: string;
}

// 프로필 이미지 수정 응답
export interface PatchProfileImageResponse {
  user: {
    profileImage: string;
    id: number;
  };
}

// 내 정보 수정 요청
export interface PutProfileRequest {
  nickname: string;
  profileImage: string | null;
  phone: string;
  gender: Gender;
  age: number;
}
// 내 정보 수정 응답
export interface PutProfileResponse {
  user: User;
}
