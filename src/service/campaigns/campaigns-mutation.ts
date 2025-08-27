import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

import { useMutation } from '@tanstack/react-query';

import { postPresignedUrl } from '../images/images-api';
import { ImageExtension } from '../images/types';

import {
  postApplicationsReject,
  postApplicationsSelect,
  postCampaign,
  postCampaignApplicate,
  postMissionReview,
} from './campaigns-api';
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

      // 캠페인 등록
      await postCampaign(requestData);
    },
    onSuccess: () => {
      toast.success('캠페인 등록이 완료되었어요.', { position: 'top-center' });
      router.push('/mypage');
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
  });
}

/**
 * 지원자 선정 뮤테이션
 */
export function usePostApplicationsSelectMutation(campaignId: number, applicationId: number[]) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => postApplicationsSelect(campaignId, applicationId),
    onSuccess: () => {
      // 선정, 대기 지원자 쿼리 초기화
      queryClient.invalidateQueries({
        queryKey: ['campaigns', 'applications'],
        // PENDING, SELECTED 상태의 쿼리만 무효화
        predicate: query => {
          const queryKey = query.queryKey;
          return (
            queryKey.includes(campaignId) &&
            (queryKey.includes('PENDING') || queryKey.includes('SELECTED'))
          );
        },
      });
    },
    onError: () => {
      toast.error('지원자 선정을 실패했어요. 잠시 후 다시 시도해주세요.', {
        position: 'top-center',
      });
    },
  });
}

/**
 * 지원자 거절(반려) 뮤테이션
 */
export function usePostApplicationsRejectMutation(campaignId: number, applicationId: number[]) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => postApplicationsReject(campaignId, applicationId),
    onSuccess: () => {
      // 대기, 거절 지원자 쿼리 초기화
      queryClient.invalidateQueries({
        queryKey: ['campaigns', 'applications'],
        // PENDING, REJECTED 상태의 쿼리만 무효화
        predicate: query => {
          const queryKey = query.queryKey;
          return (
            queryKey.includes(campaignId) &&
            (queryKey.includes('PENDING') || queryKey.includes('REJECTED'))
          );
        },
      });
    },
  });
}

/**
 * 미션 검토 뮤테이션
 */
export function usePostMissionReviewMutation() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: postMissionReview,
    onSuccess: () => {
      // 대기, 거절 지원자 쿼리 초기화
      queryClient.invalidateQueries({
        queryKey: ['campaigns', 'applications'],
        // SELECTED, COMPLETED 상태의 쿼리만 무효화
        predicate: query => {
          const queryKey = query.queryKey;
          return queryKey.includes('SELECTED') || queryKey.includes('COMPLETED');
        },
      });
    },
  });
}
