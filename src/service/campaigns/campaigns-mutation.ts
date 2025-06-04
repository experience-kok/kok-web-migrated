import { useMutation } from '@tanstack/react-query';

import { postPresignedUrl } from '../images/images-api';
import { ImageExtension } from '../images/types';

import { postCampaign } from './campaigns-api';
import { PostCampaignRequest } from './types';

/**
 * 캠페인 등록 뮤테이션
 */
export function usePostCampaignMutation() {
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
    onSuccess: () => {},
  });
}
