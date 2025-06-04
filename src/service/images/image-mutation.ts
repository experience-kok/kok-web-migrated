import { toast } from 'sonner';

import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

import { useMutation } from '@tanstack/react-query';

import { patchProfileImage } from '../users/users-api';
import { usersQueryKeys } from '../users/users-query';

import { postPresignedUrl } from './images-api';
import { ImageExtension } from './types';

/**
 * 프로필 이미지 업로드 뮤테이션
 */
export function usePatchProfileImageMutation() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      // 파일 확장자 추출
      const fileExtension = file.name.split('.').pop() as ImageExtension;

      // presigned-url 발급
      const { presignedUrl } = await postPresignedUrl(fileExtension, 'profile');

      // 발급 받은 url에 이미지 업로드
      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
      });

      // 프로필 이미지 업로드
      await patchProfileImage({
        profileImage: presignedUrl,
      });
    },
    onSuccess: () => {
      toast.success('프로필 이미지가 성공적으로 업데이트되었어요.', {
        position: 'top-center',
      });

      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.profile().queryKey,
      });
    },
    onError: error => {
      toast.error('프로필 이미지 등록을 실패했어요.');
      console.error(error);
    },
  });
}
