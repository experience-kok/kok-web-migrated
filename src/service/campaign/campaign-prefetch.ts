import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

import { campaignsQueryKeys } from './campaign-query';
import { GetPopularCampaignsRequest } from './types';

/**
 * 인기 캠페인 조회 데이터 미리 가져오기
 * @returns 쿼리 클라이언트
 */
export async function prefetchPopularCampaigns({
  page,
  size,
  categoryType,
  campaignType,
}: GetPopularCampaignsRequest) {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    campaignsQueryKeys.popular({ page, size, categoryType, campaignType }),
  );

  return queryClient;
}
