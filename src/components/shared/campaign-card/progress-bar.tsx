'use client';

import { useMemo } from 'react';

import { Text } from '@/components/ui/text';

interface Props {
  currentApplicants: number; // 현재 지원 인원
  maxApplicants: number; // 총 지원 가능 인원
}

/**
 * 캠페인 카드 지원 인원에 따라 채워지는 바 컴포넌트
 */
export default function ProgressBar({ currentApplicants, maxApplicants }: Props) {
  // 진행률 계산 (0-100%)
  const progress = useMemo(
    () => Math.min((currentApplicants / maxApplicants) * 100, 100),
    [currentApplicants, maxApplicants],
  );

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          {/* 지원 인원 텍스트 */}
          <Text size="sm" color="foreground">
            지원 {currentApplicants} / &nbsp;
          </Text>
          <Text size="sm" color="muted-foreground">
            {maxApplicants}명
          </Text>
        </div>
        <Text size="sm" color="muted-foreground">
          {progress}%
        </Text>
      </div>

      {/* 프로그레스 바 */}
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-green-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
