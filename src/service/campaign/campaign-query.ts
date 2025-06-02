import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getPopularCampaigns } from './campaign-api';
import { GetPopularCampaignsRequest } from './types';

// campaigns 쿼리키
export const campaignsQueryKeys = createQueryKeys('campaigns', {
  popular: ({ page, size, categoryType, campaignType }: GetPopularCampaignsRequest) => ({
    queryKey: ['popular', page, size, categoryType, campaignType],
    queryFn: () => getPopularCampaigns({ page, size, categoryType, campaignType }),
  }),
});
