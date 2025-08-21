import { createQueryKeys } from '@lukemorales/query-key-factory';

import { GetCampaignApplicationsRequest } from '@/types/campaigns/requests';

import { useInfiniteQuery, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  getCampaignApplicateCheck,
  getCampaignApplications,
  getCampaignSearch,
  getDeliveryCampaigns,
  getMyApplications,
  getMyCampaignsSummary,
  getPopularCampaigns,
  getSearchRealtime,
  getSearchSuggestions,
  getVisitCampaigns,
} from './campaigns-api';
import {
  GetCampaignSearchRequest,
  GetDeliveryCampaignsRequest,
  GetMyApplicationsRequest,
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
  // 특정 캠페인 지원 상태 조회
  applicate: (campaignId: number) => ({
    queryKey: [campaignId],
    queryFn: () => getCampaignApplicateCheck(campaignId),
  }),
  // 지원 캠페인 목록 조회
  applications: ({ page, size, applicationStatus }: GetMyApplicationsRequest) => ({
    queryKey: [page, size, applicationStatus],
    queryFn: () => getMyApplications({ page, size, applicationStatus }),
  }),
  // 내 캠페인 요약 조회
  my: () => ({
    queryKey: [''],
    queryFn: () => getMyCampaignsSummary(),
  }),
  suggest: (q: string) => ({
    queryKey: [q],
    queryFn: () => getSearchSuggestions(q),
  }),
  realtime: () => ({
    queryKey: ['keyword'],
    queryFn: () => getSearchRealtime(),
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

// 내 캠페인 지원 목록 조회 - 쿼리키 사용 안하고 있어서 이부분 추후 수정 필요
export function useGetMyApplications({
  size,
  applicationStatus,
}: Omit<GetMyApplicationsRequest, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['campaigns', 'applications', size, applicationStatus],
    queryFn: ({ pageParam = 1 }) =>
      getMyApplications({
        page: pageParam,
        size,
        applicationStatus,
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

// 캠페인 검색 자동완성 쿼리
export function useGetSearchSuggestions(q: string) {
  return useQuery({
    ...campaignsQueryKeys.suggest(q),
    enabled: !!q && q.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// 캠페인 검색 쿼리
export function useGetCampaignSearch({
  size,
  keyword,
  campaignTypes,
  sort,
}: Omit<GetCampaignSearchRequest, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['campaign', keyword, size, campaignTypes, sort],
    queryFn: ({ pageParam = 1 }) =>
      getCampaignSearch({
        page: pageParam,
        size,
        keyword,
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

/**
 * 실시간 인기 검색어 쿼리
 * @description 해당 쿼리는 10분동안 신선한 상태를 유지합니다.
 * @returns
 */
export function useGetSearchRealtime() {
  return useSuspenseQuery({
    ...campaignsQueryKeys.realtime(),
    // 10분 캐싱
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
}

// 캠페인 신청자 목록 조회 쿼리
export function useGetCampaignApplications({
  size,
  campaignId,
}: Omit<GetCampaignApplicationsRequest, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['campaigns', 'applications', size, campaignId],
    queryFn: ({ pageParam }) =>
      getCampaignApplications({
        page: pageParam,
        size,
        campaignId,
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
