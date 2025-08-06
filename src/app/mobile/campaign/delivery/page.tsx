import { CampaignType, Sort, 배송카테고리 } from '@/models/campaign';
import { prefetchDeliveryCampaigns } from '@/service/campaigns/campaigns-prefetch';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import DeliveryCampaignsContainer from './_components/delivery-campaigns-container';

/**
 * 배송 캠페인 페이지
 */
export default async function CampaignDeliveryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // searchParams Promise를 await로 처리
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page as string, 10)
    : undefined;
  const size = resolvedSearchParams.size
    ? parseInt(resolvedSearchParams.size as string, 10)
    : undefined;
  const categoryName = resolvedSearchParams.categoryName as 배송카테고리 | undefined;
  const campaignTypes = resolvedSearchParams.campaignTypes
    ? typeof resolvedSearchParams.campaignTypes === 'string'
      ? resolvedSearchParams.campaignTypes.split(',').map(type => type as CampaignType)
      : (resolvedSearchParams.campaignTypes as CampaignType[])
    : undefined;
  const sort = resolvedSearchParams.sort as Sort | undefined;

  // 프리 패칭
  const queryClient = prefetchDeliveryCampaigns({
    page,
    size,
    categoryName,
    campaignTypes,
    sort,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DeliveryCampaignsContainer />
    </HydrationBoundary>
  );
}
