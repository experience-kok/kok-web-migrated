'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import AlertDialog, { AlertDialogConfig } from '@/components/shared/alert-dialog';
import InfoDialog, { InfoDialogConfig } from '@/components/shared/info-dialog';
import { Button } from '@/components/ui/button';
import { isFetcherError } from '@/lib/fetcher';
import { usePostCampaignApplicateMutation } from '@/service/campaigns/campaigns-mutation';
import { useGetCampaignApplicateCheck } from '@/service/campaigns/campaigns-query';

import {
  CAMPAIGN_APPLICATION_ERROR_CODES,
  getCampaignApplicationErrorMessage,
  getCampaignApplicationErrorTitle,
} from '@/types/campaigns/errors';

interface Props {
  campaignId: number;
}

/**
 * 캠페인 지원 UI
 */
export default function CampaignApplicate({ campaignId }: Props) {
  const router = useRouter();

  const [alertDialog, setAlertDialog] = useState<AlertDialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    actionText: '확인',
    onAction: undefined,
  });
  const [infoDialog, setInfoDialog] = useState<InfoDialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    actionText: '확인',
    onAction: undefined,
  });

  const { data: applicateData } = useGetCampaignApplicateCheck(campaignId);
  const { hasApplied } = applicateData.application;

  const { mutate: handlePostCampaignApplicate, isPending } =
    usePostCampaignApplicateMutation(campaignId);

  const handleSubmit = () => {
    handlePostCampaignApplicate(campaignId, {
      onError: error => {
        if (isFetcherError(error) && error.data?.errorCode) {
          const errorCode = error?.data?.errorCode;
          const title = getCampaignApplicationErrorTitle(errorCode);
          const message = getCampaignApplicationErrorMessage(errorCode);

          // 에러 코드별 액션 설정
          let actionText = '확인';
          let onAction: (() => void) | undefined = undefined;

          switch (errorCode) {
            case CAMPAIGN_APPLICATION_ERROR_CODES.PROFILE_INCOMPLETE:
            case CAMPAIGN_APPLICATION_ERROR_CODES.SNS_CONNECTION_REQUIRED:
            case CAMPAIGN_APPLICATION_ERROR_CODES.PLATFORM_MISMATCH:
              actionText = '프로필 수정하기';
              onAction = () => router.push('/mypage');
              setAlertDialog({
                isOpen: true,
                title,
                description: message,
                actionText,
                onAction,
              });
              break;

            case CAMPAIGN_APPLICATION_ERROR_CODES.INSUFFICIENT_ROLE:
              actionText = '확인';
              onAction = undefined;
              setInfoDialog({
                isOpen: true,
                title,
                description: message,
                actionText,
                onAction,
              });
              break;
          }
        }
      },
    });
  };

  const closeAlertDialog = () => {
    setAlertDialog(prev => ({
      ...prev,
      isOpen: false,
    }));
  };
  const closeInfoDialog = () => {
    setInfoDialog(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isPending) return '지원중...';
    if (hasApplied) return '지원 완료된 캠페인이에요';
    return '지원하기';
  };

  return (
    <div>
      <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-[600px] bg-white shadow-lg">
        <div className="px-4 pt-0 pb-8">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSubmit}
              size={'lg'}
              className="ck-body-1-bold mx-auto h-[53px] w-full max-w-[600px] rounded-[12px] px-6"
              disabled={hasApplied || isPending}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog
        isOpen={alertDialog.isOpen}
        onOpenChange={closeAlertDialog}
        title={alertDialog.title}
        description={alertDialog.description}
        actionText={alertDialog.actionText}
        onAction={alertDialog.onAction}
      />

      <InfoDialog
        isOpen={infoDialog.isOpen}
        onOpenChange={closeInfoDialog}
        title={infoDialog.title}
        description={infoDialog.description}
        actionText={infoDialog.actionText}
        onAction={infoDialog.onAction}
      />
    </div>
  );
}
