'use client';

import { useEffect, useState, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Banner } from '@/models/banner';

import Autoplay from 'embla-carousel-autoplay';

interface Props {
  banners: Banner[];
}

/**
 * 메인 페이지 배너 컴포넌트 (반응형)
 * !TODO banner의 개수가 0개일 경우도 예외처리가 필요할까?
 */
export default function MainBanner({ banners }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const autoplayRef = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    // 캐러셀이 마지막에서 처음으로 넘어갈 때 부드럽게 처리
    const handleSelect = () => {};

    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  // 배너가 없을 경우 처리
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Carousel
        className="mx-auto w-full"
        opts={{
          loop: true,
          align: 'center',
          skipSnaps: false,
          dragFree: false,
        }}
        setApi={setApi}
        plugins={[autoplayRef.current]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="basis-[85%] pl-2">
              <Link href={banner.redirectUrl} key={banner.id}>
                <AspectRatio ratio={16 / 9} className="rounded-[12px]">
                  <Image
                    src={banner.bannerUrl}
                    alt={`Banner Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 45vw"
                    className="rounded-[12px] object-cover"
                    priority={index === 0} // 첫 번째 이미지는 우선 로드
                  />
                </AspectRatio>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
