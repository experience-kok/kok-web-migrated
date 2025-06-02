import Link from 'next/link';

/**
 * 헤더 네비게이션에 사용되는 서비스 로고
 */
export default function HeaderLogo() {
  return (
    <Link href={'/'}>
      <span className="text-2xl font-extrabold">체험콕</span>
    </Link>
  );
}
