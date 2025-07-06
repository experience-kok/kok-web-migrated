import { DELIVERY_CATEGORIES, VISIT_CATEGORIES } from '@/models/campaign';
import { getBanners } from '@/service/banners/banners-api';
import { getPopularCampaigns } from '@/service/campaigns/campaigns-api';

import MainBanner from './_components/main-banner';
import PopularCampaign from './_components/popular-campaign';
import RankingCampaign from './_components/ranking-campaign';

export default async function Home() {
  // 배너 목록 요청
  const bannersData = await getBanners();

  // 인기 캠페인 목록 요청
  const campaignsData = await getPopularCampaigns({
    page: 1,
    size: 10,
  });

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

  return (
    <>
      {/* 배너 영역 */}
      <section>
        <MainBanner banners={bannersData} />
      </section>

      {/* 인기 캠페인 영역 */}
      <section className="p-4">
        <h2 className="chkok-title-md mb-4">인기 캠페인</h2>

        <PopularCampaign campaigns={campaignsData.campaigns} />
      </section>

      {/* 체험콕이 추천해요! 영역 */}
      <section className="p-4">
        {/* 랭킹순으로 추천 */}
        <h2 className="chkok-title-md mb-4">체험콕이 추천해요!</h2>

        <RankingCampaign categoryData={categoryRankingData} />
      </section>
    </>
  );
}
