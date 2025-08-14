'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import AdImage from '@/assets/ad.png';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export default function AdBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(3);

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
    <div className="flex w-full flex-col items-center justify-center">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <Image src={AdImage} alt="광고 이미지" className="w-full rounded-[12px]" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 점 인디케이터 */}
      <div className="mt-3 flex space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              current === index + 1 ? 'bg-foreground w-4' : 'bg-gray-300'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
