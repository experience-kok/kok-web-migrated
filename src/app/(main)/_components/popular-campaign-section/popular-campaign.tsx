import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Campaign } from '@/models/campaign';

import PopularCampaignCard from './popular-campaign-card';

interface Props {
  campaigns: Campaign[];
}

/**
 * 메인 페이지 인기 캠페인 컴포넌트
 */
export default function PopularCampaign({ campaigns }: Props) {
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
        {campaigns.map((campaign, index) => (
          <CarouselItem key={index} className="basis-[38%] pl-4">
            <PopularCampaignCard campaign={campaign} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
