import { ErrorBoundary, Suspense } from '@suspensive/react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import ErrorFallback from '@/components/shared/error-fallback';
import SplitBox from '@/components/ui/split-box';

import Campaign from './_components/campaign';
import CampaignSkeleton from './_components/campaign/campaign-skeleton';
import ProfileContainer from './_components/profile-container';
import ProfileContainerSkeleton from './_components/profile-container/profile-container-skeleton';
import Sns from './_components/sns';

export default function MyPage() {
  return (
    <>
      {/* 상단 프로필 영역 */}
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly fallback={<ProfileContainerSkeleton />}>
          <ProfileContainer />
        </Suspense>
      </ErrorBoundary>

      <SplitBox className="h-2" />

      {/* 내 캠페인 영역 */}
      <section className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="chkok-title-sm">내 캠페인</h2>
          <Link
            className="chkok-text-sm text-muted-foreground"
            href={`/mobile/mypage/applications`}
          >
            더보기
          </Link>
        </div>

        <ErrorBoundary fallback={ErrorFallback}>
          <Suspense clientOnly fallback={<CampaignSkeleton />}>
            <Campaign />
          </Suspense>
        </ErrorBoundary>
      </section>

      <SplitBox className="h-2" />

      <section className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="chkok-title-sm">등록된 SNS</h2>
        </div>
        <Sns />
      </section>

      <SplitBox className="h-2" />

      {/* 메뉴 목록 영역 */}
      <section className="px-4">
        <div className="flex w-full items-center justify-between py-5">
          <span className="chkok-text-md font-semibold">공지사항</span>
          <ChevronRight width={16} height={16} className="text-muted-foreground" />
        </div>
      </section>
    </>
  );
}
