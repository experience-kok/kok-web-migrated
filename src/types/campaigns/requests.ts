import {
  CampaignApplicationStatus,
  CampaignCategoryName,
  CampaignCategoryType,
  CampaignType,
  Sort,
  방문카테고리,
  배송카테고리,
} from './models';

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
 * 캠페인 등록 요청
 */
export interface PostCampaignRequest {
  isAlwaysOpen: boolean; // 상시 캠페인 여부
  thumbnailUrl: string;
  campaignType: CampaignType;
  title: string;
  productShortInfo: string;
  maxApplicants?: number;
  productDetails: string;
  recruitmentStartDate: string; // 모집 시작일
  recruitmentEndDate?: string; // 모집 종료일
  selectionDate?: string; // 선정일
  selectionCriteria: string; // 선정 조건
  category: {
    type: CampaignCategoryType;
    name: CampaignCategoryName;
  };
  missionInfo: {
    titleKeywords: string[];
    bodyKeywords: string[];
    numberOfVideo: number;
    numberOfImage: number;
    numberOfText: number;
    isMap: boolean;
    missionGuide: string;
    missionStartDate?: string; // 미션 시작일
    missionDeadlineDate?: string; // 미션 종료일
  };
  companyInfo: {
    contactPerson: string;
    phoneNumber: string;
  };
  visitInfo?: {
    // 방문 캠페인일 경우에만 사용
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
 * 내 캠페인 지원 목록 조회 요청
 */
export interface GetMyApplicationsRequest {
  page?: number;
  size?: number;
  applicationStatus: CampaignApplicationStatus;
}

/**
 * 캠페인 검색 요청
 */
export interface GetCampaignSearchRequest {
  keyword: string;
  page?: number;
  size?: number;
  campaignTypes?: CampaignType[];
  sort?: Sort;
}

/**
 * 캠페인 신청자 목록 조회
 */
export interface GetCampaignApplicationsRequest {
  campaignId: number;
  page?: number;
  size?: number;
  applicationStatus: 
}

/**
 * 캠페인 진행 상태 조회 요청
 */
export interface GetCampaignProgressStatusRequest {
  campaignId: number;
}
