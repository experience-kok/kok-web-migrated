'use client';

import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingTextarea } from '@/components/ui/floating-textarea';

import {
  SelectionData,
  createSelectionSchemaWithCampaignValidation,
} from '../../_schemas/company-register-schemas';

import SelectionDatePicker from './selection-date-picker';

interface Props {
  context: {
    campaignInfo: {
      isAlwaysOpen: boolean;
      recruitmentEndDate?: Date;
      recruitmentStartDate: Date;
    };
  };
  onNext: (data: SelectionData) => void;
}

/**
 * 인플루언서 선정 정보 입력 스텝 컴포넌트입니다.
 */
export default function SelectionInfoStep({ context, onNext }: Props) {
  // 캠페인 정보에 따라 동적으로 스키마 생성
  const validationSchema = useMemo(() => {
    return createSelectionSchemaWithCampaignValidation(context.campaignInfo);
  }, [context.campaignInfo]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SelectionData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  // 도움말 메시지 생성
  const getHelperMessage = () => {
    if (!context.campaignInfo) return '';

    if (context.campaignInfo.isAlwaysOpen) {
      const startDate = new Date(context.campaignInfo.recruitmentStartDate);
      return `모집 시작일(${format(startDate, 'yyyy-MM-dd')}) 이후로 선택해 주세요.`;
    } else if (context.campaignInfo.recruitmentEndDate) {
      const endDate = new Date(context.campaignInfo.recruitmentEndDate);
      return `모집 종료일(${format(endDate, 'yyyy-MM-dd')}) 이후로 선택해 주세요.`;
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="ck-title pt-5 pb-10">
        캠페인에서 선정할 <br />
        인플루언서 정보를 알려주세요
      </div>

      <div>
        <FloatingTextarea
          label="인플루언서 선정 기준"
          {...register('selectionCriteria')}
          className="h-[200px]"
        />
        {errors.selectionCriteria && (
          <p className="text-ck-red-500 ck-caption-1 mt-1">{errors.selectionCriteria.message}</p>
        )}
      </div>

      <div className="h-10"></div>

      {/* 인플루언서 선정일 */}
      <Controller
        name="selectionDate"
        control={control}
        render={({ field }) => (
          <div>
            <SelectionDatePicker
              date={field.value}
              setDate={field.onChange}
              error={errors.selectionDate?.message}
            />
            {/* 도움말 메시지 */}
            <p className="ck-caption-2 text-ck-gray-600 mt-1">{getHelperMessage()}</p>
          </div>
        )}
      />

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
