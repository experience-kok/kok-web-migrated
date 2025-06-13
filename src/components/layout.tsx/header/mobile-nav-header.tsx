'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/ui/text';

import { routeMenu } from '@/constants/menu';

/**
 * 모바일 환경 메인페이지를 제외한 헤더
 */
export default function MobileNavHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 pathname과 일치하는 메뉴 타이틀 찾기
  const currentMenu = routeMenu.find(menu => menu.url === pathname);
  const title = currentMenu?.title ?? '페이지';

  return (
    <header className="sticky top-0 z-10 mx-auto flex h-16 w-full max-w-[720px] items-center border-b border-gray-200 bg-white px-6 md:hidden">
      <button
        className="absolute left-6 cursor-pointer"
        onClick={() => router.back()}
        aria-label="뒤로가기"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="w-full text-center">
        <Text size="2xl" weight="bold">
          {title}
        </Text>
      </div>
    </header>
  );
}
