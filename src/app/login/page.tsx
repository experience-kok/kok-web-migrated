import Link from 'next/link';

import { Text } from '@/components/ui/text';

import KakaoLoginButton from './_components/kakao-login-button';
import LoginForm from './_components/login-form';
// import SignUpButton from './_components/signup-button';

/**
 * 로그인 페이지
 */
export default async function LoginPage() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 pt-20 md:mx-auto md:max-w-[400px]">
      <Link href="/">
        <Text size="3xl" weight="extrabold">
          체험콕
        </Text>
      </Link>

      <div className="flex w-full flex-col items-center gap-2">
        <LoginForm />
        {/* <div className="flex items-center gap-2">
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
        </div> */}
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <KakaoLoginButton />
        {/* <SignUpButton /> */}
      </div>
    </section>
  );
}
