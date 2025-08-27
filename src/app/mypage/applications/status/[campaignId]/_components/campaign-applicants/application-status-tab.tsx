'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { UserApplicationCampaignStatus } from '@/types/campaigns/models';

interface Props {
  activeTab: UserApplicationCampaignStatus;
  onValueChange: (tab: UserApplicationCampaignStatus) => void;
}

/**
 * 캠페인 신청자 상태 탭 컴포넌트
 */
export default function ApplicationStatusTab({ activeTab, onValueChange }: Props) {
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={value => onValueChange(value as UserApplicationCampaignStatus)}
      >
        <TabsList className="mb-6 grid w-full grid-cols-5 rounded-lg bg-gray-100">
          <TabsTrigger value="APPLIED">신청</TabsTrigger>
          <TabsTrigger value="PENDING">대기</TabsTrigger>
          <TabsTrigger value="SELECTED">선정</TabsTrigger>
          <TabsTrigger value="COMPLETED">미션완료</TabsTrigger>
          <TabsTrigger value="REJECTED">거절</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
