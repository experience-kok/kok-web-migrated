import { useCallback, useRef } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  threshold = 0,
  rootMargin = '0px',
}: UseIntersectionObserverProps) {
  const observer = useRef<IntersectionObserver>(null);

  const elementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;

      // 기존 observer 정리
      if (observer.current) {
        observer.current.disconnect();
      }

      // 새 observer 생성
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        {
          threshold,
          rootMargin,
        },
      );

      // 요소가 존재하면 관찰 시작
      if (node) {
        observer.current.observe(node);
      }
    },
    [onIntersect, enabled, threshold, rootMargin],
  );

  // cleanup을 위한 disconnect 함수
  const disconnect = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);

  return { elementRef, disconnect };
}
