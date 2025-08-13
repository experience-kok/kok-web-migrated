'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import CampaignList from '@/app/mobile/campaign/_components/campaign-list/campaign-list';
import { CampaignType, Sort } from '@/models/campaign';
import { useGetCampaignSearch } from '@/service/campaigns/campaigns-query';

import CampaignFilter from '../../_components/campaign-filter';
import CampaignSort from '../../_components/campaign-sort';

/**
 * 캠페인 검색 조회 컨테이너
 */
export default function SearchCampaignContainer() {
  const searchParams = useSearchParams();

  const params = useMemo(
    () => ({
      size: searchParams.get('size') ? parseInt(searchParams.get('size')!, 10) : undefined,
      keyword: searchParams.get('keyword') || '',
      campaignTypes: searchParams.get('campaignTypes')?.split(',') as CampaignType[] | undefined,
      sort: searchParams.get('sort') as Sort | undefined,
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
  const totalElements = campaigns?.pages[0].pagination.totalElements ?? 0;

  return (
    <>
      <div className="flex w-full items-center gap-1 px-5 py-4">
        <CampaignFilter />
        <CampaignSort />
      </div>
      <CampaignList
        campaigns={allCampaigns}
        totalElements={totalElements}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
        error={error}
      />
    </>
  );
}
