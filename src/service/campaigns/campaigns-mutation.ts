import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

import { useMutation } from '@tanstack/react-query';

import { postPresignedUrl } from '../images/images-api';
import { ImageExtension } from '../images/types';

import { postCampaign, postCampaignApplicate } from './campaigns-api';
import { campaignsQueryKeys } from './campaigns-query';
import { PostCampaignRequest } from './types';

/**
 * 캠페인 등록 뮤테이션
 */
export function usePostCampaignMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      file,
      campaignData,
    }: {
      file: File;
      campaignData: Omit<PostCampaignRequest, 'thumbnailUrl'>;
    }) => {
      // 파일 확장자 추출
      const fileExtension = file.name.split('.').pop() as ImageExtension;

      // presigned-url 발급
      const { presignedUrl } = await postPresignedUrl(fileExtension, 'campaign');

      // 발급 받은 url에 이미지 업로드
      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
      });

      const requestData: PostCampaignRequest = {
        thumbnailUrl: presignedUrl,
        ...campaignData,
      };
      console.log(requestData);

      // 캠페인 등록
      await postCampaign(requestData);
    },
    onSuccess: () => {
      toast.success('캠페인 등록이 완료되었어요.', { position: 'top-center' });
      router.push('/campaign/manage');
    },
    onError: () => {
      toast.error('캠페인 등록을 실패했어요.', {
        position: 'top-center',
      });
    },
  });
}

/**
 * 캠페인 지원 뮤테이션
 */
export function usePostCampaignApplicateMutation(campaignId: number) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: postCampaignApplicate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: campaignsQueryKeys.applicate(campaignId).queryKey,
      });

      toast.success('캠페인 지원을 완료했어요.', {
        position: 'top-center',
      });
    },
    onError: () => {
      toast.error('캠페인 지원을 실패했어요.', {
        position: 'top-center',
      });
    },
  });
}
