'use client';

import KakaoIcon from '@/assets/icons/kakao.svg';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const callbackBaseUrl =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://ckok.kr';
    window.location.href = `https://ckok.kr/api/auth/login-redirect?redirectUri=${callbackBaseUrl}/login/oauth2/code/kakao`;
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      className="h-12 w-full rounded-lg bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
      style={{ color: 'rgba(0, 0, 0, 0.85)' }}
    >
      <KakaoIcon width={24} height={24} fill="#000" />
      <Text weight="semibold">카카오로 로그인</Text>
    </Button>
  );
}
