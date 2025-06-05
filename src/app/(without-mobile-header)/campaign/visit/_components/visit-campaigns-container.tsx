'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import CampaignList from '@/components/shared/campaign/campaign-list';
import { CampaignType, Sort, 방문카테고리 } from '@/models/campaign';
import { useGetVisitCampaigns } from '@/service/campaigns/campaigns-query';

import Filter from './filter';

/**
 * 방문 캠페인 컨테이너
 */
export default function VisitCampaignsContainer() {
  const searchParams = useSearchParams();

  const params = useMemo(
    () => ({
      size: searchParams.get('size') ? parseInt(searchParams.get('size')!, 10) : undefined,
      categoryName: searchParams.get('categoryName') as 방문카테고리 | undefined,
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
  } = useGetVisitCampaigns(params);

  const allCampaigns = campaigns?.pages.flatMap(page => page.campaigns) ?? [];

  return (
    <>
      <Filter totalElements={campaigns?.pages[0]?.pagination?.totalElements ?? 0} />
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
