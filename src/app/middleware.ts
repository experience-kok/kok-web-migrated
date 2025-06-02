export function middleware() {}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], // 정적 파일 제외
};
