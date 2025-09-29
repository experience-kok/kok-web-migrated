import Link from 'next/link';

import BottomButton from '@/components/shared/bottom-button';
import { getKokArticle } from '@/service/articles/articles-api';

interface Props {
  params: Promise<{
    campaignId: string;
  }>;
}

/**
 * 캠페인 아티클 페이지 입니다.
 */
export default async function CampaignArticlePage({ params }: Props) {
  const { campaignId } = await params;
  const { kokPost } = await getKokArticle(Number(campaignId));

  return (
    <>
      <article className="mx-auto max-w-4xl bg-gray-50 p-6 pb-32">
        <div
          className="prose prose-lg max-w-none [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-800 [&_img]:my-6 [&_img]:rounded-lg [&_img]:shadow-lg [&_p]:mb-4 [&_p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: kokPost.content }}
        />
      </article>

      <Link href={`/campaign/${kokPost.campaignId}`}>
        <BottomButton>캠페인 구경하기</BottomButton>
      </Link>
    </>
  );
}
