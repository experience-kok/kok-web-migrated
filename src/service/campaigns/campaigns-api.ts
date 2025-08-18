import { fetcher } from '@/lib/fetcher';

import { SuccessResponse } from '@/types/response';

import {
  GetCampaignApplicateCheckResponse,
  GetCampaignBasicInfoResponse,
  GetCampaignDetailInfoResponse,
  GetCampaignLocationInfoResponse,
  GetCampaignMissionInfoResponse,
  GetCampaignSearchRequest,
  GetCampaignSearchResponse,
  GetDeliveryCampaignsRequest,
  GetDeliveryCampaignsResponse,
  GetMyApplicationsRequest,
  GetMyApplicationsResponse,
  GetMyCampaignsSummaryResponse,
  GetPopularCampaignsRequest,
  GetPopularCampaignsResponse,
  GetSearchRealtimeResponse,
  GetVisitCampaignsRequest,
  GetVisitCampaignsResponse,
  PostCampaignApplicateResponse,
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
      next: { revalidate: 60 },
    },
  );

  return response;
}

/**
 * 배송 캠페인 조회
 * @returns 배송 캠페인 목록
 */
export async function getDeliveryCampaigns({
  page,
  size,
  categoryName,
  campaignTypes,
  sort,
}: GetDeliveryCampaignsRequest) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (size) queryParams.set('size', size.toString());
  if (categoryName) queryParams.set('categoryName', categoryName);
  if (sort) queryParams.set('sort', sort);

  if (campaignTypes) {
    const requestCampaignTypes = campaignTypes.join(',');
    queryParams.set('campaignTypes', requestCampaignTypes);
  }

  const response = await fetcher.get<GetDeliveryCampaignsResponse>(
    `/campaigns/delivery?${queryParams.toString()}`,
    { requiresAuth: false },
  );

  console.log(response);

  return response;
}

/**
 * 방문 캠페인 조회
 * @returns 방문 캠페인 목록
 */
export async function getVisitCampaigns({
  page,
  size,
  categoryName,
  campaignTypes,
  sort,
}: GetVisitCampaignsRequest) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (size) queryParams.set('size', size.toString());
  if (categoryName) queryParams.set('categoryName', categoryName);
  if (sort) queryParams.set('sort', sort);

  if (campaignTypes) {
    const requestCampaignTypes = campaignTypes.join(',');
    queryParams.set('campaignTypes', requestCampaignTypes);
  }

  const response = await fetcher.get<GetVisitCampaignsResponse>(
    `/campaigns/visit?${queryParams.toString()}`,
    { requiresAuth: false },
  );

  return response;
}

/**
 * 캠페인 등록
 */
export async function postCampaign(requestBody: PostCampaignRequest) {
  const response = await fetcher.post<null>(`/campaigns`, requestBody, {
    requiresAuth: true,
  });

  return response;
}

/**
 * 캠페인 지원 상태 조회
 */
export async function getCampaignApplicateCheck(campaignId: number) {
  const queryParams = new URLSearchParams();
  queryParams.set('campaignId', campaignId.toString());

  const response = await fetcher.get<GetCampaignApplicateCheckResponse>(
    `/campaign-applications/check?${queryParams.toString()}`,
    {
      requiresAuth: true,
    },
  );

  return response;
}

/**
 * 캠페인 지원
 */
export async function postCampaignApplicate(campaignId: number) {
  const requestBody = {
    campaignId,
  };

  const response = await fetcher.post<PostCampaignApplicateResponse>(
    `/campaign-applications`,
    requestBody,
    {
      requiresAuth: true,
    },
  );

  return response;
}

/**
 * 캠페인 상세 조회 API 목록
 * - 캠페인 썸네일 조회
 * - 캠페인 기본 정보 조회
 * - 캠페인 상세 정보 조회
 * - 캠페인 미션 가이드 조회
 * - 캠페인 필수 키워드 조회
 * - 캠페인 위치 조회
 */
export async function getCampaignThumbnail(campaignId: number) {
  const response = await fetcher.get<{
    campaignId: number;
    thumbnailUrl: string;
  }>(`/campaigns/${campaignId}/thumbnail`);

  return response;
}
export async function getCampaignBasicInfo(campaignId: number) {
  const response = await fetcher.get<GetCampaignBasicInfoResponse>(
    `/campaigns/${campaignId}/basic-info`,
  );

  return response;
}
export async function getCampaignDetailInfo(campaignId: number) {
  const response = await fetcher.get<GetCampaignDetailInfoResponse>(
    `/campaigns/${campaignId}/detail-info`,
  );

  return response;
}
export async function getCampaignMissionGuide(campaignId: number) {
  const response = await fetcher.get<GetCampaignMissionInfoResponse>(
    `/campaigns/${campaignId}/mission-guide`,
  );

  return response;
}
export async function getCampaignLocation(campaignId: number) {
  const response = await fetcher.get<GetCampaignLocationInfoResponse>(
    `/campaigns/${campaignId}/location`,
  );

  return response;
}

/**
 * 내 캠페인 요약 조회
 */
export async function getMyCampaignsSummary() {
  const response = await fetcher.get<GetMyCampaignsSummaryResponse>(`/my-campaigns/summary`, {
    requiresAuth: true,
  });

  return response;
}

/**
 * 내 캠페인 지원 목록 조회
 */
export async function getMyApplications({
  page,
  size,
  applicationStatus,
}: GetMyApplicationsRequest) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (size) queryParams.set('size', size.toString());
  queryParams.set('applicationStatus', applicationStatus.toString());

  const response = await fetcher.get<GetMyApplicationsResponse>(
    `/campaign-applications/my-applications?${queryParams}`,
    {
      requiresAuth: true,
    },
  );

  return response;
}

/**
 * 캠페인 검색 자동완성
 */
export async function getSearchSuggestions(q: string) {
  const queryParams = new URLSearchParams();
  queryParams.set('q', q.toString());
  queryParams.set('limit', '5'); // 고정으로 제안 키워드 5개

  const response = await fetcher.get<{
    suggestions: string[];
  }>(`/campaigns/search/suggestions?${queryParams.toString()}`);

  return response;
}

/**
 * 실시간 인기 검색어 조회
 *
 * !TODO 추후 fetcher에 bff 기능 추가 필요
 */
export async function getSearchRealtime() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BFF_BASE_URL}/campaigns/search/realtime`,
    {
      method: 'GET',
    },
  );

  const data = (await response.json()) as SuccessResponse<GetSearchRealtimeResponse>;
  console.log(data);

  return data.data.suggestions;
}

/**
 * 캠페인 검색
 */
export async function getCampaignSearch({
  page,
  size,
  keyword,
  campaignTypes,
  sort,
}: GetCampaignSearchRequest) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (size) queryParams.set('size', size.toString());
  if (sort) queryParams.set('sort', sort);

  if (campaignTypes) {
    const requestCampaignTypes = campaignTypes.join(',');
    queryParams.set('campaignTypes', requestCampaignTypes);
  }

  queryParams.set('keyword', keyword.toString());

  const response = await fetcher.get<GetCampaignSearchResponse>(
    `/campaigns/search?${queryParams.toString()}`,
    { requiresAuth: false },
  );

  console.log(response);

  return response;
}
