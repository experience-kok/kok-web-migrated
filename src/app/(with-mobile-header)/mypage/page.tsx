import { ErrorBoundary, Suspense } from '@suspensive/react';
import { ChevronRight } from 'lucide-react';

import ErrorFallback from '@/components/shared/error-fallback';
import SplitBox from '@/components/ui/split-box';
import { Text } from '@/components/ui/text';

import Campaign from './_components/campaign';
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

      <Campaign />

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
