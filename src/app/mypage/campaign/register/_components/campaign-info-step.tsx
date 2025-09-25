'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';

import { CampaignData, campaignSchema } from '../_schemas/company-register-schemas';

import AlwaysOpenCheckBox from './campaign-info-step/always-open-check-box';
import CampaignTitleInput from './campaign-info-step/campaign-title-input';
import MaxApplicantsInput from './campaign-info-step/max-applicants-input';
import RecruitmentDatePicker from './campaign-info-step/recruitment-date-picker';

interface Props {
  onNext: (data: CampaignData) => void;
  context: any;
}

/**
 * 캠페인 정보 입력 스텝 컴포넌트
 */
export default function CampaignInfoStep({ context, onNext }: Props) {
  console.log('캠페인 정보', context);

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm<CampaignData>({
    resolver: zodResolver(campaignSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      isAlwaysOpen: false,
      recruitmentStartDate: undefined,
      recruitmentEndDate: undefined,
      maxApplicants: undefined,
    },
  });

  const 상시모집캠페인여부 = watch('isAlwaysOpen');

  useEffect(() => {
    resetField('maxApplicants');
    resetField('recruitmentEndDate');
  }, [상시모집캠페인여부, resetField]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="ck-title pt-5 pb-10">캠페인 정보를 알려주세요</div>

      <div className="space-y-10">
        {/* 캠페인 제목 */}
        <CampaignTitleInput register={register} error={errors.title?.message} />

        {/* 상시 모집 캠페인 */}
        <Controller
          name="isAlwaysOpen"
          control={control}
          render={({ field }) => (
            <AlwaysOpenCheckBox checked={field.value} onChange={field.onChange} />
          )}
        />

        {/* 선정 인원 */}
        {!상시모집캠페인여부 && (
          <MaxApplicantsInput register={register} error={errors.maxApplicants?.message} />
        )}

        {/* 모집 시작일 */}
        <Controller
          name="recruitmentStartDate"
          control={control}
          render={({ field }) => (
            <RecruitmentDatePicker
              date={field.value}
              setDate={field.onChange}
              title="모집 시작일"
              error={errors.recruitmentStartDate?.message}
            />
          )}
        />

        {/* 모집 종료일 */}
        {!상시모집캠페인여부 && (
          <div>
            <Controller
              name="recruitmentEndDate"
              control={control}
              render={({ field }) => (
                <RecruitmentDatePicker
                  date={field.value}
                  setDate={field.onChange}
                  title="모집 종료일"
                  error={errors.recruitmentEndDate?.message}
                />
              )}
            />
          </div>
        )}
      </div>

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
