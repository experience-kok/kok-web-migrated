import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { User } from '@/models/user';

export const userAtom = atomWithStorage<User | null>('user', null);

// 로그인 상태 확인
export const isLoggedInAtom = atom(get => {
  const user = get(userAtom);
  return !!user;
});
