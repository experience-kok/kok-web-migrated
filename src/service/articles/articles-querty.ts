import { createQueryKeys } from '@lukemorales/query-key-factory';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getKokArticle } from './articles-api';

export const articlesQueryKeys = createQueryKeys('articles', {});

// 체험콕 아티클 조회 쿼리
export function useGetKokArticle(campaignId: number) {
  return useSuspenseQuery({
    queryKey: ['articles', campaignId],
    queryFn: () => getKokArticle(campaignId),
  });
}
