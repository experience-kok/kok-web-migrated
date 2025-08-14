'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ClientApplicationCampaignStatus } from '@/models/campaign';
import { useGetMyCampaigns } from '@/service/campaigns/campaigns-query';

/**
 * 지원 캠페인 목록 메뉴바
 */
export default function Menubar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('');

  const { data: myCampaignsLabels } = useGetMyCampaigns();

  // URL 파라미터에서 현재 상태 가져오기
  useEffect(() => {
    const status = searchParams.get('status') || '';
    setActiveTab(status);
  }, [searchParams]);

  // 버튼 데이터 생성 (key와 label 포함)
  const buttonData = Object.entries(myCampaignsLabels?.summary || {}).map(([key, value]) => ({
    key: key.toUpperCase() as ClientApplicationCampaignStatus, // API 키 (PENDING, APPROVED 등)
    label: value.label, // 표시용 라벨 (대기중, 승인됨 등)
    count: value.count,
  }));

  // 버튼 클릭 핸들러
  const handleTabChange = (statusKey: string) => {
    setActiveTab(statusKey);

    // URL 파라미터 업데이트
    const params = new URLSearchParams(searchParams);
    if (statusKey) {
      params.set('status', statusKey);
    } else {
      params.delete('status');
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <section className="flex">
        {/* 상태별 버튼들 */}
        {buttonData.map(item => (
          <Button
            variant={'ghost'}
            key={item.key}
            onClick={() => handleTabChange(item.key)}
            className={`ck-body-2 flex-1 justify-center gap-0 rounded-none border-b py-3 font-medium ${
              activeTab === item.key
                ? 'text-ck-gray-900 border-ck-gray-700 ck-body-2-bold'
                : 'text-ck-gray-700'
            }`}
          >
            {item.label}
            {item.count > 0 && (
              <span className="text-ck-gray-700 ck-caption-2">({item.count})</span>
            )}
          </Button>
        ))}
      </section>
    </>
  );
}
