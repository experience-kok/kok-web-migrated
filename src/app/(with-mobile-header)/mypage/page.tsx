import { Suspense } from '@suspensive/react';

import MyProfile from './_components/my-profile';
import MyProfileSkeleton from './_components/my-profile/my-profile-skeleton';

export default async function MyPage() {
  return (
    <>
      <Suspense clientOnly fallback={<MyProfileSkeleton />}>
        <MyProfile />
      </Suspense>
    </>
  );
}
