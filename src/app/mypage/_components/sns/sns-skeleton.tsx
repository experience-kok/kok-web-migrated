import { Skeleton } from '@/components/ui/skeleton';

/**
 * SNS 카드 스켈레톤
 */
function SnsCardSkeleton() {
  return (
    <div className="flex h-40 w-full flex-1 items-center justify-between rounded-[12px] border-[1px] border-dashed border-gray-300 bg-white px-4 py-3">
      <div className="flex flex-col gap-1">
        {/* 제목 스켈레톤 */}
        <Skeleton className="h-5 w-32" />
      </div>

      {/* 버튼 스켈레톤 */}
      <Skeleton className="h-9 w-9 rounded-md" />
    </div>
  );
}

/**
 * SNS 목록 스켈레톤 (4개)
 */
export default function SnsSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <SnsCardSkeleton key={index} />
      ))}
    </div>
  );
}
