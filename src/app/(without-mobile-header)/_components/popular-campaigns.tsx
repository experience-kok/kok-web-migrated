import CampaignCard from '@/components/shared/campaign-card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Campaign } from '@/models/campaign';

interface Props {
  campaigns: Campaign[];
}

/**
 * 메인 페이지 인기 캠페인 컴포넌트
 */
export default function PopularCampaigns({ campaigns }: Props) {
  return (
    <Carousel
      className="mx-auto w-full"
      opts={{
        align: 'start',
        dragFree: true,
        loop: false,
      }}
    >
      <CarouselContent className="-ml-4">
        {campaigns.map((campaign, index) => (
          <CarouselItem
            key={index}
            className="basis-[38%] pl-4 sm:basis-[22%] md:basis-[22%] lg:basis-[15%]"
          >
            <CampaignCard campaign={campaign} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
