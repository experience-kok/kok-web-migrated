import Link from 'next/link';

import { Button } from '@/components/ui/button';

/**
 * 로그인 버튼
 */
export default function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="outline">로그인</Button>
    </Link>
  );
}
