import { Progress } from '@/components/ui/progress';

import { CAMPAIGN_PROGRESS_STATUS_LABELS, CampaignProgressStatus } from '@/types/campaigns/models';

interface Props {
  currentStatus: CampaignProgressStatus;
  isAlwaysOpen?: boolean; // 상시 캠페인 여부
}

const progressSteps = [
  {
    status: 'RECRUITING' as CampaignProgressStatus,
    shortLabel: '지원자 모집',
    description: '지원자를 모집중이에요.',
  },
  {
    status: 'RECRUITMENT_COMPLETED' as CampaignProgressStatus,
    shortLabel: '모집 완료',
    description: '지원자 모집을 완료했어요.',
  },
  {
    status: 'SELECTION_COMPLETED' as CampaignProgressStatus,
    shortLabel: '참가자 선정',
    description: '지원자 선정을 완료했어요. 현재는 미션 시작일까지 기다리는 중이에요.',
  },
  {
    status: 'MISSION_IN_PROGRESS' as CampaignProgressStatus,
    shortLabel: '미션 진행',
    description: '선정된 지원자들이 미션을 수행 중이에요.',
  },
  {
    status: 'CONTENT_REVIEW_PENDING' as CampaignProgressStatus,
    shortLabel: '콘텐츠 검토',
    description: '모든 지원자가 미션을 제출했어요. 업체의 검토가 필요해요.',
  },
];

/**
 * 캠페인 진행 상태 바 컴포넌트
 */
export default function ProgressStatusBar({ currentStatus, isAlwaysOpen = false }: Props) {
  const currentIndex = progressSteps.findIndex(step => step.status === currentStatus);

  // 진행률 계산 (0, 20, 40, 60, 80, 100)
  const getProgressValue = () => {
    if (currentIndex < 0 || isAlwaysOpen) return 0;
    return ((currentIndex + 1) / progressSteps.length) * 100;
  };

  const progressValue = getProgressValue();

  return (
    <div className="w-full px-5 pt-8 pb-10">
      {/* Progress Bar */}
      <div className="relative">
        <Progress value={progressValue} className="bg-ck-gray-300 h-2" />

        <div className="absolute -top-1 right-0 left-0 grid grid-cols-5">
          {progressSteps.map((step, index) => {
            const isCompleted = !isAlwaysOpen && index < currentIndex;
            const isCurrent = !isAlwaysOpen && index === currentIndex;

            return (
              <div key={step.status} className="flex flex-col items-center justify-self-center">
                {/* 원형 마커 */}
                <div
                  className={`relative z-10 h-4 w-4 rounded-full border-2 bg-white transition-all duration-300 ${
                    isAlwaysOpen
                      ? 'border-ck-gray-300'
                      : isCompleted || isCurrent
                        ? 'border-ck-blue-500 bg-ck-blue-500'
                        : 'border-ck-gray-300'
                  }`}
                />

                {/* 단계 라벨 */}
                <div className="mt-3 text-center">
                  <span
                    className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                      isAlwaysOpen
                        ? 'text-ck-gray-500'
                        : isCompleted || isCurrent
                          ? 'text-ck-blue-600'
                          : 'text-ck-gray-500'
                    }`}
                  >
                    {step.shortLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 현재 상태 설명 */}
      <div className="mt-12 text-center">
        <div className="bg-ck-gray-100 rounded-lg px-4 py-3">
          <p className="text-sm text-gray-700">
            {isAlwaysOpen
              ? '상시 캠페인은 진행 상태를 제공하지 않아요.'
              : currentIndex >= 0
                ? progressSteps[currentIndex].description
                : CAMPAIGN_PROGRESS_STATUS_LABELS[currentStatus]}
          </p>
        </div>
      </div>
    </div>
  );
}
