'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { CampaignType, Sort, 방문카테고리 } from '@/models/campaign';

// 정렬 옵션
const sortOptions: Array<{ value: Sort; label: string }> = [
  {
    value: 'latest',
    label: '최신순',
  },
  {
    value: 'popular',
    label: '인기순',
  },
  {
    value: 'deadline',
    label: '선정 마감순',
  },
];

// 카테고리 옵션
const categoryOption: Array<{ value: 방문카테고리 | ''; label: string }> = [
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
];

// 캠페인 타입 옵션
const campaignTypeOption: Array<{ value: CampaignType; label: string }> = [
  {
    value: '인스타그램',
    label: '인스타그램',
  },
  {
    value: '블로그',
    label: '블로그',
  },
  {
    value: '유튜브',
    label: '유튜브',
  },
  {
    value: '틱톡',
    label: '틱톡',
  },
];

interface Props {
  totalElements: number;
}

export default function Filter({ totalElements }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 적용된 필터 값들
  const currentCategory = searchParams.get('categoryName') as 방문카테고리 | null;
  const currentCampaignTypes = searchParams.get('campaignTypes')?.split(',') || [];
  const currentSort = searchParams.get('sort') as Sort | null;

  // 로컬 상태
  const [selectedCategory, setSelectedCategory] = useState<방문카테고리 | ''>(
    currentCategory || '',
  );
  const [selectedCampaignTypes, setSelectedCampaignTypes] =
    useState<string[]>(currentCampaignTypes);
  const [selectedSort, setSelectedSort] = useState<Sort | ''>(currentSort || '');

  // URL 업데이트
  const updateURL = useCallback(
    (params: Record<string, string | string[] | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
          current.delete(key);
        } else if (Array.isArray(value)) {
          current.set(key, value.join(','));
        } else {
          current.set(key, value);
        }
      });

      // 페이지는 1로 리셋
      current.set('page', '1');

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${window.location.pathname}${query}`);
    },
    [searchParams, router],
  );

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: 방문카테고리 | '') => {
    setSelectedCategory(category);
    updateURL({
      categoryName: category || undefined,
      campaignTypes: selectedCampaignTypes.length > 0 ? selectedCampaignTypes : undefined,
      sort: selectedSort || undefined,
    });
  };

  // 캠페인 타입 변경 핸들러
  const handleCampaignTypeChange = (type: string, checked: boolean) => {
    let newTypes: string[];

    if (checked) {
      newTypes = [...selectedCampaignTypes, type];
    } else {
      newTypes = selectedCampaignTypes.filter(t => t !== type);
    }

    setSelectedCampaignTypes(newTypes);
    updateURL({
      categoryName: selectedCategory || undefined,
      campaignTypes: newTypes.length > 0 ? newTypes : undefined,
      sort: selectedSort || undefined,
    });
  };

  // 정렬 변경 함수
  const handleSortChange = (sort: Sort | '') => {
    setSelectedSort(sort);
    updateURL({
      categoryName: selectedCategory || undefined,
      campaignTypes: selectedCampaignTypes.length > 0 ? selectedCampaignTypes : undefined,
      sort: sort || undefined,
    });
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex h-11 w-full items-center border-b-[1px] border-gray-200 bg-white md:h-14 md:px-6 lg:px-16">
        <ul className="scrollbar-hide flex h-full space-x-4 overflow-x-auto whitespace-nowrap">
          {categoryOption.map(({ value, label }, index) => (
            <li
              key={`${value}-${index}`}
              onClick={() => handleCategoryChange(value)}
              className={`md:text-md hover:text-primary flex cursor-pointer items-center justify-center border-b-2 font-semibold md:px-1 ${selectedCategory === value ? 'border-primary font-bole' : 'text-muted-foreground border-transparent'} ${index === 0 ? 'ml-6 md:ml-0' : ''} ${index === categoryOption.length - 1 ? 'mr-4 md:mr-0' : ''}`}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 px-6 lg:px-16">
        {/* 캠페인 타입 필터 */}
        <div className="mb-4 flex items-center gap-2">
          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="text-foreground cursor-pointer border-gray-300 transition-all duration-200 hover:border-gray-400">
              <SelectValue placeholder="최신순" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto">
            {campaignTypeOption.map(option => (
              <button
                key={option.value}
                onClick={() =>
                  handleCampaignTypeChange(
                    option.value,
                    !selectedCampaignTypes.includes(option.value),
                  )
                }
                className={`flex w-fit cursor-pointer items-center justify-between rounded-full border-1 px-4 py-1 whitespace-nowrap transition-all duration-200 ${
                  selectedCampaignTypes.includes(option.value)
                    ? 'border-primary text-primary shadow-md'
                    : 'text-muted-foreground border-gray-300 bg-white hover:border-gray-400'
                } `}
              >
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Text size="md" color="foreground">
            총 {totalElements}개
          </Text>
        </div>
      </div>
    </>
  );
}
