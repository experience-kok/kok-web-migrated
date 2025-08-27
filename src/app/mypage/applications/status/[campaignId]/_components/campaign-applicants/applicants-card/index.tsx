import { useState } from 'react';

import { ChevronDown, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

import AlertDialog from '@/components/shared/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gender } from '@/models/user';
import {
  usePostApplicationsRejectMutation,
  usePostApplicationsSelectMutation,
} from '@/service/campaigns/campaigns-mutation';

import { MissionStatusType, UserApplicationCampaignStatus } from '@/types/campaigns/models';
import { SNSPlatformType } from '@/types/users/models';

import MissionHistoryDialog from '../mission-history/mission-history-dialog';
import MissionReviewDialog from '../mission-review/mission-review-dialog';

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
    mission: {
      missionStatus: MissionStatusType;
      missionUrl: string;
      missionId: number;
    };
  };
}

/**
 * 지원자 카드 컴포넌트
 */
export default function ApplicantsCard({ campaignId, status, applicant }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 다이얼로그 상태
  const [isMissionHistoryOpen, setIsMissionHistoryOpen] = useState(false);
  const [isMissionReviewOpen, setIsMissionReviewOpen] = useState(false);
  const [missionReviewType, setMissionReviewType] = useState<'COMPLETE' | 'REVISION'>('COMPLETE');

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
    setIsMissionHistoryOpen(true);
  };
  const handleMissionComplete = () => {
    setMissionReviewType('COMPLETE');
    setIsMissionReviewOpen(true);
  };
  const handleMissionRevisionRequest = () => {
    setMissionReviewType('REVISION');
    setIsMissionReviewOpen(true);
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
          { label: '미션 이력', onClick: handleMissionHistory },
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

  const missionStatusStyle = (() => {
    if (status === 'SELECTED') {
      switch (applicant.mission.missionStatus) {
        case 'NOT_SUBMITTED':
          return 'border border-ck-red-500'; // 미션 대기 중
        case 'SUBMITTED':
          return 'border border-ck-blue-500'; // 미션 제출
        case 'REVISION_REQUESTED':
          return 'border border-yellow-500'; // 미션 수정 요청
        default:
          return '';
      }
    }
    return '';
  })();

  return (
    <>
      <Card className={`${status === 'SELECTED' ? missionStatusStyle : ''}`}>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ApplicantsInfoBox nickname={applicant.user.nickname} profileUrl={'/kogi.png'} />

            <ApplicantsSNS snsAccounts={applicant.allSnsUrls} />
          </div>

          {/* 드롭다운 메뉴 */}
          <div className="relative">
            <Button
              variant={'ghost'}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="ck-caption-1 border-ck-gray-300 hover:bg-ck-gray-100 flex items-center space-x-1 rounded-[12px] border bg-white px-3 py-2 focus:outline-none"
            >
              <MoreVertical className="h-4 w-4" />
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="border-ck-gray-200 absolute right-0 z-10 mt-2 w-48 rounded-[12px] border bg-white py-1 shadow-lg">
                {dropdownOptions.map(option => (
                  <button
                    key={option.label}
                    onClick={() => handleDropdownClick(option)}
                    className="ck-body-2 text-ck-gray-900 block w-full px-4 py-2 text-left focus:outline-none"
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

      {/* 미션 이력 다이얼로그 */}
      <MissionHistoryDialog
        userId={applicant.user.id}
        isOpen={isMissionHistoryOpen}
        onOpenChange={setIsMissionHistoryOpen}
        applicantNickname={applicant.user.nickname}
      />

      {/* 미션 리뷰 다이얼로그 */}
      <MissionReviewDialog
        isOpen={isMissionReviewOpen}
        onOpenChange={setIsMissionReviewOpen}
        missionReviewType={missionReviewType}
        missionId={applicant.mission.missionId}
        applicantNickname={applicant.user.nickname}
      />
    </>
  );
}
