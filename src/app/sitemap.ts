import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const visitCategories = ['맛집', '카페', '뷰티', '숙박', '기타'];

  const staticPages = [
    {
      // 메인 페이지
      url: 'https://chkok.kr',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    {
      // 카테고리 페이지
      url: 'https://chkok.kr/category',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.1,
    },
  ];

  // 방문 카테고리별 캠페인 페이지 생성
  const visitCampaignPages = visitCategories.map(category => ({
    url: `https://chkok.kr/campaign/visit?categoryName=${encodeURIComponent(category)}&page=1`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...visitCampaignPages];
}
