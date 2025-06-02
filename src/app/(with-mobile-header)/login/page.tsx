import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

import KakaoLoginButton from './_components/kakao-login-button';
import LoginButton from './_components/login-button';
import SignUpButton from './_components/signup-button';

export default function LoginPage() {
  return (
    <section className="mt-20 flex flex-col items-center gap-6 px-4 md:mx-auto md:max-w-[400px]">
      <Link href="/">
        <Text size="3xl" weight="extrabold">
          체험콕
        </Text>
      </Link>
      <div className="flex w-full flex-col gap-2">
        <Input placeholder="체험콕 회원 아이디" className="h-12" disabled />
        <Input placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)" className="h-12" disabled />
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <LoginButton />
        <div className="flex items-center gap-2">
          <Link href="/">
            <Text size="sm" color="muted-foreground">
              아이디 찾기
            </Text>
          </Link>

          <Text size="sm" color="muted-foreground">
            |
          </Text>
          <Link href="/">
            <Text size="sm" color="muted-foreground">
              비밀번호 찾기
            </Text>
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <KakaoLoginButton />
        <SignUpButton />
      </div>
    </section>
  );
}
