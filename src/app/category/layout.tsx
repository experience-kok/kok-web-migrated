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
    </div>
  );
}
