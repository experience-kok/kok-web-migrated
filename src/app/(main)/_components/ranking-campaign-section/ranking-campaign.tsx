'use client';

import { useCallback, useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Campaign, CampaignCategoryType, CampaignCategoryName } from '@/models/campaign';

import RankingCampaignCard from './ranking-campaign-card';

interface CategoryRankData {
  categoryType: CampaignCategoryType;
  categoryName: CampaignCategoryName;
  campaigns: Campaign[];
}

interface Props {
  categoryData: CategoryRankData[];
}

/**
 * 메인 페이지 랭킹 캠페인 컴포넌트
 */
export default function RankingCampaign({ categoryData }: Props) {
  const categories = categoryData.map(data => data.categoryName);

  // Find the index of "맛집" category to set as default
  const restaurantIndex = categories.findIndex(category => category === '맛집');
  const defaultIndex = restaurantIndex !== -1 ? restaurantIndex : 0;

  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [, setScrollSnaps] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;
    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;
    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (carouselAPI && restaurantIndex !== -1) {
      carouselAPI.scrollTo(restaurantIndex);
      setSelectedIndex(restaurantIndex);
    }
  }, [carouselAPI, restaurantIndex]);

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768; // md breakpoint is 768px
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      const currentIsMobile = checkMobile();

      if (currentIsMobile !== isMobile) {
        setIsMobile(currentIsMobile);

        if (restaurantIndex !== -1) {
          setSelectedIndex(restaurantIndex);
          if (carouselAPI && currentIsMobile) {
            carouselAPI.scrollTo(restaurantIndex);
          }
        }
      }
    };

    let timeoutId: NodeJS.Timeout;
    const throttledHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledHandleResize);
    return () => {
      window.removeEventListener('resize', throttledHandleResize);
      clearTimeout(timeoutId);
    };
  }, [carouselAPI, restaurantIndex, isMobile]);

  useEffect(() => {
    if (!carouselAPI) return;
    onSelect();
    setScrollSnaps(carouselAPI.scrollSnapList());
    carouselAPI.on('select', onSelect);
  }, [carouselAPI, onSelect]);

  // 각 카테고리별로 캠페인을 3개씩만 남기기
  const limitedCategoryData = categoryData.map(data => ({
    ...data,
    campaigns: data.campaigns.slice(0, 3),
  }));

  return (
    <>
      <div className="scrollbar-hide mt-2 flex space-x-2 overflow-x-auto whitespace-nowrap">
        {categories.map((category, index) => (
          <button
            key={`${categoryData[index].categoryType}-${category}`}
            onClick={() => scrollTo(index)}
            className={`ck-body-2 flex-shrink-0 cursor-pointer rounded-full px-4 py-2 shadow-none transition-all ${
              selectedIndex === index
                ? 'bg-ck-gray-900 border-ck-gray-900 ck-body-2-bold border text-white'
                : 'text-ck-gray-900 border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <Carousel className="mx-auto mt-3 mb-5 w-full" setApi={setCarouselAPI}>
        <CarouselContent className="-ml-4">
          {limitedCategoryData.map(data => (
            <CarouselItem key={`${data.categoryType}-${data.categoryName}`} className="pl-4">
              <div className="flex flex-col gap-3">
                {data.campaigns.slice(0, 5).map((campaign, rankIndex) => (
                  <RankingCampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    ranking={rankIndex + 1}
                  />
                ))}

                {data.campaigns.length === 0 && (
                  <div className="ck-body-2 py-8 text-center text-gray-500">
                    {data.categoryName} 카테고리에 캠페인이 없어요.
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
