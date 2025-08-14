import { ReactNode } from 'react';

import { cookies } from 'next/headers';

interface Props {
  children: ReactNode;
  applicate: ReactNode; // parallel route slot
}

export default async function CampaignDetailLayout({ children, applicate }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value; // 또는 다른 토큰 쿠키명

  const isAuthenticated = !!token;

  return (
    <div>
      {children}

      {/* 로그인한 사용자만 applicate 슬롯 렌더링 */}
      {isAuthenticated && applicate}
    </div>
  );
}
