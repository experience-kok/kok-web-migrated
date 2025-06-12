import { Suspense } from '@suspensive/react';

import Menubar from './_components/menu-bar';

/**
 * 지원 캠페인 목록 페이지
 */
export default function ApplicationsPage() {
  return (
    <>
      <Suspense clientOnly>
        <Menubar />
      </Suspense>
    </>
  );
}
