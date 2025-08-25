import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { isFetcherError } from '@/lib/fetcher';
import { User } from '@/models/user';
import { EditForm } from '@/schemas/profile.schemas';

import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

import { userAtom } from '@/stores/user.atom';

import { getSNSPlatformsErrorMessage } from '@/types/users/errors';
import { PutProfileRequest } from '@/types/users/requests';

import { useMutation } from '@tanstack/react-query';

import { postPresignedUrl } from '../images/images-api';
import { ImageExtension } from '../images/types';

import { postSNSPlatform, putProfile } from './users-api';
import { usersQueryKeys } from './users-query';

/**
 * 프로필 수정 뮤테이션
 */
export function usePutProfileMutation() {
  const queryClient = getQueryClient();
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: async ({ file, userData }: { file?: File | string; userData: EditForm }) => {
      let profileImageUrl: string;

      // 타입가드 함수들
      const isFile = (value: File | string | undefined): value is File => {
        return value instanceof File;
      };

      const isString = (value: File | string | undefined): value is string => {
        return typeof value === 'string';
      };

      if (isString(file)) {
        // file이 string인 경우 (기존 이미지 URL)
        profileImageUrl = file;
      } else if (isFile(file)) {
        // file이 File 객체인 경우 (새로 업로드하는 파일)
        // 파일 확장자 추출
        const fileExtension = file.name.split('.').pop() as ImageExtension;

        // presigned-url 발급
        const { presignedUrl } = await postPresignedUrl(fileExtension, 'profile');

        // 발급 받은 url에 이미지 업로드
        await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
        });

        profileImageUrl = presignedUrl;
      } else {
        // file이 undefined인 경우 (기존 프로필 이미지 유지)
        const cachedUserData = queryClient.getQueryData(usersQueryKeys.profile().queryKey) as
          | User
          | undefined;

        profileImageUrl = cachedUserData?.profileImage || '';

        console.log('Using cached profile image:', profileImageUrl);
      }

      const requestData: PutProfileRequest = {
        ...userData,
        profileImage: profileImageUrl,
      };

      // 유저 정보 수정
      const response = await putProfile(requestData);

      return response;
    },
    onSuccess: ({ user }) => {
      // 이전 상태를 가져와서 새로운 상태 생성
      const prevUser = JSON.parse(localStorage.getItem('user') || 'null');

      // user 객체를 직접 저장
      const newUser = {
        ...prevUser,
        profileImage: user.profileImage,
      } as User;

      // localStorage에 user 객체 직접 저장
      localStorage.setItem('user', JSON.stringify(newUser));

      // atom 상태도 user 객체로 직접 업데이트
      setUser(newUser);

      toast.success('프로필 정보를 성공적으로 업데이트했어요.', {
        position: 'top-center',
      });

      // 프로필 정보 변경 완료시 유저 정보 리패칭
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.profile().queryKey,
      });

      router.push('/mypage');
    },
    onError: () => {
      toast.error('프로필 정보 변경을 실패했어요.', {
        position: 'top-center',
      });
    },
  });
}

/**
 * SNS 등록 뮤테이션
 */
export function usePostSNSPlatform() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: postSNSPlatform,

    onSuccess: () => {
      // SNS 플랫폼 목록 초기화
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.sns().queryKey,
      });
      toast.success('SNS 연결을 성공했어요.', {
        position: 'top-center',
      });
    },
    onError: error => {
      let errorMessage = 'SNS 연결을 실패했어요.';
      if (isFetcherError(error) && error.data?.errorCode) {
        const errorCode = error?.data?.errorCode;
        errorMessage = getSNSPlatformsErrorMessage(errorCode);
      }

      toast.error(errorMessage, {
        position: 'top-center',
      });
    },
  });
}
