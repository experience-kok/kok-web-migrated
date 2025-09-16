import { Text } from '@/components/ui/text';

const currentYear = new Date().getFullYear(); // 현재 연도 가져오기

/**
 * 푸터 레이아웃 컴포넌트 (최하단 고정)
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 bg-white py-6 pb-15">
      <div className="container px-6 lg:px-16">
        <Text size="xl" weight="bold">
          체험콕
        </Text>
        <div className="text-muted-foreground mt-2 text-xs">
          {/* 회사명 | 대표이사: 이순신 | 개인정보 보호 최고책임자: 삼순신 <br /> */}
          {/* 사업자등록번호: 123-11-12345 | 통신판매업신고번호: 제0000-서울강남-00000호 <br /> */}
          {/* 주소: 서울특별시 OO구 OO로 OOO길 OO (논현동) <br /> */}
          메일:{' '}
          <a
            href="mailto:chkok.official@gmail.com"
            className="text-muted-foreground hover:underline"
          >
            chkok.official@gmail.com
          </a>{' '}
          {/* | 전화: 1234-1234 | 팩스: 02-123-4567 <br /> */}
          <Text size="sm" as="p" color="foreground" className="mt-4" weight="bold">
            &copy; {currentYear} KOK. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
