import Footer from '@/components/layout.tsx/footer';
import FooterMenu from '@/components/layout.tsx/footer-menu';
import Header from '@/components/layout.tsx/header';

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="h-full w-full flex-grow bg-white">{children}</main>
      <FooterMenu />
      <Footer />
    </div>
  );
}
