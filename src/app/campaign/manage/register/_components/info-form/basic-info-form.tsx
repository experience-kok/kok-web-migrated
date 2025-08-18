import { Calendar, Users } from 'lucide-react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CampaignCategoryType } from '@/models/campaign';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  control: Control<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
  categoryType: CampaignCategoryType | undefined;
  isAlwaysOpen: boolean;
  handleCategoryTypeChange: (value: CampaignCategoryType) => void;
}

/**
 * 캠페인 등록 페이지 기본 정보 등록 컴포넌트
 */
export default function BasicInfoForm({
  register,
  control,
  errors,
  categoryType,
  isAlwaysOpen,
  handleCategoryTypeChange,
}: Props) {
  return (
    <div className="space-y-3">
      {/* 캠페인 타입 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          캠페인 타입 <span className="text-ck-red-500">*</span>
        </div>

        <Controller
          name="campaignType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="캠페인 타입을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="인스타그램">인스타그램</SelectItem>
                <SelectItem value="블로그">블로그</SelectItem>
                <SelectItem value="유튜브">유튜브</SelectItem>
                <SelectItem value="틱톡">틱톡</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.campaignType && (
          <p className="text-ck-red-500 ck-caption-1">{errors.campaignType.message}</p>
        )}
      </div>

      {/* 카테고리 타입 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          카테고리 타입 <span className="text-ck-red-500">*</span>
        </div>

        <Controller
          name="categoryType"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={value => {
                field.onChange(value);
                handleCategoryTypeChange(value as CampaignCategoryType);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리 타입을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="방문">방문</SelectItem>
                <SelectItem value="배송">배송</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryType && (
          <p className="text-ck-red-500 ck-caption-1">{errors.categoryType.message}</p>
        )}
      </div>

      {/* 카테고리 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          카테고리 <span className="text-ck-red-500">*</span>
        </div>
        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={!categoryType}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    categoryType ? '카테고리를 선택해주세요' : '먼저 카테고리 타입을 선택해주세요'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categoryType === '방문' && (
                  <>
                    <SelectItem value="맛집">맛집</SelectItem>
                    <SelectItem value="카페">카페</SelectItem>
                    <SelectItem value="뷰티">뷰티</SelectItem>
                    <SelectItem value="숙박">숙박</SelectItem>
                  </>
                )}
                {categoryType === '배송' && (
                  <>
                    <SelectItem value="식품">식품</SelectItem>
                    <SelectItem value="화장품">화장품</SelectItem>
                    <SelectItem value="생활용품">생활용품</SelectItem>
                    <SelectItem value="패션">패션</SelectItem>
                    <SelectItem value="잡화">잡화</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryName && (
          <p className="text-ck-red-500 ck-caption-1">{errors.categoryName.message}</p>
        )}
      </div>

      {/* 캠페인 제목 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          캠페인 제목 <span className="text-ck-red-500">*</span>
        </div>

        <Input {...register('title')} placeholder="캠페인 제목을 입력해주세요 (최대 200자)" />
        {errors.title && <p className="text-ck-red-500 ck-caption-1">{errors.title.message}</p>}
      </div>

      {/* 제품/서비스 간략 정보 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          제품/서비스 간략 정보 <span className="text-ck-red-500">*</span>
        </div>

        <Input
          {...register('productShortInfo')}
          placeholder="제공하는 혜택에 대해 간단히 요약해주세요 (최대 50자)"
        />
        {errors.productShortInfo && (
          <p className="text-ck-red-500 ck-caption-1">{errors.productShortInfo.message}</p>
        )}
      </div>

      {/* 상시 캠페인 여부 - 방문 캠페인일 때만 표시 */}
      {categoryType === '방문' && (
        <div className="space-y-2">
          <div className="ck-body-2-bold mb-1">상시 캠페인</div>

          <Controller
            name="isAlwaysOpen"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAlwaysOpen"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label htmlFor="isAlwaysOpen" className="ck-body-2 text-ck-gray-800">
                  상시 캠페인으로 운영할래요
                </label>
              </div>
            )}
          />
          {errors.isAlwaysOpen && (
            <p className="text-ck-red-500 ck-caption-1">{errors.isAlwaysOpen.message}</p>
          )}
        </div>
      )}

      {/* 선정 인원 - 상시 캠페인이 아닐 때만 표시 */}
      {!isAlwaysOpen && (
        <div className="space-y-2">
          <div className="ck-body-2-bold mb-1">
            선정 인원 <span className="text-ck-red-500">*</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="text-ck-gray-700 size-4" />
            <Input
              {...register('maxApplicants', {
                setValueAs: v => {
                  if (v === '' || v === null || v === undefined) return undefined; // optional 통과
                  const n = Number(v);
                  return Number.isFinite(n) ? n : undefined; // 숫자가 아니면 undefined로
                },
              })}
              type="number"
              placeholder="10"
              min={1}
              step={1}
            />
          </div>
          {errors.maxApplicants && (
            <p className="text-ck-red-500 ck-caption-1">{errors.maxApplicants.message}</p>
          )}
        </div>
      )}

      {/* 캠페인 모집 시작일 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          캠페인 모집 시작일 <span className="text-ck-red-500">*</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="text-ck-gray-700 size-4" />
          <Input {...register('recruitmentStartDate')} type="date" />
        </div>
        {errors.recruitmentStartDate && (
          <p className="text-ck-red-500 ck-caption-1">{errors.recruitmentStartDate.message}</p>
        )}
      </div>

      {/* 캠페인 모집 종료일 - 상시 캠페인이 아닐 때만 표시 */}
      {!isAlwaysOpen && (
        <div className="space-y-2">
          <div className="ck-body-2-bold mb-1">
            캠페인 모집 종료일 <span className="text-ck-red-500">*</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-ck-gray-700 size-4" />
            <Input {...register('recruitmentEndDate')} type="date" />
          </div>
          {errors.recruitmentEndDate && (
            <p className="text-ck-red-500 ck-caption-1">{errors.recruitmentEndDate.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
