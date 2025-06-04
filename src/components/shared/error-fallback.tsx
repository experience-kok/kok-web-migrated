'use client';

import type { ErrorBoundaryFallbackProps } from '@suspensive/react';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

/**
 * 에러 발생 시 렌더링되는 Fallback 컴포넌트
 * - 사용자는 에러 메시지를 확인하고 다시 시도할 수 있음
 * - Suspensive ErrorBoundary와 함께 사용됨
 */
export default function ErrorFallback({ error, reset }: ErrorBoundaryFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <Text as="h2" size="2xl" weight="bold" className="mb-2">
        문제가 발생했어요
      </Text>
      <Text className="text-muted-foreground mb-4 text-sm">
        {error?.message ?? '예상치 못한 에러가 발생했습니다.'}
      </Text>
      <Button onClick={reset}>다시 시도하기</Button>
    </div>
  );
}
