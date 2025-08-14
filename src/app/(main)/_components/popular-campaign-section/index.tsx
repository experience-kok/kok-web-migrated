import { getPopularCampaigns } from '@/service/campaigns/campaigns-api';

import PopularCampaign from './popular-campaign';

/**
 * 메인 페이지 - 인기 캠페인 영역 컴포넌트
 */
export default async function PopularCampaignSection() {
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 인기 캠페인 목록 요청
  const campaignsData = await getPopularCampaigns({
    page: 1,
    size: 10,
  });

  return <PopularCampaign campaigns={campaignsData.campaigns} />;
}
