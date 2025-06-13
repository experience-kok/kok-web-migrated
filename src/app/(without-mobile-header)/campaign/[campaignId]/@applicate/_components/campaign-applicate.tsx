'use client';

import { Button } from '@/components/ui/button';
import { usePostCampaignApplicateMutation } from '@/service/campaigns/campaigns-mutation';
import { useGetCampaignApplicateCheck } from '@/service/campaigns/campaigns-query';

interface Props {
  campaignId: number;
}

/**
 * 캠페인 지원 UI
 */
export default function CampaignApplicate({ campaignId }: Props) {
  const { data: applicateData } = useGetCampaignApplicateCheck(campaignId);

  const { hasApplied } = applicateData.application;

  const { mutate: handlePostCampaignApplicate, isPending } =
    usePostCampaignApplicateMutation(campaignId);

  const handleSubmit = () => {
    handlePostCampaignApplicate(campaignId);
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isPending) return '지원중...';
    if (hasApplied) return '지원 완료된 캠페인이에요';
    return '지원하기';
  };

  return (
    <div>
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSubmit}
              size={'lg'}
              className="w-full px-6 font-medium"
              disabled={hasApplied || isPending}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
