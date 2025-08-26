import { Gender, Role } from '@/models/user';

import { Pagination } from '../response';
import { SNSPlatformType } from '../users/models';

import {
  Campaign,
  CampaignApplicationStatus,
  CampaignCategoryName,
  CampaignCategoryType,
  CampaignProgressStatus,
  CampaignType,
  ClientMission,
} from './models';

/**
 * 인기 캠페인 조회 응답
 */
export interface GetPopularCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}

/**
 * 배송 캠페인 조회 응답
 */
export interface GetDeliveryCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}

/**
 * 방문 캠페인 조회 응답
 */
export interface GetVisitCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
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
  maxApplicants: number | null;
  currentApplicants: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string | null;
}

/**
 * 캠페인 상세 정보 조회 응답
 */
export interface GetCampaignDetailInfoResponse {
  campaignId: number;
  isAlwaysOpen: false;
  productShortInfo: string;
  productDetails: string;
  selectionCriteria: string;
  selectionDate: string;
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
 * 캠페인 미션 정보 조회
 */
export interface GetCampaignMissionInfoResponse {
  campaignId: number;
  missionInfo: {
    missionGuide: string;
    titleKeywords: string[];
    bodyKeywords: string[];
    numberOfVideo: number;
    numberOfImage: number;
    numberOfText: number;
    isMap: boolean;
    missionStartDate: string;
    missionDeadlineDate: string;
  };
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

/**
 * 캠페인 신청자 목록 조회 응답
 */
export interface GetCampaignApplicationsResponse {
  campaign: {
    id: number;
    title: string;
    totalApplicants: number;
  };
  applicants: Array<{
    applicationId: number;
    user: {
      id: number;
      nickname: string;
      phone: string;
      gender: Gender;
    };
    allSnsUrls: Array<{
      platformType: SNSPlatformType;
      snsUrl: string;
    }>;
  }>;
  pagination: Pagination;
}

/**
 * 캠페인 진행 상태 조회 응답
 */
export interface GetCampaignProgressStatusResponse {
  campaignId: number;
  campaignTitle: string;
  isAlwaysOpen: boolean;
  progress: {
    status: CampaignProgressStatus;
    message: string;
  };
}

/**
 * 인플루언서가 유저 미션 이력 조회 응답
 */
export interface GetUserMissionsHistoryResponse {
  histories: Array<{
    id: number;
    campaign: {
      title: string;
      category: string;
    };
    mission: ClientMission;
  }>;
}
