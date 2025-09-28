'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingInput } from '@/components/ui/floating-input';
import { FloatingTextarea } from '@/components/ui/floating-textarea';

import { VisitData, visitSchema } from '../../_schemas/company-register-schemas';

import MapPicker from './map-picker';

interface Props {
  context: {
    categoryInfo: {
      categoryType: '방문' | '배송';
    };
  };
  onNext: (data: VisitData) => void;
}

export default function VisitInfoStep({ context, onNext }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<VisitData>({
    resolver: zodResolver(visitSchema),
    mode: 'onChange',
    defaultValues: {
      homepage: '',
      contactPhone: '',
      visitAndReservationInfo: '',
      businessAddress: '',
      businessDetailAddress: '',
      lat: undefined,
      lng: undefined,
    },
  });

  // MapPicker에서 선택된 위치 정보를 form state에 업데이트하는 함수
  const handleLocationSelect = (data: { address: string; lat: number; lng: number }) => {
    setValue('businessAddress', data.address, { shouldValidate: true });
    setValue('lat', data.lat, { shouldValidate: true });
    setValue('lng', data.lng, { shouldValidate: true });
  };

  const currentAddress = watch('businessAddress');
  const currentLat = watch('lat');
  const currentLng = watch('lng');

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5 pb-32">
      <div className="ck-title pt-5 pb-10">방문 정보를 알려주세요</div>

      <div className="space-y-8">
        <div className="space-y-1">
          <FloatingInput label="홈페이지 URL (선택)" {...register('homepage')} />
          {errors.homepage && (
            <p className="text-ck-red-500 ck-caption-1">{errors.homepage.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <FloatingInput label="매장 연락처 *" {...register('contactPhone')} />
          {errors.contactPhone && (
            <p className="text-ck-red-500 ck-caption-1">{errors.contactPhone.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <FloatingTextarea
            label="방문 및 예약 안내 *"
            {...register('visitAndReservationInfo')}
            className="min-h-[200px]"
          />
          {errors.visitAndReservationInfo && (
            <p className="text-ck-red-500 ck-caption-1">{errors.visitAndReservationInfo.message}</p>
          )}
        </div>

        {/* 위치 정보 섹션 */}
        <div className="space-y-4">
          <MapPicker
            address={currentAddress}
            lat={currentLat}
            lng={currentLng}
            onSelect={handleLocationSelect}
          />
          {errors.businessAddress && (
            <p className="text-ck-red-500 ck-caption-1 -mt-3">{errors.businessAddress.message}</p>
          )}

          {/* 상세 주소 */}
          <div className="space-y-1">
            <FloatingInput
              label="상세 주소 (선택)"
              {...register('businessDetailAddress')}
              disabled={!currentAddress}
            />
            {errors.businessDetailAddress && (
              <p className="text-ck-red-500 ck-caption-1">{errors.businessDetailAddress.message}</p>
            )}
          </div>

          {/* 좌표 정보 (숨김) */}
          <input type="hidden" {...register('lat', { valueAsNumber: true })} />
          <input type="hidden" {...register('lng', { valueAsNumber: true })} />
        </div>
      </div>

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
