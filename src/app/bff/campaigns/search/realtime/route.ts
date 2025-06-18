import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

let lastResetDate: string | null = null;

// 실시간 인기 검색어 조회
export async function GET() {
  // 1. 지금 요청이 들어온 시간이 오후 12시가 지났는지 확인
  const now = new Date();
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const currentHour = kstNow.getHours();
  const today = kstNow.toDateString();

  // 2. 오후 12시가 지났고 오늘 아직 캐시 무효화 안했다면 실행
  if (currentHour >= 12 && lastResetDate !== today) {
    revalidateTag('search-realtime');
    lastResetDate = today;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_KOK_BASE_URL}/campaigns/search/realtime?limit=5`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        // 30분 마다 초기화
        revalidate: 60 * 30,
        tags: ['search-realtime'],
      },
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
