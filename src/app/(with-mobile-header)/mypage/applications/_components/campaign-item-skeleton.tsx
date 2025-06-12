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
      <CardContent className="h-[115px] w-[115px] p-0 md:h-[105px] md:w-[105px] lg:h-[135px] lg:w-[135px]">
        <Skeleton className="h-full w-full rounded-lg" />
      </CardContent>

      {/* 텍스트 스켈레톤 */}
      <CardFooter className="flex-1 flex-col items-start justify-start px-4">
        <Skeleton className="h-4 w-3/4" />
      </CardFooter>
    </Card>
  );
}
