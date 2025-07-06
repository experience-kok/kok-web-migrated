import { Suspense } from 'react';

import { DELIVERY_CATEGORIES, VISIT_CATEGORIES } from '@/models/campaign';
import { getPopularCampaigns } from '@/service/campaigns/campaigns-api';

import AdBanner from './_components/ad-banner';
import MainBannerSection from './_components/main-banner-section';
import MainBannerSkeleton from './_components/main-banner-section/main-banner-skeleton';
import PopularCampaign from './_components/popular-campaign';
import QuickMenu from './_components/quick-menu';
import RankingCampaign from './_components/ranking-campaign';

export default async function Home() {
  // 배너 목록 요청

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
      <Suspense fallback={<MainBannerSkeleton />}>
        <MainBannerSection />
      </Suspense>

      <section className="mt-5">
        <QuickMenu />
      </section>

      {/* 인기 캠페인 영역 */}
      <section className="mt-10">
        <h2 className="chkok-title-md p-4">인기 캠페인</h2>

        <PopularCampaign campaigns={campaignsData.campaigns} />
      </section>

      <section className="mt-10">
        <AdBanner />
      </section>

      {/* 체험콕이 추천해요! 영역 */}
      <section className="my-10">
        {/* 랭킹순으로 추천 */}
        <h2 className="chkok-title-md p-4">체험콕이 추천해요!</h2>

        <RankingCampaign categoryData={categoryRankingData} />
      </section>
    </>
  );
}
