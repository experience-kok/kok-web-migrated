import FooterMenu from '@/components/layout.tsx/footer-menu';
import Header from '@/components/layout.tsx/header';

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div>
        <Header />
      </div>
      <main className="bg-background mx-auto h-full w-full max-w-[720px] flex-grow">
        {children}
      </main>
      <FooterMenu />
    </div>
  );
}
