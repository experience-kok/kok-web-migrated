import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { removeAllTokens } from '@/lib/cookie-utils';
import { setTokens } from '@/lib/cookie-utils';

import { userAtom } from '@/stores/user.atom';

import { useMutation } from '@tanstack/react-query';

import { postLogin, postLogout } from './auth-api';

export function useLoginMutation() {
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: data => {
      const { loginType, user, accessToken, refreshToken } = data;

      setTokens(accessToken, refreshToken);
      setUser(user);

      if (loginType === 'login') {
        router.push('/');

        setTimeout(() => {
          toast.success(`${user.nickname}님, 환영해요!`, {
            position: 'top-center',
            duration: 3000,
          });
        }, 1000);
      }
      // 회원가입시 환영 페이지로 이동
      else if (loginType === 'registration') {
        router.push('/welcome');
      }
    },
    onError: error => {
      toast.error(error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.', {
        position: 'top-center',
        duration: 3000,
      });
      router.push('/login');
    },
  });
}

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
