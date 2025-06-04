import { fetcher } from '@/lib/fetcher';

import {
  GetUsersProfileResponse,
  PatchProfileImageRequest,
  PatchProfileImageResponse,
  PutProfileRequest,
  PutProfileResponse,
} from './types';

/**
 * 내 정보 조회
 * @returns 로그인한 유저의 정보
 */
export async function getUsersProfile() {
  const response = await fetcher.get<GetUsersProfileResponse>(`/users/profile`, {
    requiresAuth: true,
  });

  return response;
}

/**
 * 내 정보 수정
 */
export async function putProfile(requestBody: PutProfileRequest) {
  const response = await fetcher.put<PutProfileResponse>(`/users/profile`, requestBody, {
    requiresAuth: true,
  });

  return response;
}

/**
 * 프로필 이미지 수정
 * @param profileImage 변경할 이미지의 주소
 */
export async function patchProfileImage({ profileImage }: PatchProfileImageRequest) {
  const requestBody = {
    profileImage,
  };
  const response = await fetcher.patch<PatchProfileImageResponse>(
    `/users/profile/image`,
    requestBody,
    { requiresAuth: true },
  );

  return response;
}
