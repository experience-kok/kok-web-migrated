import { prefetchCampaignSearch } from '@/service/campaigns/campaigns-prefetch';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import SearchCampaignsContainer from './_components/search-campaigns-container';

/**
 * 캠페인 검색 페이지
 */
export default async function CampaignSearch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const keyword = resolvedSearchParams.keyword;

  // keyword가 undefined인 경우 빈 문자열로 처리
  const searchKeyword = keyword || '';

  console.log(searchKeyword);

  const queryClient = prefetchCampaignSearch({
    keyword: searchKeyword,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchCampaignsContainer />
      </HydrationBoundary>
    </>
  );
}
