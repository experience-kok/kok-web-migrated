'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/hooks/use-auth';

/**
 * 클라이언트 계정 전환 버튼 컴포넌트
 */
export default function ClientRegistryButton() {
  const { user } = useAuth();

  // user가 null이거나 undefined인 경우 early return
  if (!user) {
    return null;
  }

  const isUser = user.role === 'USER';

  return (
    <>
      {isUser && (
        <Link href={'/client/register'}>
          <div className="flex w-full items-center justify-between py-5">
            <span className="ck-body-2 font-semibold">클라이언트 계정으로 전환하기</span>
            <ChevronRight width={16} height={16} className="text-muted-foreground" />
          </div>
        </Link>
      )}
    </>
  );
}
