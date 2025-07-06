import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * RankingCampaignCard 컴포넌트의 스켈레톤
 */
export default function RankingCampaignCardSkeleton() {
  return (
    <Card className="flex-row border-none py-0 shadow-none">
      {/* 이미지 영역 스켈레톤 */}
      <div className="relative h-[115px] w-[115px] overflow-hidden rounded-lg md:h-[105px] md:w-[105px] lg:h-[135px] lg:w-[135px]">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      {/* 콘텐츠 영역 스켈레톤 */}
      <div className="flex flex-1 flex-col items-start px-4">
        {/* 배지 영역 스켈레톤 */}
        <div className="mb-2 flex w-full items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* 제목 스켈레톤 (2줄) */}
        <div className="mb-2 w-full space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 상품 정보 스켈레톤 */}
        <Skeleton className="mb-2 h-3 w-2/3" />

        {/* 지원자 수 스켈레톤 */}
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  );
}
