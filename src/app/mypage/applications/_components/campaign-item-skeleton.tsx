import { Skeleton } from '@/components/ui/skeleton';

/**
 * 캠페인 아이템 스켈레톤 컴포넌트
 */
export default function CampaignItemSkeleton() {
  return (
    <div className="flex flex-row rounded-lg bg-white">
      {/* 이미지 스켈레톤 - 75x75 정사각형 */}
      <Skeleton className="h-[75px] w-[75px] flex-shrink-0 rounded-lg" />

      {/* 컨텐츠 스켈레톤 */}
      <div className="flex flex-1 flex-col items-start px-2">
        {/* 배지 영역 */}
        <div className="mb-2 flex w-full items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* 제목 */}
        <Skeleton className="mb-2 h-5 w-3/4 rounded" />

        {/* 상품 정보 */}
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}
