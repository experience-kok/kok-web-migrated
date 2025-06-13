'use client';

import { useCallback, useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { Campaign, CampaignCategoryType, CampaignCategoryName } from '@/models/campaign';

import RankCampaignCard from './rank-campaign-card';

interface CategoryRankData {
  categoryType: CampaignCategoryType;
  categoryName: CampaignCategoryName;
  campaigns: Campaign[];
}

interface CategoryRankProps {
  categoryData: CategoryRankData[];
}

export default function CategoryRank({ categoryData }: CategoryRankProps) {
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

  const restaurantCampaigns =
    categoryData.find(data => data.categoryName === '맛집')?.campaigns.slice(0, 3) || [];

  const accommodationCampaigns =
    categoryData.find(data => data.categoryName === '숙박')?.campaigns.slice(0, 3) || [];

  const cosmeticsCampaigns =
    categoryData.find(data => data.categoryName === '화장품')?.campaigns.slice(0, 3) || [];

  // 각 카테고리별로 캠페인을 3개씩만 남기기
  const limitedCategoryData = categoryData.map(data => ({
    ...data,
    campaigns: data.campaigns.slice(0, 3),
  }));

  return (
    <>
      {/* 모바일에서 보일 컴포넌트 */}
      <div className="block md:hidden">
        <div className="scrollbar-hide mb-4 flex space-x-4 overflow-x-auto whitespace-nowrap">
          {categories.map((category, index) => (
            <button
              key={`${categoryData[index].categoryType}-${category}`}
              onClick={() => scrollTo(index)}
              className={`flex-shrink-0 cursor-pointer rounded px-4 py-2 transition-all ${
                selectedIndex === index
                  ? 'bg-black font-bold text-white hover:bg-black'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Carousel className="mx-auto w-full" setApi={setCarouselAPI}>
          <CarouselContent className="-ml-4">
            {limitedCategoryData.map(data => (
              <CarouselItem key={`${data.categoryType}-${data.categoryName}`} className="pl-4">
                <div className="flex flex-col gap-4">
                  {data.campaigns.slice(0, 5).map((campaign, rankIndex) => (
                    <RankCampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      ranking={rankIndex + 1}
                    />
                  ))}

                  {data.campaigns.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      {data.categoryName} 카테고리에 캠페인이 없어요.
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 모바일 이상 사이즈에서 보일 컴포넌트 - 3열 구조 (맛집 | 숙박 | 화장품) */}
      <div className="hidden w-full md:block">
        <div className="grid grid-cols-3 gap-6">
          {/* 맛집 카테고리 */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-left">
              <Text size={'xl'} weight={'semibold'} className="line-clamp-1">
                입맛도 여행이 필요해요 🍽️
              </Text>
              <Text size={'md'} weight={'semibold'} color="muted-foreground">
                맛집 캠페인
              </Text>
              <Separator />
            </div>

            <div className="space-y-3">
              {restaurantCampaigns.map((campaign, index) => (
                <RankCampaignCard key={campaign.id} campaign={campaign} ranking={index + 1} />
              ))}

              {Array.from({ length: Math.max(0, 3 - restaurantCampaigns.length) }).map(
                (_, index) => (
                  <div key={`restaurant-empty-${index}`} className="w-full">
                    <div className="rounded-lg border border-dashed border-gray-200 py-6 text-center text-gray-300">
                      <p className="text-sm">준비 중이에요.</p>
                    </div>
                  </div>
                ),
              )}
            </div>

            {restaurantCampaigns.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-gray-500">
                <p>맛집 카테고리에 캠페인이 없어요.</p>
              </div>
            )}
          </div>

          {/* 숙박 카테고리 */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-left">
              <Text size={'xl'} weight={'semibold'} className="line-clamp-1">
                쉼표 같은 숙소, 지금 만나봐요 🛌
              </Text>
              <Text size={'md'} weight={'semibold'} color="muted-foreground">
                숙박 캠페인
              </Text>
              <Separator />
            </div>

            <div className="space-y-3">
              {accommodationCampaigns.map((campaign, index) => (
                <RankCampaignCard key={campaign.id} campaign={campaign} ranking={index + 1} />
              ))}

              {Array.from({ length: Math.max(0, 3 - accommodationCampaigns.length) }).map(
                (_, index) => (
                  <div key={`accommodation-empty-${index}`} className="w-full">
                    <div className="rounded-lg border border-dashed border-gray-200 py-6 text-center text-gray-300">
                      <p className="text-sm">준비 중이에요.</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* 화장품 카테고리 */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-left">
              <Text size={'xl'} weight={'semibold'} className="line-clamp-1">
                여름 피부, 기초부터 달라져요 🧴
              </Text>
              <Text size={'md'} weight={'semibold'} color="muted-foreground">
                화장품 캠페인
              </Text>
              <Separator />
            </div>

            <div className="space-y-3">
              {cosmeticsCampaigns.map((campaign, index) => (
                <RankCampaignCard key={campaign.id} campaign={campaign} ranking={index + 1} />
              ))}

              {Array.from({ length: Math.max(0, 3 - cosmeticsCampaigns.length) }).map(
                (_, index) => (
                  <div key={`cosmetics-empty-${index}`} className="w-full">
                    <div className="rounded-lg border border-dashed border-gray-200 py-6 text-center text-gray-300">
                      <p className="text-sm">준비 중이에요.</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
