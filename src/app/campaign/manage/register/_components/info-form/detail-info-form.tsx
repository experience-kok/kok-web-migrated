'use client';

import { Calendar } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
}

/**
 * 캠페인 등록 페이지 상세 정보 등록 컴포넌트
 */
export default function DetailInfoForm({ register, errors }: Props) {
  return (
    <div className="space-y-3">
      {/* 캠페인 타입 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          제공 제품/서비스 상세 정보 <span className="text-ck-red-500">*</span>
        </div>
        <Textarea
          {...register('productDetails')}
          placeholder="캠페인에서 제공하는 혜택과 체험 내용에 대한 자세한 설명을 입력해주세요"
          className="min-h-[120px]"
        />
        {errors.productDetails && (
          <p className="text-ck-red-500 ck-caption-1">{errors.productDetails.message}</p>
        )}
      </div>

      {/* 선정 기준 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          선정 기준 <span className="text-ck-red-500">*</span>
        </div>
        <Textarea
          {...register('selectionCriteria')}
          placeholder="인플루언서 선정 시 고려할 기준을 설명해주세요. (팔로워 수, 전문성, 활동 이력 등)"
          className="min-h-[120px]"
        />
        {errors.selectionCriteria && (
          <p className="text-ck-red-500 ck-caption-1">{errors.selectionCriteria.message}</p>
        )}
      </div>

      {/* 참가자 선정일 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          참가자 발표일 <span className="text-ck-red-500">*</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-ck-gray-700 size-4" />
          <Input {...register('selectionDate')} type="date" />
        </div>
        {errors.selectionDate && (
          <p className="text-ck-red-500 ck-caption-1">{errors.selectionDate.message}</p>
        )}
      </div>
    </div>
  );
}
