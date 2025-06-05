import {
  Campaign,
  CampaignCategoryName,
  CampaignCategoryType,
  CampaignType,
  Sort,
  배송카테고리,
} from '@/models/campaign';

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
    companyName: string;
    businessRegistrationNumber: string;
    contactPerson: string;
    phoneNumber: string;
  };
}
