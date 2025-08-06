import { useCallback, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

type ParamValue = string | string[] | undefined;
type ParamsObject = Record<string, ParamValue>;

interface URLParamsReturn {
  params: URLSearchParams;
  updateParams: (params: ParamsObject) => void;
  removeParam: (key: string) => void;
  getParam: (key: string) => string | null;
  setParam: (key: string, value: string | string[]) => void;
}

/**
 * URL 쿼리 파라미터를 관리하는 커스텀 훅
 */
export function useURLParams(): URLParamsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    // searchParams가 비어있어도 새로운 URLSearchParams 인스턴스를 생성
    return new URLSearchParams(searchParams?.toString() || '');
  }, [searchParams]);

  // 여러 파라미터 업데이트
  const updateParams = useCallback(
    (paramsToUpdate: ParamsObject) => {
      // 현재 URL에서 pathname과 search를 분리
      const url = new URL(window.location.href);
      const current = new URLSearchParams(url.search);

      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
          current.delete(key);
        } else if (Array.isArray(value)) {
          current.set(key, value.join(','));
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${url.pathname}${query}`);
    },
    [router],
  );

  // 특정 파라미터 제거
  const removeParam = useCallback(
    (key: string) => {
      const url = new URL(window.location.href);
      const current = new URLSearchParams(url.search);
      current.delete(key);

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${url.pathname}${query}`);
    },
    [router],
  );

  // 파라미터 값 가져오기
  const getParam = useCallback((key: string): string | null => {
    const url = new URL(window.location.href);
    return new URLSearchParams(url.search).get(key);
  }, []);

  // 특정 파라미터만 설정/변경
  const setParam = useCallback(
    (key: string, value: string | string[] | null) => {
      // 현재 URL에서 직접 파라미터를 가져옴
      const url = new URL(window.location.href);
      const current = new URLSearchParams(url.search);

      // 디버깅을 위한 로그
      console.log('setParam called:', { key, value, type: typeof value });
      console.log('Current URL:', url.href);
      console.log('Current params before:', current.toString());

      if (Array.isArray(value)) {
        if (value.length === 0) {
          current.delete(key);
        } else {
          current.set(key, value.join(','));
        }
      } else {
        // null, undefined일 때만 삭제. 빈 문자열('')은 그대로 설정
        if (value === null || value === undefined) {
          current.delete(key);
        } else {
          // 빈 문자열도 포함해서 설정
          current.set(key, String(value));
        }
      }

      console.log('Current params after:', current.toString());

      const search = current.toString();
      const query = search ? `?${search}` : '';
      const newUrl = `${url.pathname}${query}`;

      console.log('Navigating to:', newUrl);

      router.replace(newUrl);
    },
    [router],
  );

  return {
    params,
    updateParams,
    removeParam,
    getParam,
    setParam,
  };
}
