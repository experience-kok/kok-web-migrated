import { ErrorBoundary, Suspense } from '@suspensive/react';

import ErrorFallback from '@/components/shared/error-fallback';

import MyProfile from './_components/my-profile';
import MyProfileSkeleton from './_components/my-profile/my-profile-skeleton';

export default async function MyPage() {
  return (
    <>
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly fallback={<MyProfileSkeleton />}>
          <MyProfile />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
