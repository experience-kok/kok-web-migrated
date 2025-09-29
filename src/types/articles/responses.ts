/**
 * 체험콕 아티클 조회 응답
 */
export interface GetKokArticleResponse {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  campaignId: number;
  isCampaignOpen: boolean;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  visitInfo: {
    contactPhone: string;
    homePage: string;
    businessAddress: string;
    businessDetailAddress: string;
    lat: number;
    lng: number;
  };
}
