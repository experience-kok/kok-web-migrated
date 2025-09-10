import CampaignHeader from './_components/campaign-header';

export default function CampaignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <CampaignHeader />
      <main className="h-full w-full flex-grow bg-white">{children}</main>
    </div>
  );
}
