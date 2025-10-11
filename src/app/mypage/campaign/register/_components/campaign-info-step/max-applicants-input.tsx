import { UseFormRegister } from 'react-hook-form';

import { FloatingInput } from '@/components/ui/floating-input';
import { CampaignData } from '@/schemas/campaign-register.schemas';

interface Props {
  register: UseFormRegister<CampaignData>;
  error?: string;
}

/**
 * '선정 인원' 입력을 위한 인풋 컴포넌트입니다.
 *
 * `type=number` 속성을 가지며, 사용자가 입력한 값(문자열)을 숫자로 자동 변환합니다.
 * 만약 입력값이 비어있거나 숫자로 변환할 수 없는 경우 `undefined`를 반환하여 유효성 검사가 올바르게 동작하도록 돕습니다.
 *
 * @param {UseFormRegister<CampaignData>} props.register - `react-hook-form`의 `register` 함수입니다.
 * @param {string} props.error - (선택 사항) 폼 유효성 검사 시 발생하는 에러 메시지입니다. 이 값이 존재할 경우, 인풋 필드 아래에 빨간색 텍스트로 표시됩니다.
 */
export default function MaxApplicantsInput({ register, error }: Props) {
  return (
    <div className="space-y-1">
      <FloatingInput
        label="선정 인원 (필수)"
        type="number"
        {...register('maxApplicants', {
          setValueAs: v => {
            if (v === '' || v === null || v === undefined) return undefined;
            const n = Number(v);
            return Number.isFinite(n) ? n : undefined;
          },
        })}
        required
      />
      {error && <p className="text-ck-red-500 ck-caption-1">{error}</p>}
    </div>
  );
}
