'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import CampaignList from '@/app/mobile/campaign/_components/campaign-list/campaign-list';
import { CampaignType, Sort, 배송카테고리 } from '@/models/campaign';
import { useGetDeliveryCampaigns } from '@/service/campaigns/campaigns-query';

import CategoryTab from './category-tab';

/**
 * 배송 캠페인 컨테이너
 */
export default function DeliveryCampaignsContainer() {
  const searchParams = useSearchParams();

  const params = useMemo(
    () => ({
      size: searchParams.get('size') ? parseInt(searchParams.get('size')!, 10) : undefined,
      categoryName: searchParams.get('categoryName') as 배송카테고리 | undefined,
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
  } = useGetDeliveryCampaigns(params);

  const allCampaigns = campaigns?.pages.flatMap(page => page.campaigns) ?? [];

  return (
    <>
      <CategoryTab />
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
