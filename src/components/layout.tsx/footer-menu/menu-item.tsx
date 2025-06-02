'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Text } from '@/components/ui/text';

interface Props {
  icon: React.ReactNode;
  title: string;
  url: string;
}

/**
 * 푸터 메뉴에 사용될 메뉴 아이템 컴포넌트
 */
export default function MenuItem({ icon, title, url }: Props) {
  const path = usePathname();

  return (
    <li className="w-1/5 flex-1">
      <Link
        href={url}
        className={`flex flex-col items-center ${path === url ? 'text-primary fill-amber-600' : ''}`}
      >
        {icon}
        <Text size="xs" color={path === url ? 'primary' : 'muted-foreground'}>
          {title}
        </Text>
      </Link>
    </li>
  );
}
