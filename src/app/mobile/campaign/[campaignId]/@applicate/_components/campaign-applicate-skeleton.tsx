import { Skeleton } from '@/components/ui/skeleton';

/**
 * 캠페인 지원 컴포넌트 스켈레톤 UI
 */
export default function CampaignApplicateSkeleton() {
  return (
    <div>
      <div className="fixed right-0 bottom-0 left-0 z-50 bg-white shadow-lg">
        <div className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <Skeleton className="h-[53px] w-full rounded-[12px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
