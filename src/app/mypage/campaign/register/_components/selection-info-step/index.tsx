import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingTextarea } from '@/components/ui/floating-textarea';

import { SelectionData, selectionSchema } from '../../_schemas/company-register-schemas';

import SelectionDatePicker from './selection-date-picker';

interface Props {
  context: any;
  onNext: (data: SelectionData) => void;
}

/**
 * 인플루언서 선정 정보 입력 스텝 컴포넌트입니다.
 */
export default function SelectionInfoStep({ context, onNext }: Props) {
  console.log('인플루언서 선정 정보', context);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SelectionData>({
    resolver: zodResolver(selectionSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="ck-title pt-5 pb-10">
        캠페인에서 선정할 <br />
        인플루언서 정보를 알려주세요
      </div>

      <FloatingTextarea
        label="인플루언서 선정 기준"
        {...register('selectionCriteria')}
        className="h-[100px]"
      />
      {errors.selectionCriteria && (
        <p className="text-ck-red-500 ck-caption-1">{errors.selectionCriteria.message}</p>
      )}

      <div className="h-10"></div>

      {/* 인플루언서 선정일 */}
      <Controller
        name="selectionDate"
        control={control}
        render={({ field }) => (
          <SelectionDatePicker
            date={field.value}
            setDate={field.onChange}
            error={errors.selectionDate?.message}
          />
        )}
      />

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
