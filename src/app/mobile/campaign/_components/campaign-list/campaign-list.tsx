import { useMemo } from 'react';

import SearchCampaignCard from '@/app/mobile/campaign/_components/search-campaign-card/search-campaign-card';
import SearchCampaignCardSkeleton from '@/app/mobile/campaign/_components/search-campaign-card/search-campaign-card-skeleton';
import { Campaign } from '@/models/campaign';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import CampaignListSkeleton from './campaign-list-skeleton';

interface Props {
  campaigns: Campaign[];
  totalElements: number;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  error?: Error | null;
}

/**
 * 캠페인 목록 컴포넌트
 */
export default function CampaignList({
  campaigns,
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

  console.log(campaigns);

  const isCampaigns = useMemo(() => (campaigns.length > 0 ? true : false), [campaigns]);

  // 로딩 상태 처리 (초기 로딩)
  if (isLoading && campaigns.length === 0) {
    return <CampaignListSkeleton count={12} />;
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex w-full items-center justify-center py-6">
        <p className="ck-body-2 text-ck-red-500">캠페인을 불러오는 중 오류가 발생했어요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="ck-body-2 text-ck-gray-900 px-5 pb-2">총 {totalElements}개</div>
      <div className="grid grid-cols-2 gap-6 px-5 pb-6">
        {isCampaigns &&
          campaigns.map((campaign, index) => {
            if (campaigns.length === index + 1) {
              return (
                <div ref={lastElementRef} key={`${campaign.id}-${index}`}>
                  <SearchCampaignCard campaign={campaign} />
                </div>
              );
            } else {
              return <SearchCampaignCard campaign={campaign} key={`${campaign.id}-${index}`} />;
            }
          })}

        {/* 다음 페이지 로딩 중 스켈레톤 */}
        {isFetchingNextPage &&
          Array.from({ length: 6 }, (_, index) => (
            <SearchCampaignCardSkeleton key={`loading-skeleton-${index}`} />
          ))}
      </div>

      {/* 캠페인이 없는 경우 */}
      {!isCampaigns && !isLoading && (
        <div className="flex w-full items-center justify-center py-6">
          <p className="ck-body-2 text-ck-gray-700">등록된 캠페인이 없어요.</p>
        </div>
      )}

      {/* 더 이상 불러올 데이터가 없는 경우 */}
      {!hasNextPage && campaigns.length > 0 && (
        <div className="flex w-full items-center justify-center py-6">
          <p className="ck-body-2 text-ck-gray-700">모든 캠페인을 불러왔어요.</p>
        </div>
      )}
    </>
  );
}
