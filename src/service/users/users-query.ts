import { createQueryKeys } from '@lukemorales/query-key-factory';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getUsersProfile } from './users-api';

// users 쿼리키
export const usersQueryKeys = createQueryKeys('users', {
  profile: () => ({
    queryKey: ['my'],
    queryFn: () => getUsersProfile(),
  }),
});

export function useGetUsersProfile() {
  return useSuspenseQuery(usersQueryKeys.profile());
}
