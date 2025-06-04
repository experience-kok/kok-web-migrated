import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { postLogout } from './auth-api';

export function useLogoutMutation() {
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      toast.info('로그아웃이 완료되었어요.', { position: 'top-center' });
    },
    onError: () => {},
  });
}
