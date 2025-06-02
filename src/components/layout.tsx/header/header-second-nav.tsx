'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { subMenu } from '@/constants/menu';

import HamburgerButton from './hamburger-button';

/**
 * 헤더 하단 네비게이션 컴포넌트
 */
export default function HeaderSecondNav() {
  const path = usePathname();

  return (
    <div className="sticky top-0 z-10 flex h-11 w-full items-center border-b-[1px] border-gray-200 bg-white md:h-14 md:px-6 lg:px-16">
      <HamburgerButton />
      <ul className="scrollbar-hide flex h-full space-x-4 overflow-x-auto whitespace-nowrap md:ml-4">
        {subMenu.map((menu, index) => (
          <li
            key={index}
            className={`md:text-md flex items-center justify-center border-b-2 font-semibold md:px-1 ${
              path === menu.url
                ? 'border-primary font-bold'
                : 'text-muted-foreground border-transparent'
            } ${index === 0 ? 'ml-6 md:ml-0' : ''} ${index === subMenu.length - 1 ? 'mr-4 md:mr-0' : ''}`}
          >
            <Link href={menu.url} className="hover:text-primary">
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
