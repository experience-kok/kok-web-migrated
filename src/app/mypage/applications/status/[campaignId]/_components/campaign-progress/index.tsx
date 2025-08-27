'use client';

import { useGetCampaignProgressStatus } from '@/service/campaigns/campaigns-query';

import ProgressStatusBar from './progress-status-bar';

interface Props {
  campaignId: number;
}

/**
 * 캠페인 진행 상태 컴포넌트
 */
export default function CampaignProgress({ campaignId }: Props) {
  const { data: progressStatus } = useGetCampaignProgressStatus(campaignId);
  return (
    <>
      <ProgressStatusBar
        currentStatus={progressStatus.progress.status}
        isAlwaysOpen={progressStatus.isAlwaysOpen}
      />
    </>
  );
}
