import { Skeleton } from '@/components/ui/skeleton';

/**
 * 캠페인 진행 상태 바 스켈레톤 컴포넌트
 */
export default function CampaignProgressSkeleton() {
  // 진행 단계 수 (원본 컴포넌트와 동일하게 4개)
  const stepCount = 5;

  return (
    <div className="w-full px-5 py-8">
      {/* 진행 바 컨테이너 */}
      <div className="relative">
        {/* 배경 연결선 스켈레톤 */}
        <Skeleton className="bg-ck-gray-300 h-2 w-full" />

        {/* 진행 점들 스켈레톤 */}
        <div className="absolute -top-1 right-0 left-0 grid grid-cols-5">
          {Array.from({ length: stepCount }, (_, index) => (
            <div key={index} className="flex flex-col items-center justify-self-center">
              {/* 원형 점 스켈레톤 */}
              <Skeleton className="h-4 w-4 rounded-full" />

              {/* 레이블 텍스트 스켈레톤 */}
              <div className="mt-4 text-center">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 현재 상태 설명 스켈레톤 */}
      <div className="mt-11 text-center">
        <div className="bg-ck-gray-100 rounded-[12px] px-4 py-3">
          <Skeleton className="mx-auto mt-2 h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
