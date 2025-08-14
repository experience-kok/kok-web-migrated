'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
}

/**
 * 캠페인 등록 페이지 사업체 정보 등록 컴포넌트
 */
export default function CompanyInfoForm({ register, errors }: Props) {
  return (
    <div className="space-y-3">
      {/* 담당자명 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          담당자명 <span className="text-ck-red-500">*</span>
        </div>
        <Input {...register('contactPerson')} placeholder="담당자명을 입력해주세요 (최대 50자)" />
        {errors.contactPerson && (
          <p className="text-ck-red-500 ck-caption-1">{errors.contactPerson.message}</p>
        )}
      </div>

      {/* 연락처 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          담당자 연락처 <span className="text-ck-red-500">*</span>
        </div>
        <Input {...register('phoneNumber')} placeholder="010-1234-5678" />
        {errors.phoneNumber && (
          <p className="text-ck-red-500 ck-caption-1">{errors.phoneNumber.message}</p>
        )}
      </div>
    </div>
  );
}
