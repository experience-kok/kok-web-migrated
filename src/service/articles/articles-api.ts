import { fetcher } from '@/lib/fetcher';

import { GetKokArticleResponse } from '@/types/articles/responses';

/**
 * 체험콕 아티클 조회
 */
export async function getKokArticle(campaignId: number) {
  const response = await fetcher.get<GetKokArticleResponse>(`/kok-article/${campaignId}`);

  return response;
}
