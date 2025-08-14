import Footer from '@/components/layout.tsx/footer';

import CampaignHeader from './_components/campaign-header';

export default function CampaignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <CampaignHeader />
      <main className="h-full w-full flex-grow">{children}</main>
      <Footer />

      {/* pc 버전 스크롤 버튼 */}
      <div className="fixed right-8 bottom-20 hidden md:block">{/* <ScrollToTopButton /> */}</div>
    </div>
  );
}
