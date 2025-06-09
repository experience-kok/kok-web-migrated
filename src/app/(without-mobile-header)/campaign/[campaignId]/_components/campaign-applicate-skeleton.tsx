import { Skeleton } from '@/components/ui/skeleton';

/**
 * 캠페인 신청 컴포넌트 스켈레톤 UI
 */
export default function CampaignApplicateSkeleton() {
  return (
    <div>
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
