import { useAtomValue } from 'jotai';

import { isLoggedInAtom, userAtom } from '@/stores/user.atom';

/**
 * auth 커스텀훅
 */
export function useAuth() {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return {
    isLoggedIn,
    user,
  };
}
