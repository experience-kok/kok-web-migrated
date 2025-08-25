import { useState } from 'react';

import { ChevronDown, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

import AlertDialog from '@/components/shared/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Gender } from '@/models/user';
import {
  usePostApplicationsRejectMutation,
  usePostApplicationsSelectMutation,
} from '@/service/campaigns/campaigns-mutation';

import { UserApplicationCampaignStatus } from '@/types/campaigns/models';
import { SNSPlatformType } from '@/types/users/models';

import ApplicantsInfoBox from './applicants-info-box';
import ApplicantsSNS from './applicants-sns';

interface Props {
  campaignId: number;
  status: UserApplicationCampaignStatus;
  applicant: {
    applicationId: number;
    user: {
      id: number;
      nickname: string;
      phone: string;
      gender: Gender;
    };
    allSnsUrls: Array<{
      platformType: SNSPlatformType;
      snsUrl: string;
    }>;
  };
}

/**
 * 지원자 카드 컴포넌트
 */
export default function ApplicantsCard({ campaignId, status, applicant }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title?: string;
    description?: string;
    actionText?: string;
    onAction?: () => void;
  }>({
    isOpen: false,
  });

  const { mutate: postApplicationSelect } = usePostApplicationsSelectMutation(campaignId, [
    applicant.applicationId,
  ]);
  const { mutate: postApplicationReject } = usePostApplicationsRejectMutation(campaignId, [
    applicant.applicationId,
  ]);

  // 각 옵션별 실행 함수들
  const handleMissionHistory = () => {
    console.log(`미션 이력 for applicant ${applicant?.user.nickname}`);
    // 실제 API 호출 로직 - 미션 이력 페이지로 이동하거나 모달 띄우기
  };

  const handleSelect = () => {
    setAlertDialog({
      isOpen: true,
      title: '지원자를 선정할까요?',
      description: `${applicant?.user.nickname || '지원자'}님을 최종 선정해요. 
      선정 후에는 취소가 불가능하니 신중하게 결정해 주세요.`,
      actionText: '선정하기',
      onAction: () => {
        postApplicationSelect(undefined, {
          onSuccess: () => {
            toast.success(`${applicant?.user.nickname}님을 선정했어요.`, {
              position: 'top-center',
            });
          },
        });
      },
    });
  };

  const handleReject = () => {
    setAlertDialog({
      isOpen: true,
      title: '지원자를 거절할까요?',
      description: `${applicant?.user.nickname || '지원자'}님의 지원을 거절해요. 
      거절 후에는 취소가 불가능하니 신중하게 결정해 주세요.`,
      actionText: '거절하기',
      onAction: () => {
        postApplicationReject(undefined, {
          onSuccess: () => {
            toast.success(`${applicant?.user.nickname}님을 거절했어요.`, {
              position: 'top-center',
            });
          },
        });
      },
    });
  };

  const handleMissionComplete = () => {
    setAlertDialog({
      isOpen: true,
      title: '미션을 완료 처리할까요?',
      description: `${applicant?.user.nickname || '지원자'}님의 미션을 완료 처리해요.
      완료 후에는 취소가 불가능하니 신중하게 결정해 주세요.`,
      actionText: '완료 처리',
      onAction: () => {
        console.log(`미션 완료 for applicant ${applicant?.user.nickname}`);
        // 실제 API 호출 로직
      },
    });
  };

  const handleMissionRevisionRequest = () => {
    setAlertDialog({
      isOpen: true,
      title: '미션 수정을 요청할까요?',
      description: `${applicant?.user.nickname || '지원자'}님에게 미션 수정을 요청해요.`,
      actionText: '수정 요청',
      onAction: () => {
        console.log(`미션 수정 요청 for applicant ${applicant?.user.nickname}`);
        // 실제 API 호출 로직
      },
    });
  };

  const handleChangeStatus = () => {
    console.log(`상태 변경 for applicant ${applicant?.user.nickname}`);
    // 실제 API 호출 로직
  };

  // 상태별 드롭다운 메뉴 옵션
  const getDropdownOptions = () => {
    switch (status) {
      case 'APPLIED':
        return [{ label: '미션 이력', onClick: handleMissionHistory }];
      case 'PENDING':
        return [
          { label: '선정하기', onClick: handleSelect },
          { label: '거절하기', onClick: handleReject },
        ];
      case 'SELECTED':
        return [
          { label: '미션 완료', onClick: handleMissionComplete },
          { label: '미션 수정 요청', onClick: handleMissionRevisionRequest },
        ];
      case 'COMPLETED':
        return [{ label: '미션 이력', onClick: handleMissionHistory }];
      case 'REJECTED':
        return [{ label: '미션 이력', onClick: handleMissionHistory }];
      default:
        return [{ label: '상태 변경', onClick: handleChangeStatus }];
    }
  };

  const handleDropdownClick = (option: { label: string; onClick: () => void }) => {
    setIsDropdownOpen(false);
    option.onClick();
  };

  const dropdownOptions = getDropdownOptions();

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ApplicantsInfoBox nickname={applicant.user.nickname} profileUrl={'/kogi.png'} />

            <ApplicantsSNS snsAccounts={applicant.allSnsUrls} />
          </div>

          {/* 드롭다운 메뉴 */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <MoreVertical className="h-4 w-4" />
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                {dropdownOptions.map(option => (
                  <button
                    key={option.label}
                    onClick={() => handleDropdownClick(option)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 확인 다이얼로그 */}
      <AlertDialog
        isOpen={alertDialog.isOpen}
        onOpenChange={open => setAlertDialog(prev => ({ ...prev, isOpen: open }))}
        title={alertDialog.title}
        description={alertDialog.description}
        actionText={alertDialog.actionText}
        onAction={alertDialog.onAction}
        closeText="취소"
      />
    </>
  );
}
