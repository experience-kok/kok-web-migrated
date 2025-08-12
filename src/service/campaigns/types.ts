import {
  Campaign,
  CampaignApplicationStatus,
  CampaignCategoryName,
  CampaignCategoryType,
  CampaignType,
  Sort,
  방문카테고리,
  배송카테고리,
} from '@/models/campaign';
import { Role } from '@/models/user';

import { Pagination } from '@/types/response';

/**
 * 인기 캠페인 조회 요청
 */
export interface GetPopularCampaignsRequest {
  page?: number;
  size?: number;
  categoryType?: CampaignCategoryType;
  categoryName?: CampaignCategoryName;
  campaignType?: CampaignType;
}

/**
 * 인기 캠페인 조회 응답
 */
export interface GetPopularCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}

/**
 * 배송 캠페인 조회 요청
 */
export interface GetDeliveryCampaignsRequest {
  page?: number;
  size?: number;
  categoryName?: 배송카테고리;
  campaignTypes?: CampaignType[];
  sort?: Sort;
}

/**
 * 배송 캠페인 조회 응답
 */
export interface GetDeliveryCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}

/**
 * 방문 캠페인 조회 요청
 */
export interface GetVisitCampaignsRequest {
  page?: number;
  size?: number;
  categoryName?: 방문카테고리;
  campaignTypes?: CampaignType[];
  sort?: Sort;
}
/**
 * 방문 캠페인 조회 응답
 */
export interface GetVisitCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}

/**
 * 캠페인 등록 요청
 */
export interface PostCampaignRequest {
  thumbnailUrl: string;
  campaignType: CampaignType;
  title: string;
  productShortInfo: string;
  maxApplicants: number;
  productDetails: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  applicationDeadlineDate: string;
  selectionDate: string;
  reviewDeadlineDate: string;
  selectionCriteria: string;
  missionGuide: string;
  missionKeywords: string[];
  category: {
    type: CampaignCategoryType;
    name: CampaignCategoryName;
  };
  companyInfo: {
    contactPerson: string;
    phoneNumber: string;
  };
  visitInfo?: {
    homepage?: string; // 공식 홈페이지 주소
    contactPhone: string; // 일반 유저에게 공개되는 연락처
    visitAndReservationInfo: string; // 방문 및 예약 안내
    businessAddress: string; // 위치 정보
    businessDetailAddress: string; // 위치 정보 상세
    lat: number; // 위도
    lng: number; // 경도
  };
}

/**
 * 캠페인 기본 정보 조회 응답
 */
export interface GetCampaignBasicInfoResponse {
  campaignId: number;
  campaignType: CampaignType;
  categoryType: CampaignCategoryType;
  categoryName: CampaignCategoryName;
  title: string;
  maxApplicants: number;
  currentApplicants: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
}
/**
 * 캠페인 상세 정보 조회 응답
 */
export interface GetCampaignDetailInfoResponse {
  campaignId: number;
  productShortInfo: string;
  productDetails: string;
  selectionCriteria: string;
  reviewDeadlineDate: string;
  selectionDate: string;
  applicationDeadlineDate: string;
}
/**
 * 캠페인 위치, 방문 정보 조회 (Visit Info)
 */
export interface GetCampaignLocationInfoResponse {
  id: number;
  campaignId: number;
  lat: number;
  lng: number;
  homepage: string;
  contactPhone: string;
  visitAndReservationInfo: string;
  businessAddress: string;
  businessDetailAddress: string;
  hasCoordinates: boolean; // 좌표 보유 여부
}

/**
 * 캠페인 지원 상태 조회 응답
 */
export interface GetCampaignApplicateCheckResponse {
  application: {
    hasApplied: boolean;
    id?: number;
    status?: '';
    createdAt?: string;
    updatedAt?: string;
    campaign?: {
      id: number;
      title: string;
    };
    user?: {
      id: number;
      nickname: string;
    };
  };
}

/**
 * 캠페인 지원 응답
 */
export interface PostCampaignApplicateResponse {
  application: {
    id: number;
    status: '';
    createdAt: string;
    updatedAt: string;
    campaign: {
      id: number;
      title: string;
    };
    user: {
      id: number;
      nickname: string;
    };
  };
}

/**
 * 내 캠페인 요약 조회 응답
 */
export interface GetMyCampaignsSummaryResponse {
  role: Role;
  summary: {
    applied: {
      count: number;
      label: string;
    };
    pending: {
      count: number;
      label: string;
    };
    selected: {
      count: number;
      label: string;
    };
    completed: {
      count: number;
      label: string;
    };
  };
}

/**
 * 내 캠페인 지원 목록 조회 응답
 */
export interface GetMyApplicationsResponse {
  applications: {
    id: number;
    applicationStatus: CampaignApplicationStatus;
    campaign: {
      id: number;
      title: string;
      thumbnailUrl: string;
      productShortInfo: string;
      campaignType: CampaignType;
    };
    user: {
      id: number;
      nickname: string;
    };
  }[];
  pagination: Pagination;
}
/**
 * 내 캠페인 지원 목록 조회 요청
 */
export interface GetMyApplicationsRequest {
  page?: number;
  size?: number;
  applicationStatus: CampaignApplicationStatus;
}

/*
 * 캠페인 검색 요청
 */
export interface GetCampaignSearchRequest {
  keyword: string;
  page?: number;
  size?: number;
}

/**
 * 캠페인 검색 응답
 */
export interface GetCampaignSearchResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}

/**
 * 실시간 인기 검색어 조회 응답
 */
export interface GetSearchRealtimeResponse {
  suggestions: string[];
}
