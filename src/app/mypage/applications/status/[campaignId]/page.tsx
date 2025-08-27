import { Suspense } from '@suspensive/react';

import {
  getCampaignBasicInfo,
  getCampaignDetailInfo,
  getCampaignThumbnail,
} from '@/service/campaigns/campaigns-api';

import CampaignApplicants from './_components/campaign-applicants';
import CampaignInfo from './_components/campaign-info';
import CampaignProgress from './_components/campaign-progress';
import CampaignProgressSkeleton from './_components/campaign-progress/campaign-progress-skeleton';

interface Props {
  params: Promise<{
    campaignId: string;
  }>;
}

/**
 * 캠페인 상태 페이지
 * 캠페인 진행 상태 및 지원자 목록 조회
 */
export default async function CampaignStatusPage({ params }: Props) {
  const { campaignId } = await params;

  // 캠페인 썸네일
  const { thumbnailUrl } = await getCampaignThumbnail(Number(campaignId));

  // 캠페인 기본 정보
  const campaignBasicInfo = await getCampaignBasicInfo(Number(campaignId));

  // 캠페인 상세 정보
  const campaignDetailInfo = await getCampaignDetailInfo(Number(campaignId));

  return (
    <>
      {/* 캠페인 정보 컴포넌트 */}
      <Suspense>
        <CampaignInfo
          thumbnailUrl={thumbnailUrl}
          basicInfo={campaignBasicInfo}
          isAlwaysOpen={campaignDetailInfo.isAlwaysOpen}
        />
      </Suspense>

      {/* 캠페인 상태 조회 컴포넌트 */}
      <Suspense fallback={<CampaignProgressSkeleton />}>
        <CampaignProgress campaignId={Number(campaignId)} />
      </Suspense>

      {/* 캠페인 지원자 목록 조회 컴포넌트 */}
      <Suspense>
        <CampaignApplicants campaignId={Number(campaignId)} />
      </Suspense>
    </>
  );
}
