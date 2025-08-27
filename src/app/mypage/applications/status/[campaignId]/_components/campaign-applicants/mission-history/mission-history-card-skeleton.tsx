import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 미션 이력 카드 스켈레톤
 */
export default function MissionHistoryCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* URL 텍스트 스켈레톤 */}
          <div className="max-w-[150px]">
            <Skeleton className="h-4 w-32" />
          </div>

          {/* 상태 배지 스켈레톤 */}
          <div>
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
/**
 * 미션 이력 목록 스켈레톤 (여러 개 카드)
 */
export function MissionHistoryListSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-4">
        {/* 카운트 텍스트 스켈레톤 */}
        <Skeleton className="h-4 w-20" />
      </div>

      {/* 스크롤 컨테이너 */}
      <div className="bg-ck-gray-100 h-96 overflow-y-auto rounded-[12px] border p-4">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <MissionHistoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
