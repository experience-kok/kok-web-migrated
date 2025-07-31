import { Suspense } from '@suspensive/react';

import AdBanner from './_components/ad-banner';
import MainBannerSection from './_components/main-banner-section';
import MainBannerSkeleton from './_components/main-banner-section/main-banner-skeleton';
import PopularCampaignSection from './_components/popular-campaign-section';
import PopularCampaignSkeleton from './_components/popular-campaign-section/popular-campaign-skeleton';
import QuickMenu from './_components/quick-menu';
import RankingCampaignSection from './_components/ranking-campaign-section';
import RankingCampaignSkeleton from './_components/ranking-campaign-section/ranking-campaign-skeleton';

export default function Home() {
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
        <h2 className="ck-title p-4">인기 캠페인</h2>

        <Suspense fallback={<PopularCampaignSkeleton />}>
          <PopularCampaignSection />
        </Suspense>
      </section>

      <section className="mt-10">
        <AdBanner />
      </section>

      {/* 체험콕이 추천해요! 영역 */}
      <section className="my-10">
        {/* 랭킹순으로 추천 */}
        <h2 className="ck-title p-4">체험콕이 추천해요!</h2>

        <Suspense fallback={<RankingCampaignSkeleton />}>
          <RankingCampaignSection />
        </Suspense>
      </section>
    </>
  );
}
