'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import CampaignList from '@/app/campaign/_components/campaign-list/campaign-list';
import { CampaignType, Sort, 배송카테고리 } from '@/models/campaign';
import { useGetDeliveryCampaigns } from '@/service/campaigns/campaigns-query';

import CampaignFilter from '../../_components/campaign-filter';
import CampaignSort from '../../_components/campaign-sort';

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
  const totalElements = campaigns?.pages[0].pagination.totalElements ?? 0;

  return (
    <>
      <CategoryTab />
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
