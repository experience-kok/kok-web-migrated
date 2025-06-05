import { useMemo } from 'react';

import CampaignCard from '@/components/shared/campaign-card';
import { Text } from '@/components/ui/text';
import { Campaign } from '@/models/campaign';

interface Props {
  campaigns: Campaign[];
}

export default function CampaignList({ campaigns }: Props) {
  const isCampaigns = useMemo(() => (campaigns.length > 0 ? true : false), [campaigns]);
  return (
    <>
      <div className="grid grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:px-16">
        {isCampaigns &&
          campaigns.map((campaign, index) => (
            <CampaignCard campaign={campaign} key={`${campaign.id}-${index}`} />
          ))}
      </div>
      {!isCampaigns && (
        <div className="flex w-full items-center justify-center">
          <Text size="lg" color="muted-foreground" weight="semibold">
            등록된 캠페인이 없어요.
          </Text>
        </div>
      )}
    </>
  );
}
