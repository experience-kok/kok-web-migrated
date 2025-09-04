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
    // 추후 검색 모달에서 페이지로 변경시 검색 페이지 추가
  ];

  return [...staticPages];
}
