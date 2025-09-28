import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingInput } from '@/components/ui/floating-input';

import { MissionContentData, missionContentSchema } from '../../_schemas/company-register-schemas';

import MissionDatePicker from './mission-date-picker';
import WithMapCheckBox from './with-map-check-box';

interface Props {
  context: {
    selectionInfo: {
      selectionDate: Date;
    };
    campaignInfo: {
      isAlwaysOpen: boolean;
      recruitmentEndDate?: Date;
      recruitmentStartDate: Date;
    };
  };
  onNext: (data: MissionContentData) => void;
}

/**
 * 미션 콘텐츠 정보 입력 스텝 컴포넌트입니다.
 */
export default function MissionContentInfoStep({ context, onNext }: Props) {
  console.log('미션 콘텐츠 정보', context);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<MissionContentData>({
    resolver: zodResolver(missionContentSchema),
  });

  // 도움말 메시지 생성
  const getHelperMessage = () => {
    if (!context.campaignInfo || !context.selectionInfo) return '';

    if (context.campaignInfo.isAlwaysOpen) {
      const startDate = new Date(context.selectionInfo.selectionDate);
      return `인플루언서 선정일(${format(startDate, 'yyyy-MM-dd')}) 이후로 선택해 주세요.`;
    }

    return '';
  };

  const isMissionDate = context.campaignInfo.isAlwaysOpen ? false : true;

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="space-y-6">
        <h3 className="ck-sub-title-1 text-ck-gray-900">
          인플루언서가 미션에 포함해야 할 <br />
          콘텐츠 수량을 알려주세요
        </h3>

        <Controller
          name="isMap"
          control={control}
          render={({ field }) => (
            <WithMapCheckBox checked={field.value} onChange={field.onChange} />
          )}
        />

        <div className="space-y-1">
          <FloatingInput
            type="number"
            label="이미지 수"
            {...register('numberOfImage', { valueAsNumber: true })}
            min="0"
          />
          {errors.numberOfImage && (
            <p className="text-ck-red-500 ck-caption-2">{errors.numberOfImage.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <FloatingInput
            type="number"
            label="비디오 수"
            {...register('numberOfVideo', { valueAsNumber: true })}
            min="0"
          />
          {errors.numberOfVideo && (
            <p className="text-ck-red-500 ck-caption-2">{errors.numberOfVideo.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <FloatingInput
            type="number"
            label="텍스트 수"
            {...register('numberOfText', { valueAsNumber: true })}
            min="0"
          />
          {errors.numberOfText && (
            <p className="text-ck-red-500 ck-caption-2">{errors.numberOfText.message}</p>
          )}
        </div>

        {isMissionDate && (
          <>
            {/* 미션 시작일 */}
            <Controller
              name="missionStartDate"
              control={control}
              render={({ field }) => (
                <div>
                  <MissionDatePicker
                    date={field.value}
                    title="미션 시작일"
                    setDate={field.onChange}
                    error={errors.missionStartDate?.message}
                  />
                  {/* 도움말 메시지 */}
                  <p className="ck-caption-2 text-ck-gray-600 mt-1">{getHelperMessage()}</p>
                </div>
              )}
            />
            {/* 미션 종료일 */}
            <Controller
              name="missionDeadlineDate"
              control={control}
              render={({ field }) => (
                <div>
                  <MissionDatePicker
                    date={field.value}
                    title="미션 종료일"
                    setDate={field.onChange}
                    error={errors.missionDeadlineDate?.message}
                  />
                  {/* 도움말 메시지 */}
                  <p className="ck-caption-2 text-ck-gray-600 mt-1">{getHelperMessage()}</p>
                </div>
              )}
            />
          </>
        )}
      </div>

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
