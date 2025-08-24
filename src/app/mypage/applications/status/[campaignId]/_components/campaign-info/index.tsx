import { CampaignCard } from '@/components/shared/campaign-card-new';

import { GetCampaignBasicInfoResponse } from '@/types/campaigns/responses';

interface Props {
  thumbnailUrl: string;
  basicInfo: GetCampaignBasicInfoResponse;
  isAlwaysOpen: boolean;
}

/**
 * 캠페인 정보 컴포넌트
 */
export default function CampaignInfo({ thumbnailUrl, basicInfo, isAlwaysOpen }: Props) {
  const { title, currentApplicants, maxApplicants, campaignType } = basicInfo;
  return (
    <>
      <section className="px-5">
        <CampaignCard className="flex flex-row">
          <CampaignCard.Image
            imageUrl={thumbnailUrl}
            imageAlt={`${title} 이미지`}
            width={115}
            height={115}
          />

          <div className="flex flex-col items-start px-0">
            <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
              <CampaignCard.Badge campaignType={campaignType} />
            </div>
            <CampaignCard.Title title={title} />
            <CampaignCard.Applicant
              currentApplicants={currentApplicants}
              maxApplicants={maxApplicants}
              isAlwaysOpen={isAlwaysOpen}
            />
          </div>
        </CampaignCard>
      </section>
    </>
  );
}
