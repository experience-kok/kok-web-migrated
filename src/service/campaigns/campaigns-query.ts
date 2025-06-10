import { createQueryKeys } from '@lukemorales/query-key-factory';

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  getCampaignApplicateCheck,
  getDeliveryCampaigns,
  getMyCampaigns,
  getPopularCampaigns,
  getVisitCampaigns,
} from './campaigns-api';
import {
  GetDeliveryCampaignsRequest,
  GetPopularCampaignsRequest,
  GetVisitCampaignsRequest,
} from './types';

// campaigns 쿼리키
export const campaignsQueryKeys = createQueryKeys('campaigns', {
  // 인기 캠페인
  popular: ({
    page,
    size,
    categoryType,
    campaignType,
    categoryName,
  }: GetPopularCampaignsRequest) => ({
    queryKey: ['popular', page, size, categoryType, campaignType, categoryName],
    queryFn: () => getPopularCampaigns({ page, size, categoryType, campaignType, categoryName }),
  }),
  // delivery: ({ page, size, categoryName, campaignTypes, sort }: GetDeliveryCampaignsRequest) => ({
  //   queryKey: [page, size, categoryName, campaignTypes, sort],
  //   queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
  //     getDeliveryCampaigns({
  //       page: pageParam,
  //       size,
  //       categoryName,
  //       campaignTypes,
  //       sort,
  //     }),
  // }),
  // 캠페인 신청
  applicate: (campaignId: number) => ({
    queryKey: [campaignId],
    queryFn: () => getCampaignApplicateCheck(campaignId),
  }),
  my: () => ({
    queryKey: [''],
    queryFn: () => getMyCampaigns(),
  }),
});

// 배송 캠페인 쿼리
export function useGetDeliveryCampaigns({
  size,
  categoryName,
  campaignTypes,
  sort,
}: Omit<GetDeliveryCampaignsRequest, 'page'>) {
  return useInfiniteQuery({
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// 방문 캠페인 쿼리
export function useGetVisitCampaigns({
  size,
  categoryName,
  campaignTypes,
  sort,
}: Omit<GetVisitCampaignsRequest, 'page'>) {
  return useInfiniteQuery({
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// 캠페인 신청 상태 쿼리
export function useGetCampaignApplicateCheck(campaignId: number) {
  return useSuspenseQuery(campaignsQueryKeys.applicate(campaignId));
}

// 내 캠페인 요약 조회 쿼리
export function useGetMyCampaigns() {
  return useSuspenseQuery(campaignsQueryKeys.my());
}
