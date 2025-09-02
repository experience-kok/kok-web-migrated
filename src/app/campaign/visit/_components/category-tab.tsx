'use client';

import { useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import { 방문카테고리 } from '@/types/campaigns/models';

// 카테고리 옵션
const CategoryOption: Array<{ value: 방문카테고리 | ''; label: string }> = [
  {
    value: '',
    label: '전체',
  },
  {
    value: '맛집',
    label: '맛집',
  },
  {
    value: '카페',
    label: '카페',
  },
  {
    value: '뷰티',
    label: '뷰티',
  },
  {
    value: '숙박',
    label: '숙박',
  },
  {
    value: '기타',
    label: '기타',
  },
];

/**
 * 카테고리 탭 컴포넌트
 */
export default function CategoryTab() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 적용된 카테고리 파라미터
  const currentCategory = searchParams.get('categoryName') as 방문카테고리 | null;

  // 로컬 상태
  const [selectedCategory, setSelectedCategory] = useState<방문카테고리 | ''>(
    currentCategory || '',
  );

  // 카테고리 변경 함수
  const handleCategoryChange = (category: 방문카테고리 | '') => {
    setSelectedCategory(category);

    // 현재 URL 파라미터들을 복사
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // 카테고리와 페이지 파라미터 업데이트
    if (category) {
      current.set('categoryName', category);
    } else {
      current.delete('categoryName'); // 전체 선택시 파라미터 제거
    }
    current.set('page', '1');

    // 새로운 URL 생성
    const search = current.toString();
    const query = search ? `?${search}` : '';

    // 페이지 이동
    router.replace(`${window.location.pathname}${query}`);
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
