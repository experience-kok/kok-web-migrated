'use client';

import { Suspense } from '@suspensive/react';

import CampaignSearch from '@/components/layout.tsx/header/campaign-search';
import MapViewer from '@/components/shared/map-viewer';

export default function TestPage() {
  return (
    <>
      {/* <Suspense clientOnly>
        <CampaignSearch />
      </Suspense> */}

      <section className="p-4">
        <MapViewer />
      </section>
    </>
  );
}
