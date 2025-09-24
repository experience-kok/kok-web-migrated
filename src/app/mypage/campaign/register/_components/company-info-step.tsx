'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingInput } from '@/components/ui/floating-input';

import { CompanyData, companySchema } from '../_schemas/company-register-schemas';

interface Props {
  onNext: (data: CompanyData) => void;
  companyData?: CompanyData;
  context: any;
}

/**
 * 업체 정보 입력 스텝 컴포넌트
 */
export default function CompanyInfoStep({ onNext, companyData, context }: Props) {
  console.log('업체 정보', context);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanyData>({
    resolver: zodResolver(companySchema),
    mode: 'onChange',
    defaultValues: companyData || {
      contactPerson: '',
      phoneNumber: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="ck-title pt-5 pb-10">
        캠페인을 진행할 <br />
        업체의 정보를 알려주세요
      </div>

      <FloatingInput label="담당자명" {...register('contactPerson')} />
      {errors.contactPerson && (
        <p className="text-ck-red-500 ck-caption-1">{errors.contactPerson.message}</p>
      )}

      <div className="h-10"></div>

      <FloatingInput label="연락처" {...register('phoneNumber')} />
      {errors.phoneNumber && (
        <p className="text-ck-red-500 ck-caption-1">{errors.phoneNumber.message}</p>
      )}

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
