import { useMemo } from 'react';

import { Gender } from '@/models/user';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import { UserApplicationCampaignStatus } from '@/types/campaigns/models';

import ApplicantsCard from './applicants-card';

interface Props {
  applicants: Array<{
    applicationId: number;
    user: {
      id: number;
      nickname: string;
      phone: string;
      gender: Gender;
    };
    snsUrl: string;
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
      <div className="ck-body-2">총 {totalElements}명</div>

      <div className="grid gap-3 pb-6">
        <ApplicantsCard status={applicationStatus} />
        <ApplicantsCard status={applicationStatus} />
        {isApplicants &&
          applicants.map((applicant, index) => {
            if (applicants.length === index + 1) {
              return (
                <div ref={lastElementRef} key={`${applicant.user.id}-${index}`}>
                  <ApplicantsCard status={applicationStatus} />
                </div>
              );
            } else {
              return (
                <ApplicantsCard status={applicationStatus} key={`${applicant.user.id}-${index}`} />
              );
            }
          })}

        {/* 다음 페이지 로딩 중 스켈레톤 */}
        {/* {isFetchingNextPage &&
          Array.from({ length: 6 }, (_, index) => (
            <SearchCampaignCardSkeleton key={`loading-skeleton-${index}`} />
          ))} */}
      </div>

      {/* 캠페인이 없는 경우 */}
      {!isApplicants && !isLoading && (
        <div className="flex w-full items-center justify-center py-6">
          <p className="ck-body-2 text-ck-gray-700">지원한 유저가 없어요.</p>
        </div>
      )}

      {/* 더 이상 불러올 데이터가 없는 경우 */}
      {!hasNextPage && applicants.length > 0 && (
        <div className="flex w-full items-center justify-center py-6">
          <p className="ck-body-2 text-ck-gray-700">모든 지원자를 불러왔어요.</p>
        </div>
      )}
    </>
  );
}
