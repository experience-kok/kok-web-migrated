import Link from 'next/link';

import { CampaignCard } from '@/components/shared/campaign-card-new';
import { Campaign } from '@/models/campaign';

interface Props {
  campaign: Campaign;
  ranking: number;
}

/**
 * 랭킹 캠페인 카드 컴포넌트
 */
export default function RankingCampaignCard({ campaign, ranking }: Props) {
  return (
    <Link href={`/campaign/${campaign.id}`}>
      <CampaignCard className="flex-row">
        <div className="group relative h-[115px] w-[115px] cursor-pointer overflow-hidden rounded-lg p-0 md:h-[105px] md:w-[105px] lg:h-[135px] lg:w-[135px]">
          <CampaignCard.Image imageUrl={campaign.thumbnailUrl} imageAlt={campaign.title} />
          <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-md bg-black/70">
            <div className="ck-caption-2 text-white">{ranking}</div>
          </div>
        </div>

        <div className="flex cursor-pointer flex-col items-start px-4">
          <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
            <CampaignCard.Badge campaignType={campaign.campaignType} />
          </div>
          <CampaignCard.Title title={campaign.title} />
          <CampaignCard.ShortInfo productShortInfo={campaign.productShortInfo} />
          <CampaignCard.Applicant
            currentApplicants={campaign.currentApplicants}
            maxApplicants={campaign.maxApplicants}
          />
        </div>
      </CampaignCard>
    </Link>
  );
}
