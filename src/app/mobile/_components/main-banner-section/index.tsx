import { getBanners } from '@/service/banners/banners-api';

import MainBanner from './main-banner';

/**
 * 메인 페이지 - 메인 배너 영역 컴포넌트
 */
export default async function MainBannerSection() {
  // 메인 배너 목록 요청
  await new Promise(resolve => setTimeout(resolve, 2000));

  const bannersData = await getBanners();

  return (
    <section>
      <MainBanner banners={bannersData} />
    </section>
  );
}
