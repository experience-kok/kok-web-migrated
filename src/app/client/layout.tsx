import Footer from '@/components/layout.tsx/footer';
import FooterMenu from '@/components/layout.tsx/footer-menu';
import ScrollToTopButton from '@/components/shared/scroll-to-top-button';

import ClientHeader from './_components/client-header';

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ClientHeader />
      <main className="h-full w-full flex-grow bg-white">{children}</main>
      <FooterMenu />
      <Footer />

      {/* pc 버전 스크롤 버튼 */}
      <div className="fixed right-8 bottom-20 hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
