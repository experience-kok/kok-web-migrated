'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  icon: React.ReactNode;
  url: string;
  ariaLabel: string;
}

/**
 * 푸터 메뉴에 사용될 메뉴 아이템 컴포넌트
 */
export default function MenuItem({ icon, url, ariaLabel }: Props) {
  const path = usePathname();

  return (
    <li className="w-1/5 flex-1">
      <Link
        href={url}
        className={`flex flex-col items-center ${path === url ? 'text-primary' : ''}`}
        aria-label={ariaLabel}
      >
        {icon}
        {/* <Text size="xs" color={path === url ? 'primary' : 'muted-foreground'}>
          {title}
        </Text> */}
      </Link>
    </li>
  );
}
