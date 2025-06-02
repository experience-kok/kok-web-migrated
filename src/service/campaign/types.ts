import { Campaign, CampaignCategoryType, CampaignType } from '@/models/campaign';

import { Pagination } from '@/types/response';

/**
 * 인기 캠페인 조회 요청
 */
export interface GetPopularCampaignsRequest {
  page?: number;
  size?: number;
  categoryType?: CampaignCategoryType;
  campaignType?: CampaignType;
}

export interface GetPopularCampaignsResponse {
  campaigns: Campaign[];
  pagination: Pagination;
}
