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
    return new URLSearchParams(Array.from(searchParams.entries()));
  }, [searchParams]);

  // 여러 파라미터 업데이트
  const updateParams = useCallback(
    (paramsToUpdate: ParamsObject) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

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

      router.push(`${window.location.pathname}${query}`);
    },
    [searchParams, router],
  );

  // 특정 파라미터 제거
  const removeParam = useCallback(
    (key: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete(key);

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${window.location.pathname}${query}`);
    },
    [searchParams, router],
  );

  // 파라미터 값 가져오기
  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  // 특정 파라미터만 설정/변경
  const setParam = useCallback(
    (key: string, value: string | string[]) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (Array.isArray(value)) {
        if (value.length === 0) {
          current.delete(key);
        } else {
          current.set(key, value.join(','));
        }
      } else {
        if (value === '' || value === undefined) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${window.location.pathname}${query}`);
    },
    [searchParams, router],
  );

  return {
    params,
    updateParams,
    removeParam,
    getParam,
    setParam,
  };
}
