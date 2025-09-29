import FooterMenu from '@/components/layout.tsx/footer-menu';

import MypageHeader from './_components/mypage-header';

export default function MypageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <MypageHeader />
      <main className="h-full w-full flex-grow bg-white">{children}</main>
      <FooterMenu />
    </div>
  );
}
