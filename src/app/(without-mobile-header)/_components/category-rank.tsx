'use client';

import { useCallback, useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;
    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;
    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselAPI) return;
    onSelect();
    setScrollSnaps(carouselAPI.scrollSnapList());
    carouselAPI.on('select', onSelect);
  }, [carouselAPI, onSelect]);

  const selectedCategoryData = categoryData[selectedIndex];

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
                  ? 'bg-black text-white hover:bg-black'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Carousel className="mx-auto w-full" setApi={setCarouselAPI}>
          <CarouselContent className="-ml-4">
            {categoryData.map(data => (
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
                      해당 카테고리에 캠페인이 없습니다.
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 모바일 이상 사이즈에서 보일 컴포넌트 */}
      <div className="hidden w-full md:block">
        {/* 카테고리 네비게이션 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={`${categoryData[index].categoryType}-${category}`}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer rounded px-4 py-2 transition-all ${
                selectedIndex === index
                  ? 'bg-black text-white hover:bg-black'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategoryData && (
          <div className="flex gap-6">
            <ul className="flex w-1/2 flex-col items-center justify-start gap-4">
              {selectedCategoryData.campaigns.slice(0, 3).map((campaign, index) => (
                <li key={campaign.id} className="w-full">
                  <RankCampaignCard campaign={campaign} ranking={index + 1} />
                </li>
              ))}
            </ul>

            <ul className="flex w-1/2 flex-col items-center gap-4">
              {selectedCategoryData.campaigns.slice(3, 6).map((campaign, index) => (
                <li key={campaign.id} className="w-full">
                  <RankCampaignCard campaign={campaign} ranking={index + 4} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 데이터가 없을 경우 */}
        {selectedCategoryData && selectedCategoryData.campaigns.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>해당 카테고리에 캠페인이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
