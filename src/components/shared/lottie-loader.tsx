'use client';

import React, { useState, useRef, useEffect } from 'react';

import Lottie, { AnimationConfigWithData, AnimationItem, RendererType } from 'lottie-web';

interface LottieLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
}

/**
 * 로티 로더 컴포넌트
 */
export default function LottieLoader({ animationData, ...props }: LottieLoaderProps) {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [, setAnimationInstance] = useState<AnimationItem | null>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const animationOptions: AnimationConfigWithData<RendererType> = {
      container: animationContainer.current,
      renderer: 'svg' as RendererType,
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    const animation = Lottie.loadAnimation(animationOptions);
    setAnimationInstance(animation);

    return () => {
      animation.destroy();
    };
  }, [animationData]);

  return <div ref={animationContainer} {...props} />;
}
