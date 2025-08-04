import { CircleAlert } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <main className="min-h-[100dvh]">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4">
          <CircleAlert width={64} height={64} className="text-primary" />
          <p className="ck-headline-3 text-ck-gray-900 mt-3">지원하지 않는 주소에요</p>
          <p className="ck-body-2-bold text-ck-gray-700 mt-1 text-center">
            아래 버튼을 통해 메인페이지로 이동할 수 있어요.
          </p>
          <Link href="/" passHref>
            <Button className="ck-body-2 mt-3 h-[32px]">메인 페이지로 이동하기</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
