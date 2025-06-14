'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 지원 목록 캠페인 아이템 스켈레톤
 */
export default function CampaignItemSkeleton() {
  return (
    <Card className="flex-row gap-2 border-none py-0 shadow-none">
      {/* 이미지 스켈레톤 */}
      <CardContent className="relative h-[115px] w-[115px] overflow-hidden rounded-lg p-0 md:h-[105px] md:w-[105px] lg:h-[135px] lg:w-[135px]">
        <Skeleton className="h-full w-full rounded-lg" />
      </CardContent>

      {/* 텍스트 스켈레톤 */}
      <CardFooter className="flex-1 cursor-pointer flex-col items-start justify-start gap-2 px-4">
        {/* 캠페인 타입 배지 스켈레톤 */}
        <Skeleton className="h-5 w-16 rounded-full" />

        {/* 제목과 상품 정보 스켈레톤 */}
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardFooter>
    </Card>
  );
}
