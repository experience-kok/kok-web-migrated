import { ErrorBoundary, Suspense } from '@suspensive/react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import ErrorFallback from '@/components/shared/error-fallback';
import SplitBox from '@/components/ui/split-box';
import { Text } from '@/components/ui/text';

import Campaign from './_components/campaign';
import CampaignSkeleton from './_components/campaign/campaign-skeleton';
import MyProfile from './_components/my-profile';
import MyProfileSkeleton from './_components/my-profile/my-profile-skeleton';
import Sns from './_components/sns';

export default async function MyPage() {
  return (
    <>
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly fallback={<MyProfileSkeleton />}>
          <MyProfile />
        </Suspense>
      </ErrorBoundary>

      <SplitBox className="h-2" />

      <section className="px-6 py-10">
        <div className="flex items-center justify-between">
          <Text as="h2" size="xl" weight="bold" className="mb-4">
            내 캠페인
          </Text>
          <Link href={`/mypage/applications`}>더보기</Link>
        </div>
        <ErrorBoundary fallback={ErrorFallback}>
          <Suspense clientOnly fallback={<CampaignSkeleton />}>
            <Campaign />
          </Suspense>
        </ErrorBoundary>
      </section>

      <SplitBox className="h-2" />

      <Sns />

      <SplitBox className="h-2" />

      <section>
        <div className="flex w-full items-center justify-between px-6 py-5">
          <Text size={'xl'} weight={'bold'}>
            공지사항
          </Text>
          <ChevronRight width={24} height={24} />
        </div>
        <div className="flex w-full items-center justify-between px-6 py-5">
          <Text size={'xl'} weight={'bold'}>
            고객센터
          </Text>
          <ChevronRight width={24} height={24} />
        </div>
        <div className="flex w-full items-center justify-between px-6 py-5">
          <Text size={'xl'} weight={'bold'}>
            알림센터
          </Text>
          <ChevronRight width={24} height={24} />
        </div>
      </section>

      <SplitBox className="h-2" />
    </>
  );
}
