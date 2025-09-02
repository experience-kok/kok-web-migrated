import { Metadata } from 'next';

export const site_url = 'https://chkok.kr';
export const site_description =
  '체험콕은 블로그, 인스타그램, 유튜브 등의 인플루언서를 위한 무료 체험단 플랫폼이에요.';

export const siteConfig: Metadata = {
  title: '체험콕',
  description: site_description,
  keywords: [
    '체험단',
    '체험단 플랫폼',
    '무료 체험단',
    '인플루언서',
    '인플루언서 체험단',
    '블로그',
    '블로그 체험단',
    '인스타 체험단',
    '리뷰',
    '리뷰 마케팅',
    '체험단 모집',
    '체험단 사이트',
  ],
  authors: [{ name: '체험콕' }],
  openGraph: {
    type: 'website',
    url: site_url,
    title: '체험콕',
    description: site_description,
    siteName: '체험콕',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://chkok.kr/opengraph-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '체험콕',
    description: site_description,
    images: 'https://chkok.kr/opengraph-image.png',
    creator: '@chkok',
  },
  icons: {
    icon: '/favicon.icon',
  },
};
