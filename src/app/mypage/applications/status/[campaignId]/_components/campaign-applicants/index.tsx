'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useGetCampaignApplications } from '@/service/campaigns/campaigns-query';

import { UserApplicationCampaignStatus } from '@/types/campaigns/models';

import ApplicantsList from './applicants-list';
import ApplicationStatusTab from './application-status-tab';

interface Props {
  campaignId: number;
}

/**
 * 캠페인 지원자 관리 탭 컴포넌트
 */
export default function CampaignApplicants({ campaignId }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 파라미터에서 applicationStatus 가져오기
  const getApplicationStatus = (): UserApplicationCampaignStatus | undefined => {
    const status = searchParams.get('applicationStatus');

    console.log('Status from searchParams:', status); // 디버깅용

    if (!status) return undefined;

    // UserApplicationCampaignStatus 타입인지 검증
    const validStatuses: UserApplicationCampaignStatus[] = [
      'APPLIED',
      'PENDING',
      'SELECTED',
      'COMPLETED',
      'REJECTED',
    ];

    if (validStatuses.includes(status as UserApplicationCampaignStatus)) {
      return status as UserApplicationCampaignStatus;
    }

    return undefined;
  };

  // 활성 탭 상태
  const [activeTab, setActiveTab] = useState<UserApplicationCampaignStatus>(
    getApplicationStatus() || 'APPLIED',
  );

  // API 호출 파라미터 설정
  const params = {
    campaignId,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : undefined,
    size: searchParams.get('size') ? parseInt(searchParams.get('size')!, 10) : undefined,
    applicationStatus: getApplicationStatus(),
  };

  // 탭 변경 함수
  const handleTabChange = (tab: UserApplicationCampaignStatus) => {
    setActiveTab(tab);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', '1');
    current.set('applicationStatus', tab);

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${window.location.pathname}${query}`);
  };

  const {
    data: applicationsData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetCampaignApplications(params);

  const allApplicants = applicationsData?.pages.flatMap(page => page.applicants) ?? [];
  const totalElements = applicationsData?.pages[0]?.pagination.totalElements ?? 0;

  return (
    <section className="px-5">
      <h1 className="ck-title mb-4">지원자 목록</h1>
      {/* 탭 메뉴 */}
      <ApplicationStatusTab activeTab={activeTab} onValueChange={handleTabChange} />

      <ApplicantsList
        applicants={allApplicants}
        applicationStatus={activeTab}
        totalElements={totalElements}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
        error={error}
      />
    </section>
  );
}
