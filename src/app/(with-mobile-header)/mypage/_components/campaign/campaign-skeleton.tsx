'use client';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * 스켈레톤 UI 컴포넌트
 */
export default function CampaignSkeleton() {
  return (
    <div className="grid grid-cols-4 divide-x">
      {new Array(4).fill(0).map((_, index) => (
        <div className="flex flex-col items-center gap-1" key={index}>
          <Skeleton className="h-7 w-8" />
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  );
}
