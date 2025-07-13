import { ErrorBoundary, Suspense } from '@suspensive/react';
import Link from 'next/link';

import ErrorFallback from '@/components/shared/error-fallback';
import SplitBox from '@/components/ui/split-box';

import Campaign from './_components/campaign';
import CampaignSkeleton from './_components/campaign/campaign-skeleton';
import ProfileContainer from './_components/profile-container';
import ProfileContainerSkeleton from './_components/profile-container/profile-container-skeleton';

export default function MyPage() {
  return (
    <>
      {/* 상단 프로필 컨테이너 */}
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly fallback={<ProfileContainerSkeleton />}>
          <ProfileContainer />
        </Suspense>
      </ErrorBoundary>

      <SplitBox className="h-2" />

      {/* 내 캠페인 영역 */}
      <section className="px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="chkok-title-sm">내 캠페인</h2>
          <Link href={`/mobile/mypage/applications`}>더보기</Link>
        </div>

        <ErrorBoundary fallback={ErrorFallback}>
          <Suspense clientOnly fallback={<CampaignSkeleton />}>
            <Campaign />
          </Suspense>
        </ErrorBoundary>
      </section>

      <SplitBox className="h-2" />
    </>
  );
}
