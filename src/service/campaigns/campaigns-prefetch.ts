import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

import { getDeliveryCampaigns, getVisitCampaigns } from './campaigns-api';
import { GetDeliveryCampaignsRequest, GetVisitCampaignsRequest } from './types';

/**
 * 배송 캠페인 조회 데이터 미리 가져오기
 * @returns 쿼리 클라이언트
 */
export function prefetchDeliveryCampaigns({
  size,
  categoryName,
  campaignTypes,
  sort,
}: GetDeliveryCampaignsRequest) {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery({
    queryKey: ['campaigns', 'delivery', size, categoryName, campaignTypes, sort],
    queryFn: ({ pageParam = 1 }) =>
      getDeliveryCampaigns({
        page: pageParam,
        size,
        categoryName,
        campaignTypes,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: data => {
      if (data.pagination.last) {
        return undefined;
      }
      return data.pagination.pageNumber + 1;
    },
    pages: 1, // 첫 번째 페이지만 prefetch
  });

  return queryClient;
}

/**
 * 방문 캠페인 조회 데이터 미리 가져오기
 * @return 쿼리 클라이언트
 */
export function prefetchVisitCampaigns({
  size,
  categoryName,
  campaignTypes,
  sort,
}: GetVisitCampaignsRequest) {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery({
    queryKey: ['campaigns', 'visit', size, categoryName, campaignTypes, sort],
    queryFn: ({ pageParam = 1 }) =>
      getVisitCampaigns({
        page: pageParam,
        size,
        categoryName,
        campaignTypes,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: data => {
      if (data.pagination.last) {
        return undefined;
      }
      return data.pagination.pageNumber + 1;
    },
    pages: 1, // 첫 번째 페이지만 prefetch
  });

  return queryClient;
}
