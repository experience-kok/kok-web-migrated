'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { FloatingTextarea } from '@/components/ui/floating-textarea';

import { MissionData, missionSchema } from '../../_schemas/company-register-schemas';

import MissionKeywords from './mission-keywords';

interface Props {
  onNext: (data: MissionData) => void;
}

/**
 * 미션 정보 입력 스텝 컴포넌트입니다.
 */
export default function MissionInfoStep({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<MissionData>({
    resolver: zodResolver(missionSchema),
    mode: 'onChange',
  });

  const titleKeywords = watch('titleKeywords');
  const bodyKeywords = watch('bodyKeywords');

  return (
    <form onSubmit={handleSubmit(onNext)} className="px-5 pb-32">
      <div className="ck-title pt-5 pb-10">
        인플루언서가 수행할 <br />
        미션 정보를 알려주세요
      </div>

      <div className="space-y-1">
        <FloatingTextarea label="미션 가이드" {...register('missionGuide')} className="h-[120px]" />
        {errors.missionGuide && (
          <p className="text-ck-red-500 ck-caption-1">{errors.missionGuide.message}</p>
        )}
      </div>

      <div className="h-10" />

      <div className="space-y-1">
        <FloatingTextarea label="제목 키워드" {...register('titleKeywords')} />
        {errors.titleKeywords && (
          <p className="text-ck-red-500 ck-caption-1">{errors.titleKeywords.message}</p>
        )}
        <MissionKeywords keywordString={titleKeywords} />
        <p className="ck-caption-2 text-ck-gray-600">
          * 리뷰 제목에 반드시 포함되어야 할 키워드를 쉼표(,)로 구분하여 입력해주세요.
        </p>
      </div>

      <div className="h-10" />

      <div className="space-y-1">
        <FloatingTextarea label="본문 키워드" {...register('bodyKeywords')} className="h-[80px]" />
        {errors.bodyKeywords && (
          <p className="text-ck-red-500 ck-caption-1">{errors.bodyKeywords.message}</p>
        )}
        <MissionKeywords keywordString={bodyKeywords} />
        <p className="ck-caption-2 text-ck-gray-600">
          * 리뷰 본문에 반드시 포함되어야 할 키워드를 쉼표(,)로 구분하여 입력해주세요.
        </p>
      </div>

      <BottomButton disabled={!isValid}>다음으로</BottomButton>
    </form>
  );
}
