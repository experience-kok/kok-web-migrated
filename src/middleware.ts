import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/mypage'];
const ONLY_CLIENT_ROUTES = ['/mypage/applications/status'];

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // PROTECTED_ROUTES에 접근하는지 확인
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // ONLY_CLIENT_ROUTES 체크
    const isOnlyClientRoute = ONLY_CLIENT_ROUTES.some(route => pathname.startsWith(route));

    if (isOnlyClientRoute) {
      try {
        const baseURL = process.env.NEXT_PUBLIC_KOK_BASE_URL || 'https://chkok.kr/api';
        const response = await fetch(`${baseURL}/auth/check-client`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          return NextResponse.redirect(new URL('/not-found', request.url));
        }

        // 응답 내용 검증 (옵션)
        const result = await response.json();
        if (result.success === false) {
          return NextResponse.redirect(new URL('/not-found', request.url));
        }
      } catch (error) {
        console.error('클라이언트 인증 API 호출 중 오류:', error);
        return NextResponse.redirect(new URL('/not-found', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api/).*)'], // API 라우트도 제외
};
