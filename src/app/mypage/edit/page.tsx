import { ErrorBoundary, Suspense } from '@suspensive/react';

import ErrorFallback from '@/components/shared/error-fallback';

import ProfileEditContainer from './_components/profile-edit-container';
import ProfileEditContainerSkeleton from './_components/profile-edit-container-skeleton';

/**
 * 내 정보 수정 페이지
 */
export default function ProfileEditPage() {
  return (
    <>
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly fallback={<ProfileEditContainerSkeleton />}>
          <ProfileEditContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
