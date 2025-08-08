import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
}

/**
 * 캠페인 등록 페이지 방문 정보 등록 컴포넌트
 */
export default function VisitInfoForm({ register, errors }: Props) {
  return (
    <div className="space-y-3">
      {/* 공식 홈페이지 주소 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">공식 홈페이지 주소</div>

        <Input {...register('homepage')} placeholder="https://chkok.kr" />
        {errors.homepage && (
          <p className="text-ck-red-500 ck-caption-1">{errors.homepage.message}</p>
        )}
      </div>

      {/* 연락처 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          연락처 <span className="text-ck-red-500">*</span>
        </div>

        <Input {...register('contactPhone')} placeholder="010-1234-1234" />
        {errors.contactPhone && (
          <p className="text-ck-red-500 ck-caption-1">{errors.contactPhone.message}</p>
        )}
      </div>

      {/* 방문 및 예약안내 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          방문 및 예약안내 <span className="text-ck-red-500">*</span>
        </div>

        <Textarea
          {...register('visitAndReservationInfo')}
          placeholder={`[인플루언서 방문가능시간] 평일 12:00~14:00 사이
[영업시간] 화~일 10:00 ~ 22:00

방문 최소 2일 전 예약 필수 / 당일 예약 불가`}
          className="min-h-[200px]"
        />
        {errors.visitAndReservationInfo && (
          <p className="text-ck-red-500 ck-caption-1">{errors.visitAndReservationInfo.message}</p>
        )}
      </div>
    </div>
  );
}
