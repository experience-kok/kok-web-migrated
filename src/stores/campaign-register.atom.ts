import { atom } from 'jotai';

import {
  CompanyData,
  CategoryData,
  CampaignData,
  ThumbnailData,
  ProductData,
  SelectionData,
  MissionData,
  MissionContentData,
  VisitData,
} from '@/schemas/campaign-register.schemas';

/**
 * 캠페인 생성 과정에서 사용할 아톰입니다.
 */
export interface CampaignRegisterData {
  companyInfo?: CompanyData;
  categoryInfo?: CategoryData;
  thumbnailUrl?: ThumbnailData;
  campaignInfo?: CampaignData;
  productInfo?: ProductData;
  selectionInfo?: SelectionData;
  missionInfo?: MissionData;
  missionContentInfo?: MissionContentData;
  visitInfo?: VisitData;
}

export const campaignRegisterDataAtom = atom<CampaignRegisterData>({});
