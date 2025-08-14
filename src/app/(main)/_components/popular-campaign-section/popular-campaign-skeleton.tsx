import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import PopularCampaignCardSkeleton from './popular-campaign-card-skeleton';

/**
 * 인기 캠페인 스켈레톤 컴포넌트
 */
export default function PopularCampaignSkeleton() {
  return (
    <Carousel
      className="mx-auto mt-2 w-full"
      opts={{
        align: 'start',
        dragFree: true,
        loop: false,
      }}
    >
      <CarouselContent className="-ml-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[38%] pl-4">
            <PopularCampaignCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
