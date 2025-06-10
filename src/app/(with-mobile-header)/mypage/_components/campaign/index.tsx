'use client';

import { Text } from '@/components/ui/text';
import { useGetMyCampaigns } from '@/service/campaigns/campaigns-query';

/**
 * 마이페이지 내 켐페인 영역 컴포넌트
 */
export default function Campaign() {
  const { data: myCampaigns } = useGetMyCampaigns();

  return (
    <div className="grid grid-cols-4 divide-x">
      {myCampaigns.summary &&
        Object.entries(myCampaigns.summary).map(([key, value]) => (
          <div className="flex flex-col items-center gap-1" key={key}>
            <Text size="xl" weight="bold" color="primary">
              {value.count}
            </Text>
            <Text size="lg" weight="semibold">
              {value.label}
            </Text>
          </div>
        ))}
    </div>
  );
}
