import { DELIVERY_CATEGORIES, VISIT_CATEGORIES } from '@/models/campaign';
import { getPopularCampaigns } from '@/service/campaigns/campaigns-api';

import RankingCampaign from './ranking-campaign';

export default async function RankingCampaignSection() {
  // 카테고리 랭킹 캠페인 목록 요청
  const categoryRankingData = await Promise.all([
    // 방문 카테고리 인기 캠페인 목록
    ...VISIT_CATEGORIES.map(async categoryName => {
      const data = await getPopularCampaigns({
        page: 0,
        size: 5,
        categoryType: '방문',
        categoryName,
      });
      return {
        categoryType: '방문' as const,
        categoryName,
        campaigns: data.campaigns,
      };
    }),
    // 배송 카테고리 인기 캠페인 목록
    ...DELIVERY_CATEGORIES.map(async categoryName => {
      const data = await getPopularCampaigns({
        page: 0,
        size: 5,
        categoryType: '배송',
        categoryName,
      });
      return {
        categoryType: '배송' as const,
        categoryName,
        campaigns: data.campaigns,
      };
    }),
  ]);

  return <RankingCampaign categoryData={categoryRankingData} />;
}
