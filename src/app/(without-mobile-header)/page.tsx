import SplitBox from '@/components/ui/split-box';
import { Text } from '@/components/ui/text';
import { DELIVERY_CATEGORIES, VISIT_CATEGORIES } from '@/models/campaign';
import { getBanners } from '@/service/banners/banners-api';
import { getPopularCampaigns } from '@/service/campaigns/campaigns-api';

import CategoryRank from './_components/category-rank';
import MainBanner from './_components/main-banner';
import PopularCampaigns from './_components/popular-campaigns';

// ISR : 60초마다 재생성
export const revalidate = 10;

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
      <section className="md:px-6 md:py-10 lg:px-16">
        <MainBanner banners={bannersData} />
      </section>

      <section className="px-6 py-10 lg:px-16">
        <Text as="h2" size="3xl" weight="bold" className="mb-4">
          인기 캠페인
        </Text>

        <PopularCampaigns campaigns={campaignsData.campaigns} />
      </section>

      <SplitBox className="h-2" />

      <section className="px-6 py-10 lg:px-16">
        <Text as="h2" size="3xl" weight="bold" className="mb-4 md:hidden">
          카테고리 랭킹
        </Text>
        <Text as="h2" size="3xl" weight="bold" className="mb-4 hidden md:block">
          체험콕이 추천해요!
        </Text>
        <CategoryRank categoryData={categoryRankingData} />
      </section>
    </>
  );
}
