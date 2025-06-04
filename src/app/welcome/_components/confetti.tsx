'use client';

import { useEffect } from 'react';

import confetti from 'canvas-confetti';

export default function Confetti() {
  useEffect(() => {
    const duration = 0.1 * 1000;
    const end = Date.now() + duration;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
      // 왼쪽에서 발사
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      // 오른쪽에서 발사
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      // 시간이 남아있으면 계속 실행
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // 초기 폭죽
    const initialBurst = () => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.7 },
        colors,
        startVelocity: 45,
      });
    };

    initialBurst();

    // cleanup
    return () => {
      confetti.reset();
    };
  }, []);

  return null;
}
