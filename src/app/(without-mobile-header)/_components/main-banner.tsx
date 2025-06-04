'use client';

import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Banner } from '@/models/banner';

import Autoplay from 'embla-carousel-autoplay';

interface Props {
  banners: Banner[];
}

/**
 * 메인 페이지 배너 컴포넌트 (반응형)
 */
export default function MainBanner({ banners }: Props) {
  return (
    <Carousel
      className="mx-auto w-full"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="-ml-4">
        {banners.map((banner, index) => (
          <CarouselItem key={index} className="pl-0 md:basis-1/3 md:pl-4">
            <AspectRatio ratio={16 / 9} className="md:rounded-lg">
              <Image
                src={banner.bannerUrl}
                alt={`Banner Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover md:rounded-lg"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
