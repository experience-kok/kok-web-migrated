import { fetchKok } from '@/lib/fetcher';

import { GetPopularCampaignsRequest, GetPopularCampaignsResponse } from './types';

/**
 * 인기 캠페인 조회
 * @returns 인기 캠페인 목록
 */
export async function getPopularCampaigns({
  page,
  size,
  categoryType,
  campaignType,
}: GetPopularCampaignsRequest) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (size) queryParams.set('size', size.toString());
  if (categoryType) queryParams.set('categoryType', categoryType);
  if (campaignType) queryParams.set('campaignType', campaignType);

  const response = await fetchKok.get<GetPopularCampaignsResponse>(
    `/campaigns/popular?${queryParams.toString()}`,
    {
      requiresAuth: false,
    },
  );

  return response;
}
