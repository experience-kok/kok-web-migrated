'use client';

import { UseFormRegister } from 'react-hook-form';

import { FloatingInput } from '@/components/ui/floating-input';

import { CampaignData } from '../../_schemas/company-register-schemas';

interface Props {
  register: UseFormRegister<CampaignData>;
  error?: string;
}

/**
 * '캠페인 제목' 입력을 위한 인풋 컴포넌트입니다.
 *
 * @param {UseFormRegister<CampaignData>} props.register - `react-hook-form`의 `register` 함수입니다.
 * @param {string} props.error - (선택 사항) 폼 유효성 검사 시 발생하는 에러 메시지입니다. 이 값이 존재할 경우, 인풋 필드 아래에 빨간색 텍스트로 표시됩니다.
 */
export default function CampaignTitleInput({ register, error }: Props) {
  return (
    <div>
      <FloatingInput label="캠페인 제목" {...register('title')} />
      {error && <p className="text-ck-red-500 ck-caption-1">{error}</p>}
    </div>
  );
}
