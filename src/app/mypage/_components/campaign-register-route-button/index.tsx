'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import SplitBox from '@/components/ui/split-box';

import { useAuth } from '@/hooks/use-auth';

/**
 * 캠페인 생성 페이지로 이동하는 버튼 컴포넌트
 */
export default function CampaignRegisterRouteButton() {
  const { user } = useAuth();

  // user가 null이거나 undefined인 경우 early return
  if (!user) {
    return null;
  }

  const isClient = user.role === 'CLIENT';

  return (
    <>
      {isClient && (
        <>
          <SplitBox />
          <section className="px-4">
            <Link href={'/mypage/campaign/register'}>
              <div className="flex w-full items-center justify-between py-5">
                <span className="ck-body-2 font-semibold">캠페인 생성하기</span>
                <ChevronRight width={16} height={16} className="text-muted-foreground" />
              </div>
            </Link>
          </section>
        </>
      )}
    </>
  );
}
