import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getPopularCampaigns } from './campaigns-api';
import { GetPopularCampaignsRequest } from './types';

// campaigns 쿼리키
export const campaignsQueryKeys = createQueryKeys('campaigns', {
  popular: ({
    page,
    size,
    categoryType,
    campaignType,
    categoryName,
  }: GetPopularCampaignsRequest) => ({
    queryKey: ['popular', page, size, categoryType, campaignType, categoryName],
    queryFn: () => getPopularCampaigns({ page, size, categoryType, campaignType, categoryName }),
  }),
});
