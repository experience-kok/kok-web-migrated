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

  const visitCampaigns = categoryData
    .filter(data => data.categoryType === '방문')
    .flatMap(data => data.campaigns)
    .slice(0, 3);

  const deliveryCampaigns = categoryData
    .filter(data => data.categoryType === '배송')
    .flatMap(data => data.campaigns)
    .slice(0, 3);

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
                      {data.categoryName} 카테고리에 캠페인이 없어요.
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 모바일 이상 사이즈에서 보일 컴포넌트 - 2열 구조 (방문 | 배송) */}
      <div className="hidden w-full md:block">
        <div className="grid grid-cols-2 gap-8">
          {/* 방문 카테고리 */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-lg font-bold text-blue-800">
                방문
              </span>
            </div>

            <div className="space-y-3">
              {visitCampaigns.map((campaign, index) => (
                <RankCampaignCard key={campaign.id} campaign={campaign} ranking={index + 1} />
              ))}

              {Array.from({ length: Math.max(0, 3 - visitCampaigns.length) }).map((_, index) => (
                <div key={`visit-empty-${index}`} className="w-full">
                  <div className="rounded-lg border border-dashed border-gray-200 py-6 text-center text-gray-300">
                    <p className="text-sm">준비 중이에요.</p>
                  </div>
                </div>
              ))}
            </div>

            {visitCampaigns.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-gray-500">
                <p>방문 카테고리에 캠페인이 없어요.</p>
              </div>
            )}
          </div>

          {/* 배송 카테고리 */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-lg font-bold text-green-800">
                배송
              </span>
            </div>

            <div className="space-y-3">
              {deliveryCampaigns.map((campaign, index) => (
                <RankCampaignCard key={campaign.id} campaign={campaign} ranking={index + 1} />
              ))}

              {Array.from({ length: Math.max(0, 3 - deliveryCampaigns.length) }).map((_, index) => (
                <div key={`delivery-empty-${index}`} className="w-full">
                  <div className="rounded-lg border border-dashed border-gray-200 py-6 text-center text-gray-300">
                    <p className="text-sm">준비 중이에요.</p>
                  </div>
                </div>
              ))}
            </div>

            {deliveryCampaigns.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-gray-500">
                <p>배송 카테고리에 캠페인이 없어요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
