import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

import RankingCampaignCardSkeleton from './ranking-campaign-card-skeleton';

/**
 * RankingCampaign 컴포넌트의 스켈레톤
 */
export default function RankingCampaignSkeleton() {
  return (
    <div className="px-4">
      {/* 카테고리 탭 스켈레톤 */}
      <div className="scrollbar-hide mb-4 flex space-x-4 overflow-x-auto whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-16 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* 캐러샐 스켈레톤 */}
      <Carousel className="mx-auto w-full">
        <CarouselContent className="-ml-4">
          {/* 첫 번째 카테고리 페이지 스켈레톤 */}
          <CarouselItem className="pl-4">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, rankIndex) => (
                <RankingCampaignCardSkeleton key={rankIndex} />
              ))}
            </div>
          </CarouselItem>

          {/* 두 번째 카테고리 페이지 스켈레톤 (선택사항) */}
          <CarouselItem className="pl-4">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, rankIndex) => (
                <RankingCampaignCardSkeleton key={rankIndex} />
              ))}
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
