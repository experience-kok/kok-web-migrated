import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      // 메인 페이지
      url: 'https://chkok.kr',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    {
      // 방문 캠페인 페이지
      url: 'https://chkok.kr/campaign/visit',
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.9,
    },
    {
      // 배송 캠페인 페이지
      url: 'https://chkok.kr/campaign/delivery',
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.9,
    },
    {
      // 카테고리 페이지
      url: 'https://chkok.kr/category',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.1,
    },
  ];

  return [...staticPages];
}
