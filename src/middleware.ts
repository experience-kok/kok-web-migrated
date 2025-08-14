import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/mypage'];

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // PROTECTED_ROUTES에 접근하는지 확인
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    console.log('보호된 경로 접근');
    // 보호된 경로에 접근하는 경우
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // TODO: 토큰 유효성 검증 로직
    // 1. accessToken 유효성 확인
    // 2. 만료된 경우 refreshToken으로 재발급
    // 3. refreshToken도 만료된 경우 로그인 페이지로 리다이렉트
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
