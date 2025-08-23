import { GetCampaignBasicInfoResponse } from '@/types/campaigns/responses';

import CampaignThumbnail from './campaign-thumbnail';

interface Props {
  thumbnailUrl: string;
  basicInfo: GetCampaignBasicInfoResponse;
}

/**
 * 캠페인 정보 컴포넌트
 */
export default function CampaignInfo({ thumbnailUrl, basicInfo }: Props) {
  const { title, currentApplicants, maxApplicants } = basicInfo;
  return (
    <>
      <section className="relative flex w-full items-start gap-3 px-5">
        <div className="group relative h-[115px] w-[115px] cursor-pointer overflow-hidden rounded-[12px]">
          <CampaignThumbnail thumnailUrl={thumbnailUrl} />
        </div>

        <div className="flex flex-col gap-2">
          <div>캠페인 제목 : {title}</div>
          <div>
            지원자 수 : {currentApplicants} / {maxApplicants}명
          </div>
        </div>
      </section>
    </>
  );
}
