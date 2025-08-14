import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 인기 캠페인 카드 스켈레톤 컴포넌트
 */
export default function PopularCampaignCardSkeleton() {
  return (
    <Card className="gap-2 border-none py-0 shadow-none">
      <CardContent className="relative overflow-hidden rounded-[12px] p-0">
        <AspectRatio ratio={1 / 1}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </AspectRatio>
        {/* 좋아요 버튼 스켈레톤 */}
        <div className="absolute right-2 bottom-2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-0">
        {/* 캠페인 타입 배지 스켈레톤 */}
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
      </CardFooter>
    </Card>
  );
}
