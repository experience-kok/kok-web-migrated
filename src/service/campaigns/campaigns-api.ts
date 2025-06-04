import { fetcher } from '@/lib/fetcher';

import {
  GetPopularCampaignsRequest,
  GetPopularCampaignsResponse,
  PostCampaignRequest,
} from './types';

/**
 * 인기 캠페인 조회
 * @returns 인기 캠페인 목록
 */
export async function getPopularCampaigns({
  page,
  size,
  categoryType,
  campaignType,
  categoryName,
}: GetPopularCampaignsRequest) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (size) queryParams.set('size', size.toString());
  if (categoryType) queryParams.set('categoryType', categoryType);
  if (campaignType) queryParams.set('campaignType', campaignType);
  if (categoryName) queryParams.set('categoryName', categoryName);

  const response = await fetcher.get<GetPopularCampaignsResponse>(
    `/campaigns/popular?${queryParams.toString()}`,
    {
      requiresAuth: false,
    },
  );

  return response;
}

/**
 * 캠페인 등록
 */
export async function postCampaign(requestBody: PostCampaignRequest) {
  const response = fetcher.post<null>(`/campaigns`, requestBody, {
    requiresAuth: true,
  });

  return response;
}
