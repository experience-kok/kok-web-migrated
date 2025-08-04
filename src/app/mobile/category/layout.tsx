import CategoryHeader from './_components/category-header';

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-ck-gray-200 flex min-h-[100dvh] flex-col">
      <CategoryHeader />
      <main className="h-full w-full flex-grow">{children}</main>

      {/* pc 버전 스크롤 버튼 */}
      <div className="fixed right-8 bottom-20 hidden md:block">{/* <ScrollToTopButton /> */}</div>
    </div>
  );
}
