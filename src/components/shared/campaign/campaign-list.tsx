import { useMemo } from 'react';

import CampaignCard from '@/components/shared/campaign-card';
import CampaignCardSkeleton from '@/components/shared/campaign-card/campaign-card-skeleton';
import { Text } from '@/components/ui/text';
import { Campaign } from '@/models/campaign';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import CampaignListSkeleton from './campaign-list-skeleton';

interface Props {
  campaigns: Campaign[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  error?: Error | null;
}

/**
 * 배송 캠페인 목록 컴포넌트
 */
export default function CampaignList({
  campaigns,
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

  const isCampaigns = useMemo(() => (campaigns.length > 0 ? true : false), [campaigns]);

  // 로딩 상태 처리 (초기 로딩)
  if (isLoading && campaigns.length === 0) {
    return <CampaignListSkeleton count={12} />;
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
      <div className="grid grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:px-16">
        {isCampaigns &&
          campaigns.map((campaign, index) => {
            // 마지막 요소에 ref 연결
            if (campaigns.length === index + 1) {
              return (
                <div ref={lastElementRef} key={`${campaign.id}-${index}`}>
                  <CampaignCard campaign={campaign} />
                </div>
              );
            } else {
              return <CampaignCard campaign={campaign} key={`${campaign.id}-${index}`} />;
            }
          })}

        {/* 다음 페이지 로딩 중 스켈레톤 */}
        {isFetchingNextPage &&
          Array.from({ length: 6 }, (_, index) => (
            <CampaignCardSkeleton key={`loading-skeleton-${index}`} />
          ))}
      </div>

      {/* 캠페인이 없는 경우 */}
      {!isCampaigns && !isLoading && (
        <div className="flex w-full items-center justify-center py-20">
          <Text size="lg" color="muted-foreground" weight="semibold">
            등록된 캠페인이 없어요.
          </Text>
        </div>
      )}

      {/* 더 이상 불러올 데이터가 없는 경우 */}
      {!hasNextPage && campaigns.length > 0 && (
        <div className="flex w-full items-center justify-center py-8">
          <Text size="sm" color="muted-foreground">
            모든 캠페인을 불러왔어요.
          </Text>
        </div>
      )}
    </>
  );
}
