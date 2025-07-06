import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.png';

/**
 * 헤더 네비게이션에 사용되는 서비스 로고
 */
export default function HeaderLogo() {
  return (
    <Link href={'/'}>
      <Image src={logo} alt="체험콕 로고" width={80} height={45} />
    </Link>
  );
}
