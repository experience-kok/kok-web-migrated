import { useCallback } from 'react';

import { useIntersectionObserver } from './use-intersection-observer';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  onLoadMore,
  hasNextPage = false,
  isLoading = false,
  isFetchingNextPage = false,
  threshold = 0,
  rootMargin = '100px', // 100px 미리 로드
}: UseInfiniteScrollProps) {
  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [hasNextPage, isLoading, isFetchingNextPage, onLoadMore]);

  const { elementRef, disconnect } = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: hasNextPage && !isLoading && !isFetchingNextPage,
    threshold,
    rootMargin,
  });

  return { lastElementRef: elementRef, disconnect };
}
