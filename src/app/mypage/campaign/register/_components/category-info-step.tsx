'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryData, categorySchema } from '@/schemas/campaign-register.schemas';

import {
  type CampaignCategoryType,
  CAMPAIGN_TYPES,
  VISIT_CATEGORIES,
} from '@/types/campaigns/models';

// 카테고리 옵션
const CATEGORY_OPTIONS: Record<CampaignCategoryType, readonly string[]> = {
  방문: VISIT_CATEGORIES,
  배송: [], // 배송은 현재 사용하지 않으므로 비활성화
};

interface Props {
  onNext: (data: CategoryData) => void;
}

/**
 * 카테고리 선택 스텝 컴포넌트 (순서 변경)
 */
export default function CategoryInfoStep({ onNext }: Props) {
  const { control, handleSubmit, watch, resetField } = useForm<CategoryData>({
    resolver: zodResolver(categorySchema),
    mode: 'onChange',
  });

  // 각 필드의 값을 확인하기 위해 watch 사용
  const watchedCampaignType = watch('campaignType');
  const watchedCategoryType = watch('categoryType');
  const watchedCategoryName = watch('categoryName');

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="ck-title pt-5 pb-10">어떤 캠페인을 생성할까요?</div>

      <div className="space-y-10">
        {/* 플랫폼 선택 */}
        <div>
          <label className="ck-body-2 text-ck-gray-700 mb-2 block">플랫폼</label>
          <Controller
            name="campaignType"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ''}
                onValueChange={value => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="플랫폼을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_TYPES.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* 카테고리 선택 */}
        <div>
          <label className="ck-body-2 text-ck-gray-700 mb-2 block">카테고리 타입</label>
          <Controller
            name="categoryType"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ''}
                onValueChange={value => {
                  field.onChange(value);
                  // 카테고리 타입 변경 시 하위 필드(세부 카테고리)를 초기화
                  resetField('categoryName');
                }}
                disabled={!watchedCampaignType}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue
                    placeholder={
                      !watchedCampaignType
                        ? '플랫폼을 먼저 선택해주세요'
                        : '카테고리 타입을 선택해주세요'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="방문">방문</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <p className="ck-caption-2 text-ck-gray-600 mt-1">
            * 지금은 방문 캠페인만 생성할 수 있어요.
          </p>
        </div>

        {/* 세부 카테고리 선택 */}
        <div>
          <label className="ck-body-2 text-ck-gray-700 mb-2 block">세부 카테고리</label>
          <Controller
            name="categoryName"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ''}
                onValueChange={field.onChange}
                disabled={!watchedCategoryType}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue
                    placeholder={
                      !watchedCategoryType
                        ? '카테고리 타입을 먼저 선택해주세요'
                        : '세부 카테고리를 선택해주세요'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {watchedCategoryType &&
                    CATEGORY_OPTIONS[watchedCategoryType].map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <BottomButton disabled={!watchedCategoryName}>다음으로</BottomButton>
    </form>
  );
}
