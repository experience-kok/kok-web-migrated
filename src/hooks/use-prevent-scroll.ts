import { useEffect, useCallback } from 'react';

interface UsePreventScrollOptions {
  /** 스크롤 방지 활성화 여부 */
  enabled?: boolean;
  /** body 요소의 overflow를 hidden으로 설정할지 여부 */
  hideOverflow?: boolean;
  /** 터치 이벤트도 방지할지 여부 (모바일) */
  preventTouch?: boolean;
}

/**
 * 스크롤 방지 커스텀훅
 */
export function usePreventScroll(options: UsePreventScrollOptions) {
  const { enabled = true, hideOverflow = true, preventTouch = true } = options;

  // 스크롤 이벤트 방지 함수
  const preventDefault = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  // 터치 이벤트 방지 함수 (모바일 스크롤 방지)
  const preventTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  // 키보드 스크롤 방지 함수 (방향키, 스페이스바 등)
  const preventKeyboardScroll = useCallback((e: KeyboardEvent) => {
    const scrollKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      'Space',
    ];

    if (scrollKeys.includes(e.code)) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const body = document.body;
    let originalOverflow: string;
    let originalPaddingRight: string;

    // body overflow 숨기기 (스크롤바 깜빡임 방지를 위한 패딩 조정)
    if (hideOverflow) {
      originalOverflow = body.style.overflow;
      originalPaddingRight = body.style.paddingRight;

      // 스크롤바 너비 계산
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 이벤트 리스너 등록
    const eventOptions: AddEventListenerOptions = { passive: false };

    // 휠 이벤트 방지
    document.addEventListener('wheel', preventDefault, eventOptions);

    // 터치 이벤트 방지 (모바일)
    if (preventTouch) {
      document.addEventListener('touchmove', preventTouchMove, eventOptions);
    }

    // 키보드 스크롤 방지
    document.addEventListener('keydown', preventKeyboardScroll, eventOptions);

    // 정리 함수
    return () => {
      // body 스타일 복원
      if (hideOverflow) {
        body.style.overflow = originalOverflow;
        body.style.paddingRight = originalPaddingRight;
      }

      // 이벤트 리스너 제거
      document.removeEventListener('wheel', preventDefault);

      if (preventTouch) {
        document.removeEventListener('touchmove', preventTouchMove);
      }

      document.removeEventListener('keydown', preventKeyboardScroll);
    };
  }, [
    enabled,
    hideOverflow,
    preventTouch,
    preventDefault,
    preventTouchMove,
    preventKeyboardScroll,
  ]);

  // 수동으로 스크롤 방지를 제어할 수 있는 함수들 반환
  const enableScroll = useCallback(() => {
    const body = document.body;
    body.style.overflow = '';
    body.style.paddingRight = '';
  }, []);

  const disableScroll = useCallback(() => {
    const body = document.body;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  return {
    enableScroll,
    disableScroll,
  };
}
