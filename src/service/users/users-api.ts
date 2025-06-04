import { fetcher } from '@/lib/fetcher';

import { GetUsersProfileResponse } from './types';

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
