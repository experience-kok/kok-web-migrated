import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';
import Script from 'next/script';

import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import Provider from '@/components/provider';

import { siteConfig } from '@/configs/site/meatadata';

const pretendard = localFont({
  src: '../assets/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  ...siteConfig,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} bg-ck-gray-200 antialiased`}
        suppressHydrationWarning={true}
      >
        <div id="portal-root" className="relative">
          {/* 메인 앱 컨테이너 - 중앙 정렬 및 모바일 사이즈 제한 */}
          <div className="relative mx-auto min-h-screen max-w-[600px] bg-white">
            <Provider>{children}</Provider>
          </div>
        </div>

        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />

        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY} />
        )}
      </body>
    </html>
  );
}
