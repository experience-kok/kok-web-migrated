import Link from 'next/link';

import { Text } from '@/components/ui/text';

const currentYear = new Date().getFullYear(); // 현재 연도 가져오기

/**
 * 푸터 레이아웃 컴포넌트 (최하단 고정)
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 bg-white py-5 pb-15">
      <div className="container px-5">
        <Text size="xl" weight="bold">
          체험콕
        </Text>
        <div className="text-muted-foreground mt-2 text-xs">
          문의:{' '}
          <a
            href="mailto:chkok.official@gmail.com"
            className="text-muted-foreground hover:underline"
          >
            chkok.official@gmail.com
          </a>{' '}
          <div className="flex items-start gap-2">
            <Link
              href={'https://www.notion.so/chkok/24daaf9264b2808c88f6e0486e6ea5f0?source=copy_link'}
            >
              이용약관
            </Link>
            <Link href={'https://chkok.notion.site/256aaf9264b280aeae76e1b3af19be50'}>
              이용약관(기업)
            </Link>
            <Link href={'https://www.notion.so/chkok/24daaf9264b2804584e0deb6f3828c4f'}>
              개인정보처리방침
            </Link>
          </div>
          {/* | 전화: 1234-1234 | 팩스: 02-123-4567 <br /> */}
          <Text size="sm" as="p" color="foreground" className="mt-4" weight="bold">
            &copy; {currentYear} KOK. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
