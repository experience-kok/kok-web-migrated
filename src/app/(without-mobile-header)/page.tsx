import SplitBox from '@/components/ui/split-box';
import { Text } from '@/components/ui/text';
import { getPopularCampaigns } from '@/service/campaign/campaign-api';

import MainBanner from './_components/main-banner';
import PopularSection from './_components/popular-section';

export const revalidate = 10;

export default async function Home() {
  const campaignsData = await getPopularCampaigns({
    page: 0,
    size: 10,
    categoryType: '방문',
    campaignType: '인스타그램',
  });

  return (
    <>
      <section className="md:px-6 md:py-10 lg:px-16">
        <MainBanner />
      </section>

      <section className="px-6 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          인기 캠페인
        </Text>

        <PopularSection campaigns={campaignsData.campaigns} />
      </section>

      <SplitBox className="h-2" />
    </>
  );
}
