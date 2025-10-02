'use client';

import { useEffect, useRef } from 'react';

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
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;

    const handleCallback = async () => {
      hasProcessed.current = true;

      const code = searchParams.get('code');
      const provider = window.location.pathname.split('/').pop();

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

        if (response.loginType === 'consentRequired') {
          // 신규 유저: 동의 페이지로 리디렉션
          const { tempToken } = response;
          router.push(`/login/consent?tempToken=${tempToken}`);
        } else {
          // 기존 유저: 로그인 처리
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
        }
      } catch (error) {
        hasProcessed.current = false;
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
