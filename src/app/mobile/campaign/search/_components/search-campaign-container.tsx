'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import CampaignList from '@/app/mobile/campaign/_components/campaign-list/campaign-list';
import { useGetCampaignSearch } from '@/service/campaigns/campaigns-query';

/**
 * 캠페인 검색 조회 컨테이너
 */
export default function SearchCampaignContainer() {
  const searchParams = useSearchParams();

  const params = useMemo(
    () => ({
      size: searchParams.get('size') ? parseInt(searchParams.get('size')!, 10) : undefined,
      keyword: searchParams.get('keyword') || '',
    }),
    [searchParams],
  );

  const {
    data: campaigns,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetCampaignSearch(params);

  const allCampaigns = campaigns?.pages.flatMap(page => page.campaigns) ?? [];

  return (
    <>
      <CampaignList
        campaigns={allCampaigns}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
        error={error}
      />
    </>
  );
}
