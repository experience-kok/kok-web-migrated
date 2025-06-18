import { NextResponse } from 'next/server';

// 실시간 인기 검색어 조회
export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_KOK_BASE_URL}/campaigns/search/realtime?limit=5`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        // 30분 마다 초기화
        revalidate: 1000 * 60 * 30,
        tags: ['search-realtime'],
      },
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
