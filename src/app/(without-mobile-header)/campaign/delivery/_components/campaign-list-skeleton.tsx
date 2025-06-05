import CampaignCardSkeleton from '@/components/shared/campaign-card/campaign-card-skeleton';

interface Props {
  count?: number;
}

/**
 * 캠페인 리스트 스켈레톤 컴포넌트
 */
export default function CampaignListSkeleton({ count = 12 }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:px-16">
      {Array.from({ length: count }, (_, index) => (
        <CampaignCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
