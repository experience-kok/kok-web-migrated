'use client';

import { Button } from '@/components/ui/button';
import { useGetCampaignApplicateCheck } from '@/service/campaigns/campaigns-query';

interface Props {
  campaignId: number;
}

/**
 * 캠페인 신청 UI
 * @returns
 */
export default function CampaignApplicate({ campaignId }: Props) {
  const { data: applicateData } = useGetCampaignApplicateCheck(campaignId);
  console.log(applicateData);

  const { hasApplied } = applicateData.application;

  return (
    <div>
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Button size={'lg'} className="w-full px-6 font-medium" disabled={hasApplied}>
              {hasApplied ? '지원 완료된 캠페인이에요' : '지원하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
