import { Suspense } from '@suspensive/react';

import CampaignApplicate from './_components/campaign-applicate';
import CampaignApplicateSkeleton from './_components/campaign-applicate-skeleton';

interface Props {
  params: Promise<{
    campaignId: string;
  }>;
}

export default async function ApplicatePage({ params }: Props) {
  const { campaignId } = await params;

  return (
    <Suspense clientOnly fallback={<CampaignApplicateSkeleton />}>
      <CampaignApplicate campaignId={Number(campaignId)} />
    </Suspense>
  );
}
