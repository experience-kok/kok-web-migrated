import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingInput } from '@/components/ui/floating-input';
import { FloatingTextarea } from '@/components/ui/floating-textarea';

import { ProductData, productSchema } from '../../_schemas/company-register-schemas';

interface Props {
  context: any;
  onNext: (data: ProductData) => void;
}

/**
 * 캠페인을 통해 제공되는 제품/서비스 정보 입력 스텝 컴포넌트입니다.
 */
export default function ProductInfoStep({ context, onNext }: Props) {
  console.log('제품/서비스 정보', context);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5">
      <div className="ck-title pt-5 pb-10">
        사장님께서 제공해주실 <br />
        제품/서비스에 대해 알려주세요
      </div>

      <FloatingInput label="제품/서비스 간략 정보" {...register('productShortInfo')} />
      {errors.productShortInfo && (
        <p className="text-ck-red-500 ck-caption-1">{errors.productShortInfo.message}</p>
      )}

      <div className="h-10"></div>
      
      <FloatingTextarea
        label="제품/서비스 상세 정보"
        {...register('productDetails')}
        className="h-[300px]"
      />
      {errors.productDetails && (
        <p className="text-ck-red-500 ck-caption-1">{errors.productDetails.message}</p>
      )}

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
