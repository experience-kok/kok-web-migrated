export type CampaignType = '인스타그램' | '블로그' | '유튜브' | '틱톡';
export type CampaignCategoryType = '방문' | '배송';

type 방문카테고리 = '맛집' | '카페' | '뷰티' | '숙박';
type 배송카테고리 = '식품' | '화장품' | '생활용품' | '패션' | '잡화';

export type CampaignCategoryName = 방문카테고리 | 배송카테고리;

export interface Campaign {
  id: number;
  campaignType: CampaignType;
  title: string;
  currentApplicants: number;
  maxApplicants: number;
  createdAt: string;
  applicationDeadlineDate: string;
  thumbnailUrl: string;
  category: {
    type: CampaignCategoryType;
    name: CampaignCategoryName;
  };
}
