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
      <div className="grid grid-cols-4 divide-x">
        {myCampaigns.summary &&
          Object.entries(myCampaigns.summary).map(([key, value]) => (
            <div className="flex flex-col items-center gap-1" key={key}>
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
