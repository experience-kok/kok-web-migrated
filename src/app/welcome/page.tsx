'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import Confetti from './_components/confetti';

/**
 * 회원가입 환영 페이지
 */
export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Confetti />
      <div className="flex w-full max-w-lg flex-col gap-4">
        <Text as="h1" weight="bold" size="3xl" className="text-center">
          체험콕에 오신것을 환영해요 👍
        </Text>
        <Text color="muted-foreground" className="text-center">
          프로필을 등록하고 다양한 서비스를 즐겨보세요!
        </Text>
        <div className="flex w-full gap-4">
          <Link href="/" className="flex-1">
            <Button className="h-12 w-full text-lg font-semibold">메인 화면으로</Button>
          </Link>
          <Link href="/mypage" className="flex-1">
            <Button className="h-12 w-full text-lg font-semibold" variant="outline">
              프로필 등록하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
