import { fetcher } from '@/lib/fetcher';

import { ImageExtension, PostPresignedUrlResponse, UploadType } from './types';

/**
 * 이미지 업로드용 presigned-url 발급
 */
export async function postPresignedUrl(fileExtension: ImageExtension, uploadType: UploadType) {
  const requestBody = {
    fileExtension,
  };

  const response = await fetcher.post<PostPresignedUrlResponse>(
    `/images/${uploadType}/presigned-url`,
    requestBody,
    {
      requiresAuth: true,
    },
  );

  return response;
}
