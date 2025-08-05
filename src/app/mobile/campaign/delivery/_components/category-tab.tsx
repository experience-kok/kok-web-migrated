'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { 배송카테고리 } from '@/models/campaign';

import { useURLParams } from '@/hooks/use-url-params';

// 카테고리 옵션
const CategoryOption: Array<{ value: 배송카테고리 | ''; label: string }> = [
  {
    value: '',
    label: '전체',
  },
  {
    value: '식품',
    label: '식품',
  },
  {
    value: '화장품',
    label: '화장품',
  },
  {
    value: '생활용품',
    label: '생활용품',
  },
  {
    value: '패션',
    label: '패션',
  },
  {
    value: '잡화',
    label: '잡화',
  },
];

/**
 * 카테고리 탭 컴포넌트
 */
export default function CategoryTab() {
  const searchParams = useSearchParams();
  const { updateParams } = useURLParams();

  // 현재 적용된 필터 값들
  const currentCategory = searchParams.get('categoryName') as 배송카테고리 | null;

  // 로컬 상태
  const [selectedCategory, setSelectedCategory] = useState<배송카테고리 | ''>(
    currentCategory || '',
  );

  // 카테고리 변경 함수
  const handleCategoryChange = (category: 배송카테고리 | '') => {
    setSelectedCategory(category);
    updateParams({
      categoryName: category,
      page: '1',
    });
  };

  return (
    <div className="sticky top-0 z-10 flex h-11 w-full items-center border-b-[1px] border-gray-200 bg-white md:h-14 md:px-6 lg:px-16">
      <ul className="scrollbar-hide flex h-full space-x-4 overflow-x-auto whitespace-nowrap">
        {CategoryOption.map(({ value, label }, index) => (
          <li
            key={`${value}-${index}`}
            onClick={() => handleCategoryChange(value)}
            className={`ck-body-2-bold flex cursor-pointer items-center justify-center border-b-2 font-semibold ${selectedCategory === value ? 'border-primary text-ck-gray-900' : 'text-ck-gray-600 border-transparent'} ${index === 0 ? 'ml-6 md:ml-0' : ''} ${index === CategoryOption.length - 1 ? 'mr-4 md:mr-0' : ''}`}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
