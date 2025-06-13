'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { VISIT_CATEGORIES, DELIVERY_CATEGORIES, CampaignCategoryType } from '@/models/campaign';

import CategoryItemMenu from './_components/category-item-menu';

/**
 * 카테고리 페이지
 */
export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 tab 파라미터 읽기 (기본값: '방문')
  const [activeTab, setActiveTab] = useState('방문');

  useEffect(() => {
    const tabParam = searchParams.get('tab') as CampaignCategoryType;
    if (tabParam === '방문' || tabParam === '배송') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // 탭 변경 핸들러
  const handleTabChange = (tab: CampaignCategoryType) => {
    setActiveTab(tab);

    // URL 쿼리 파라미터 업데이트
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  // 캠페인 페이지로 라우팅하는 함수
  const handleRouteToCampaignPage = (categoryName: string) => {
    const campaignType = activeTab === '방문' ? 'visit' : 'delivery';
    const url = `/campaign/${campaignType}?categoryName=${encodeURIComponent(categoryName)}`;
    router.push(url);
  };

  // 현재 탭에 따른 카테고리 데이터 선택
  const currentCategories = activeTab === '방문' ? VISIT_CATEGORIES : DELIVERY_CATEGORIES;

  return (
    <>
      <div className="flex flex-col bg-white">
        {/* Category Tabs */}
        <div className="flex border-b">
          <Button
            variant={'ghost'}
            className={`h-full flex-1 rounded-none py-3 font-medium ${
              activeTab === '방문' ? 'border-b-2 border-black text-black' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('방문')}
          >
            방문
          </Button>
          <Button
            variant={'ghost'}
            className={`h-full flex-1 rounded-none py-3 font-medium ${
              activeTab === '배송' ? 'border-b-2 border-black text-black' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('배송')}
          >
            배송
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2">
          {currentCategories.map((item, index) => (
            <CategoryItemMenu key={index} onClick={() => handleRouteToCampaignPage(item)}>
              {item}
            </CategoryItemMenu>
          ))}
        </div>
      </div>
    </>
  );
}
