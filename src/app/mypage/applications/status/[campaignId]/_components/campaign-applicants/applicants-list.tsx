import { useMemo } from 'react';

import { Gender } from '@/models/user';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import { MissionStatusType, UserApplicationCampaignStatus } from '@/types/campaigns/models';
import { SNSPlatformType } from '@/types/users/models';

import ApplicantsCard from './applicants-card';
import ApplicantsListSkeleton from './applicants-list-skeleton';

interface Props {
  campaignId: number;
  applicants: Array<{
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
      missionId: number;
      missionUrl: string;
      missionStatus: MissionStatusType;
    };
  }>;
  applicationStatus: UserApplicationCampaignStatus;
  totalElements: number;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  error?: Error | null;
}

/**
 * 지원자 목록 컴포넌트
 */
export default function ApplicantsList({
  campaignId,
  applicants,
  applicationStatus,
  totalElements,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  error,
}: Props) {
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: onLoadMore || (() => {}),
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  });

  const isApplicants = useMemo(() => (applicants.length > 0 ? true : false), [applicants]);

  // 로딩 상태 처리
  if (isLoading && applicants.length === 0) {
    return <ApplicantsListSkeleton />;
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex w-full items-center justify-center py-6">
        <p className="ck-body-2 text-ck-red-500">지원자를 불러오는 중 오류가 발생했어요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="ck-body-2 mb-4">총 {totalElements}명</div>

      {applicationStatus === 'SELECTED' && (
        <div className="mb-2 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-ck-red-500 size-2 rounded-full" />
            <span>미제출</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-ck-blue-500 size-2 rounded-full" />
            <span>제출됨</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-yellow-500" />
            <span>수정요청</span>
          </div>
        </div>
      )}

      {/* 스크롤 가능한 컨테이너 - 최대 5개 카드 높이로 제한 */}
      <div
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-[500px] overflow-y-auto"
        style={{
          maxHeight: 'calc(5 * (100px + 12px))',
        }}
      >
        <div className="grid gap-3 pr-2">
          {isApplicants &&
            applicants.map((applicant, index) => {
              if (applicants.length === index + 1) {
                return (
                  <div ref={lastElementRef} key={`${applicant.user.id}-${index}`}>
                    <ApplicantsCard
                      campaignId={campaignId}
                      status={applicationStatus}
                      applicant={applicant}
                    />
                  </div>
                );
              } else {
                return (
                  <ApplicantsCard
                    campaignId={campaignId}
                    status={applicationStatus}
                    applicant={applicant}
                    key={`${applicant.user.id}-${index}`}
                  />
                );
              }
            })}

          {/* 다음 페이지 로딩 중 스켈레톤 */}
          {isFetchingNextPage &&
            Array.from({ length: 3 }, (_, index) => (
              <div key={`loading-skeleton-${index}`} className="animate-pulse">
                <div className="h-20 rounded-lg bg-gray-200"></div>
              </div>
            ))}

          {/* 더 이상 불러올 데이터가 없는 경우 */}
          {!hasNextPage && applicants.length > 0 && (
            <div className="flex w-full items-center justify-center py-4">
              <p className="ck-body-2 text-ck-gray-700">모든 지원자를 불러왔어요.</p>
            </div>
          )}
        </div>
      </div>

      {/* 지원자가 없는 경우 */}
      {!isApplicants && !isLoading && (
        <div className="flex w-full items-center justify-center py-6">
          <p className="ck-body-2 text-ck-gray-700">지원자가 없어요.</p>
        </div>
      )}
    </>
  );
}
