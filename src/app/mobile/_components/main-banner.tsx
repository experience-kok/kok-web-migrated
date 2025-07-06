'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Banner } from '@/models/banner';

import Autoplay from 'embla-carousel-autoplay';

interface Props {
  banners: Banner[];
}

/**
 * 메인 페이지 배너 컴포넌트 (반응형)
 */
export default function MainBanner({ banners }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(banners.length);

  useEffect(() => {
    if (!api) {
      return;
    }

    // 초기 값 설정
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    // 슬라이드 변경 이벤트 리스너 추가
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', handleSelect);

    // 클린업 함수
    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        className="mx-auto w-full"
        opts={{ loop: true }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="pl-0 md:basis-1/2 md:pl-4 lg:basis-1/3">
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
      <div className="chkok-caption absolute right-2 bottom-2 rounded-md bg-black/50 px-2 py-1 text-white backdrop-blur-sm">
        {current} / {count}
      </div>
    </div>
  );
}
