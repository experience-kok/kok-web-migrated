z'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import LoadingLottie from '@/assets/lotties/loading.json';
import { setTokens } from '@/lib/cookie-utils';
import { postKakaoLogin } from '@/service/auth/auth-api';

import { userAtom } from '@/stores/user.atom';

const LottieLoader = dynamic(() => import('@/components/shared/lottie-loader'), {
  ssr: false,
});

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code'); // redirect uri에서 코드 추출
      const provider = window.location.pathname.split('/').pop(); // 'kakao' 추출

      // 코드 또는 oauth 제공자가 없을 경우 로그인 페이지로 이동
      if (!code || !provider) {
        toast.error('로그인 정보를 찾을 수 없어요.', {
          position: 'top-center',
          duration: 3000,
        });
        router.push('/login');
        return;
      }

      try {
        const redirectUri = `${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}/kakao`;

        const response = await postKakaoLogin({
          authorizationCode: code,
          redirectUri,
        });

        const { loginType, user, accessToken, refreshToken } = response;

        setTokens(accessToken, refreshToken);
        setUser(user);

        if (loginType === 'login') {
          router.push('/');

          setTimeout(() => {
            toast.success(`${user.nickname}님, 환영해요!`, {
              position: 'top-center',
              duration: 3000,
            });
          }, 1000);
        }
        // 회원가입시 환영 페이지로 이동
        else if (loginType === 'registration') {
          router.push('/welcome');
        }
      } catch (error) {
        console.error('로그인 에러: ', error);
        toast.error(error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.', {
          position: 'top-center',
          duration: 3000,
        });
        router.push('/login');
      }
    };

    handleCallback();
  }, [router, searchParams, setUser]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <LottieLoader animationData={LoadingLottie} className="h-48 w-48 md:h-60 md:w-60" />
        <h1 className="text-center text-2xl font-bold">로그인을 처리 중이에요...</h1>
        <p className="mt-2 text-center text-gray-600">잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
