'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import BackIcon from 'public/icons/back.svg';

interface Props {
  title: string;
}

export default function NavigationHeader({ title }: Props) {
  const router = useRouter();

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-gray-200 px-4 md:hidden">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
        <BackIcon width={24} height={24} />
      </Button>
      <Text weight="semibold">{title}</Text>
      <div className="w-8" /> {/* 오른쪽 정렬을 위한 빈 공간 */}
    </header>
  );
}
