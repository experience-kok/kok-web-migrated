'use client';

import { Suspense } from '@suspensive/react';

import CampaignSearch from '@/components/layout.tsx/header/campaign-search';

export default function TestPage() {
  return (
    <>
      <Suspense clientOnly>
        <CampaignSearch />
      </Suspense>
    </>
  );
}
