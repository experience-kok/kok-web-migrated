'use client';

import { useGetMyCampaigns } from '@/service/campaigns/campaigns-query';

/**
 * 내 정보 내 캠페인 컴포넌트
 * /mypage
 */
export default function Campaign() {
  const { data: myCampaigns } = useGetMyCampaigns();

  return (
    <>
      {/* myCampaigns.summary의 항목 수에 관계없이 한 줄에 고르게 표시되도록 flexbox를 사용합니다. */}
      <div className="flex justify-around divide-x">
        {myCampaigns.summary &&
          Object.entries(myCampaigns.summary).map(([key, value]) => (
            <div className="flex flex-grow flex-col items-center gap-1" key={key}>
              <span
                className={`ck-body-1 ${value.count === 0 ? 'text-muted-foreground' : 'text-primary'}`}
              >
                {value.count}
              </span>
              <span
                className={`ck-body-2 font-semibold ${value.count === 0 ? 'text-muted-foreground' : ''}`}
              >
                {value.label}
              </span>
            </div>
          ))}
      </div>
    </>
  );
}
