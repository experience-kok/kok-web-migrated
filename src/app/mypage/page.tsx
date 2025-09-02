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
import SnsSkeleton from './_components/sns/sns-skeleton';

export default function MyPage() {
  return (
    <>
      {/* 상단 프로필 영역 */}
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly fallback={<ProfileContainerSkeleton />}>
          <ProfileContainer />
        </Suspense>
      </ErrorBoundary>

      <SplitBox />

      {/* 내 캠페인 영역 */}
      <section className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="ck-title">내 캠페인</h2>
          <Link className="ck-body-2 text-muted-foreground" href={`/mypage/applications`}>
            더보기
          </Link>
        </div>

        <ErrorBoundary fallback={ErrorFallback}>
          <Suspense clientOnly fallback={<CampaignSkeleton />}>
            <Campaign />
          </Suspense>
        </ErrorBoundary>
      </section>

      <SplitBox />

      {/* 여기서 에러 발생 */}
      <section className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="ck-title">연결된 SNS</h2>
        </div>
        <ErrorBoundary fallback={ErrorFallback}>
          <Suspense clientOnly fallback={<SnsSkeleton />}>
            <Sns />
          </Suspense>
        </ErrorBoundary>
      </section>

      <SplitBox />

      {/* 메뉴 목록 영역 */}
      <section className="px-4">
        <div className="flex w-full items-center justify-between py-5">
          <span className="ck-body-2 font-semibold">공지사항</span>
          <ChevronRight width={16} height={16} className="text-muted-foreground" />
        </div>
        <Link href={'/client/register'}>
          <div className="flex w-full items-center justify-between py-5">
            <span className="ck-body-2 font-semibold">클라이언트 계정으로 전환하기</span>
            <ChevronRight width={16} height={16} className="text-muted-foreground" />
          </div>
        </Link>
      </section>
    </>
  );
}
