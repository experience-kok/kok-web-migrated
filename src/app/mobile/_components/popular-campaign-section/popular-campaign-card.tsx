import Link from 'next/link';

import { CampaignCard } from '@/components/shared/campaign-card-new';
import { Campaign } from '@/models/campaign';

interface Props {
  campaign: Campaign;
}

/**
 * 메인 페이지 인기 캠페인 카드 컴포넌트
 * @returns
 */
export default function PopularCampaignCard({ campaign }: Props) {
  return (
    <Link href={`/mobile/campaign/${campaign.id}`}>
      <CampaignCard>
        <CampaignCard.Image imageUrl={campaign.thumbnailUrl} imageAlt={campaign.title} />

        <div className="flex cursor-pointer flex-col items-start px-0">
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
