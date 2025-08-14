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

      {/* pc 버전 스크롤 버튼 */}
      <div className="fixed right-8 bottom-20 hidden md:block">{/* <ScrollToTopButton /> */}</div>
    </div>
  );
}
