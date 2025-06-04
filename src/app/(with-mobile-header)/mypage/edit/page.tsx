import { ErrorBoundary, Suspense } from '@suspensive/react';

import ErrorFallback from '@/components/shared/error-fallback';

import ProfileEditContainer from './_components/profile-edit-container';

export default function ProfileEditPage() {
  return (
    <>
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly>
          <ProfileEditContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
