import { createQueryKeys } from '@lukemorales/query-key-factory';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getSNSPlatforms, getUsersProfile } from './users-api';

// users 쿼리키
export const usersQueryKeys = createQueryKeys('users', {
  profile: () => ({
    queryKey: ['my'],
    queryFn: () => getUsersProfile(),
  }),
  sns: () => ({
    queryKey: ['list'],
    queryFn: () => getSNSPlatforms(),
  }),
});

export function useGetUsersProfile() {
  return useSuspenseQuery(usersQueryKeys.profile());
}

// 유저가 등록한 SNS 플랫폼 요청 쿼리
export function useGetSNSPlatforms() {
  return useSuspenseQuery(usersQueryKeys.sns());
}
