import { CircleAlert } from 'lucide-react';
import Link from 'next/link';

import HeaderLogo from '@/components/layout.tsx/header/header-logo';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function NotFound() {
  return (
    <>
      <header className="flex h-14 w-full bg-white md:h-16">
        <div className="h-full w-full px-6 lg:px-16">
          <div className="flex h-full w-full items-center">
            <HeaderLogo />
          </div>
        </div>
      </header>
      <main>
        <div
          className="flex flex-col items-center justify-center"
          style={{ minHeight: 'calc(100vh - 4rem)' }} // 4rem = md:h-16
        >
          <CircleAlert width={64} height={64} className="text-primary" />
          <Text size="2xl" weight="bold" className="mt-4">
            지원하지 않는 주소에요
          </Text>
          <Text color="muted-foreground" weight="bold" className="mt-2">
            아래 버튼을 통해 메인페이지로 이동해요.
          </Text>
          <Link href="/" passHref>
            <Button className="mt-4">메인 페이지로 이동</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
