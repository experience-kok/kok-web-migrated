import { getBanners } from '@/service/banners/banners-api';

import MainBanner from './main-banner';

/**
 * 메인 페이지 - 메인 배너 영역 컴포넌트
 */
export default async function MainBannerSection() {
  const bannersData = await getBanners();
  console.log(bannersData);

  return (
    <section>
      <MainBanner banners={bannersData} />
    </section>
  );
}
