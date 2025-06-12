'use client';

import { useEffect, useMemo } from 'react';

import { Suspense } from '@suspensive/react';
import { useSearchParams, useRouter } from 'next/navigation';

import { CampaignApplicationStatus } from '@/models/campaign';
import { useGetMyApplications } from '@/service/campaigns/campaigns-query';

import CampaignList from './campaign-list';
import Menubar from './menu-bar';

/**
 * 지원 목록 컨테이너 컴포넌트
 */
export default function ApplicationsContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => ({
      size: searchParams.get('size') ? parseInt(searchParams.get('size')!, 10) : undefined,
      applicationStatus: (searchParams.get('status') as CampaignApplicationStatus) || 'PENDING',
    }),
    [searchParams],
  );

  // applicationStatus가 없을 때 URL에 PENDING 추가
  useEffect(() => {
    if (!searchParams.get('status')) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('status', 'PENDING');
      router.replace(`${window.location.pathname}?${newParams.toString()}`);
    }
  }, [searchParams, router]);

  const {
    data: applications,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetMyApplications(params);

  const allApplications = applications?.pages.flatMap(page => page.applications) ?? [];

  return (
    <>
      <Suspense clientOnly>
        <Menubar />
      </Suspense>

      <Suspense clientOnly>
        <CampaignList
          applications={allApplications}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
          error={error}
        />
      </Suspense>
    </>
  );
}
