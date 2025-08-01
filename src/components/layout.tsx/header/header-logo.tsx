import Link from 'next/link';

/**
 * 헤더 네비게이션에 사용되는 서비스 로고
 */
export default function HeaderLogo() {
  return (
    <Link href={'/'} className="ck-title text-ck-gray-500">
      KOK
    </Link>
  );
}
