import { CAMPAIGN_PROGRESS_STATUS_LABELS, CampaignProgressStatus } from '@/types/campaigns/models';

interface Props {
  currentStatus: CampaignProgressStatus;
  isAlwaysOpen?: boolean; // 상시 캠페인 여부
}

const progressSteps = [
  {
    status: 'RECRUITMENT_COMPLETED' as CampaignProgressStatus,
    shortLabel: '지원자 모집',
    description: '지원자 모집이 완료되었어요.',
  },
  {
    status: 'SELECTION_COMPLETED' as CampaignProgressStatus,
    shortLabel: '참가자 선정',
    description: '지원자 선정이 완료되었어요. 현재는 미션 시작일까지 기다리는 중이에요.',
  },
  {
    status: 'MISSION_IN_PROGRESS' as CampaignProgressStatus,
    shortLabel: '미션 진행',
    description: '선정된 지원자들이 미션을 수행 중이에요.',
  },
  {
    status: 'CONTENT_REVIEW_PENDING' as CampaignProgressStatus,
    shortLabel: '콘텐츠 검토',
    description: '미션 제출이 완료되었어요. 업체의 검토가 필요해요.',
  },
];

/**
 * 캠페인 진행 상태 바 컴포넌트
 */
export default function ProgressStatusBar({ currentStatus, isAlwaysOpen = false }: Props) {
  const currentIndex = progressSteps.findIndex(step => step.status === currentStatus);

  return (
    <div className="w-full px-5 py-8">
      {/* 진행 바 컨테이너 */}
      <div className="relative flex w-full items-center justify-between">
        {/* 배경 연결선 */}
        <div className="bg-ck-gray-300 absolute top-2 left-0 z-0 h-0.5 w-full"></div>

        {/* 진행된 연결선 - 상시 캠페인일 경우 표시하지 않음 */}
        {!isAlwaysOpen && (
          <div
            className="bg-ck-blue-500 absolute top-2 left-0 z-10 h-0.5 transition-all duration-500"
            style={{
              width:
                currentIndex >= 0 ? `${(currentIndex / (progressSteps.length - 1)) * 100}%` : '0%',
            }}
          ></div>
        )}

        {/* 진행 점들 */}
        {progressSteps.map((step, index) => (
          <div key={step.status} className="relative z-20 flex flex-col items-center">
            {/* 원형 점 */}
            <div
              className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                isAlwaysOpen
                  ? 'border-ck-gray-300 bg-white' // 상시 캠페인일 경우 모두 회색
                  : index <= currentIndex
                    ? 'border-ck-blue-500 bg-ck-blue-500'
                    : 'border-ck-gray-300 bg-white'
              }`}
            ></div>

            {/* 레이블 텍스트 */}
            <div className="mt-3 text-center">
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isAlwaysOpen
                    ? 'text-ck-gray-500' // 상시 캠페인일 경우 모두 회색
                    : index <= currentIndex
                      ? 'text-ck-blue-600'
                      : 'text-ck-gray-500'
                }`}
              >
                {step.shortLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 현재 상태 설명 */}
      <div className="mt-8 text-center">
        <p className="bg-ck-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700">
          {isAlwaysOpen
            ? `상시 캠페인은 ${CAMPAIGN_PROGRESS_STATUS_LABELS[currentStatus].toLowerCase()}`
            : CAMPAIGN_PROGRESS_STATUS_LABELS[currentStatus]}
        </p>
      </div>
    </div>
  );
}
