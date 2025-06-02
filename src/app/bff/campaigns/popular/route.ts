import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출 및 유효성 검사
    const queryParams = new URLSearchParams();
    queryParams.append('page', searchParams.get('page') || '0');
    queryParams.append('size', searchParams.get('size') || '10');
    queryParams.append('includePaging', searchParams.get('includePaging') || 'true');

    const categoryType = searchParams.get('categoryType');
    const campaignType = searchParams.get('campaignType');

    if (categoryType) queryParams.append('categoryType', categoryType);
    if (campaignType) queryParams.append('campaignType', campaignType);

    // KOK API 기본 URL 가져오기
    const baseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL || 'https://ckok.kr/api';
    const requestUrl = `${baseUrl}/campaigns/popular?${queryParams.toString()}`;

    // KOK API로 요청 전달
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // 백엔드에서 받은 상태 코드 전달
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: unknown) {
    console.error('Error in popular campaigns API:', error);

    return NextResponse.json(
      {
        errorCode: 'INTERNAL_SERVER_ERROR',
        status: 500,
        message: 'An unexpected error occurred',
        success: false,
      },
      { status: 500 },
    );
  }
}
