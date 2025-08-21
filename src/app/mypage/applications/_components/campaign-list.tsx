'use client';

import { useMemo } from 'react';

import CampaignCardSkeleton from '@/components/shared/campaign-card/campaign-card-skeleton';
import { Text } from '@/components/ui/text';
import { CampaignApplicationStatus, CampaignType } from '@/models/campaign';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import CampaignItem from './campaign-item';
import CampaignItemSkeleton from './campaign-item-skeleton';

interface Props {
  applications: {
    id: number;
    applicationStatus: CampaignApplicationStatus;
    campaign: {
      id: number;
      title: string;
      thumbnailUrl: string;
      productShortInfo: string;
      campaignType: CampaignType;
    };
    user: {
      id: number;
      nickname: string;
    };
  }[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  error?: Error | null;
}

/**
 * 지원 목록 컴포넌트
 */
export default function CampaignList({
  applications,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  onLoadMore,
  error,
}: Props) {
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: onLoadMore || (() => {}),
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  });

  const isApplications = useMemo(() => (applications.length > 0 ? true : false), [applications]);

  // 로딩 상태 처리 (초기 로딩)
  if (isLoading && applications.length === 0) {
    return (
      <div className="flex flex-col gap-4 px-5 pt-5 pb-10">
        {Array.from({ length: 6 }, (_, index) => (
          <CampaignItemSkeleton key={`campaign-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <Text size="lg" color="red">
          캠페인을 불러오는 중 오류가 발생했어요.
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-5 pt-5 pb-10">
        {isApplications &&
          applications.map((application, index) => {
            // applicationStatus가 COMPLETED 또는 EXPIRED인 경우 grayscale 적용
            const shouldApplyGrayscale =
              application.applicationStatus === 'COMPLETED' ||
              application.applicationStatus === 'EXPIRED';

            // 마지막 요소에 ref 연결
            if (applications.length === index + 1) {
              return (
                <div ref={lastElementRef} key={`${application.id}-${index}`}>
                  <CampaignItem
                    key={`${application.id}-${index}`}
                    id={application.id}
                    thumbnailUrl={application.campaign.thumbnailUrl}
                    title={application.campaign.title}
                    productShortInfo={application.campaign.productShortInfo}
                    campaignType={application.campaign.campaignType}
                    applicationStatus={application.applicationStatus}
                    grayscale={shouldApplyGrayscale}
                  />
                </div>
              );
            } else {
              return (
                <CampaignItem
                  key={`${application.id}-${index}`}
                  id={application.id}
                  thumbnailUrl={application.campaign.thumbnailUrl}
                  title={application.campaign.title}
                  productShortInfo={application.campaign.productShortInfo}
                  campaignType={application.campaign.campaignType}
                  applicationStatus={application.applicationStatus}
                  grayscale={shouldApplyGrayscale}
                />
              );
            }
          })}

        {/* 다음 페이지 로딩 중 스켈레톤 */}
        {isFetchingNextPage &&
          Array.from({ length: 6 }, (_, index) => (
            <CampaignCardSkeleton key={`loading-skeleton-${index}`} />
          ))}
      </div>

      {/* 캠페인이 없는 경우 */}
      {!isApplications && !isLoading && (
        <div className="flex w-full items-center justify-center py-20">
          <Text size="lg" color="muted-foreground" weight="semibold">
            등록된 캠페인이 없어요.
          </Text>
        </div>
      )}

      {/* 더 이상 불러올 데이터가 없는 경우 */}
      {!hasNextPage && applications.length > 0 && (
        <div className="flex w-full items-center justify-center py-8">
          <Text size="sm" color="muted-foreground">
            모든 캠페인을 불러왔어요.
          </Text>
        </div>
      )}
    </>
  );
}
