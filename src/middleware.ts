import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/mypage'];

const ONLY_CLIENT_ROUTES = ['/mypage/applications/status'];

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // PROTECTED_ROUTES에 접근하는지 확인
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // 보호된 경로에 접근하는 경우
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // ONLY_CLIENT_ROUTES 체크 (하위 경로 포함)
    const isOnlyClientRoute = ONLY_CLIENT_ROUTES.some(route => pathname.startsWith(route));

    if (isOnlyClientRoute) {
      console.log(accessToken);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_KOK_BASE_URL}/auth/check-client`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          console.log('클라이언트 인증 API 호출 실패:', response.status);
          return NextResponse.redirect(new URL('/not-found', request.url));
        }
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/not-found', request.url));
      }
    }
  } else {
    // 보호되지 않은 경로에 접근하는 경우
    // 추가 처리가 필요한 경우 여기에 코드 작성
  }

  // 모든 검증을 통과한 경우 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], // 정적 파일 제외
};
