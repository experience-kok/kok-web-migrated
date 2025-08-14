import { CampaignType, Sort } from '@/models/campaign';
import { prefetchCampaignSearch } from '@/service/campaigns/campaigns-prefetch';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import SearchCampaignContainer from './_components/search-campaign-container';

/**
 * 캠페인 검색 페이지
 */
export default async function CampaignSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const keyword = resolvedSearchParams.keyword;

  const campaignTypes = resolvedSearchParams.campaignTypes
    ? typeof resolvedSearchParams.campaignTypes === 'string'
      ? resolvedSearchParams.campaignTypes.split(',').map(type => type as CampaignType)
      : (resolvedSearchParams.campaignTypes as CampaignType[])
    : undefined;
  const sort = resolvedSearchParams.sort as Sort | undefined;

  // keyword가 undefined인 경우 빈 문자열로 처리
  const searchKeyword = keyword || '';

  const queryClient = prefetchCampaignSearch({
    keyword: searchKeyword,
    campaignTypes,
    sort,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchCampaignContainer />
      </HydrationBoundary>
    </>
  );
}
