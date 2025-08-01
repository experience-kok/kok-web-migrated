import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * MainBanner 컴포넌트의 스켈레톤
 */

export default function MainBannerSkeleton() {
  return (
    <div className="relative w-full opacity-100 transition-opacity duration-300">
      <Carousel
        className="mx-auto w-full"
        opts={{
          loop: true,
          align: 'center',
          skipSnaps: false,
          dragFree: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[85%] pl-2 md:basis-[60%] md:pl-4 lg:basis-[45%]"
            >
              <AspectRatio ratio={16 / 9} className="rounded-[12px]">
                <Skeleton className="h-full w-full rounded-[12px]" />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
