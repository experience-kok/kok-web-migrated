import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { removeAllTokens } from '@/lib/cookie-utils';

import { userAtom } from '@/stores/user.atom';

import { useMutation } from '@tanstack/react-query';

import { postLogout } from './auth-api';

export function useLogoutMutation() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {
      toast.info('로그아웃이 완료되었어요.', { position: 'top-center' });

      // 유저 정보 삭제
      setUser(null);
      localStorage.removeItem('user');

      // 쿠키 삭제
      removeAllTokens();

      router.push('/');
    },
  });
}
