'use client';

import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';

/**
 * 메인 페이지 배너 컴포넌트 (반응형)
 */
export default function MainBanner() {
  const images = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', // Unsplash 이미지
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ];

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
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-0 md:basis-1/3 md:pl-4">
            <AspectRatio ratio={16 / 9} className="md:rounded-lg">
              <Image
                src={image}
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
