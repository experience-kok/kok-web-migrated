import { Calendar } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
  missionKeywords: string;
}

/**
 * 캠페인 등록 페이지 미션 정보 등록 컴포넌트
 */
export default function MissionInfoForm({ register, errors, missionKeywords }: Props) {
  // 미션 키워드를 배열로 변환
  const keywordArray = missionKeywords
    ? missionKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
    : [];

  return (
    <div className="space-y-3">
      {/* 미션 가이드 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          미션 가이드 <span className="text-ck-red-500">*</span>
        </div>
        <div className="ck-body-2 text-ck-gray-700 mb-4">
          선정된 인플루언서가 수행해야 할 구체적인 미션 내용을 작성해주세요
        </div>
        <Textarea
          {...register('missionGuide')}
          placeholder="1. 카페 방문 시 직원에게 체험단임을 알려주세요.&#10;2. 음료와 디저트를 맛있게 즐기며 사진을 찍어주세요.&#10;3. 인스타그램에 사진과 함께 솔직한 후기를 작성해주세요."
          className="min-h-[200px]"
        />
        {errors.missionGuide && (
          <p className="text-ck-red-500 ck-caption-1">{errors.missionGuide.message}</p>
        )}
      </div>

      {/* 미션 키워드 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          미션 키워드 <span className="text-ck-red-500">*</span>
        </div>
        <div className="ck-body-2 text-ck-gray-700 mb-4">
          미션 콘텐츠에 반드시 포함되어야 하는 해시태그나 키워드를 쉼표(,)로 구분하여 입력해주세요
        </div>
        <Textarea
          {...register('missionKeywords')}
          placeholder="카페추천, 디저트맛집, 강남카페, 인스타맛집"
          className="min-h-[100px]"
        />
        {errors.missionKeywords && (
          <p className="text-ck-red-500 ck-caption-1">{errors.missionKeywords.message}</p>
        )}

        {/* 키워드 미리보기 */}
        {keywordArray.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-ck-gray-700 ck-body-2">총 {keywordArray.length}개의 키워드</p>
            <div className="flex flex-wrap gap-2">
              {keywordArray.map((keyword, index) => (
                <span
                  key={index}
                  className="text-ck-blue-500 border-ck-blue-300 ck-caption-1 inline-flex items-center rounded-full border bg-blue-100 px-2.5 py-0.5"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-ck-gray-300 mt-2 rounded-[12px] px-4 py-2">
          <div className="ck-caption-1 text-ck-gray-700">
            <span className="ck-caption-1-bold">입력 예시: </span>
            카페추천, 디저트맛집, 강남카페
          </div>
          <div className="ck-caption-1 text-ck-gray-700">
            <span className="ck-caption-1-bold">주의사항: </span>각 키워드는 쉼표(,)로 구분하여
            입력해주세요
          </div>
        </div>
      </div>

      {/* 미션 마감일 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          미션 마감일 <span className="text-ck-red-500">*</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-ck-gray-700 size-4" />
          <Input {...register('reviewDeadlineDate')} type="date" />
        </div>
        {errors.reviewDeadlineDate && (
          <p className="text-ck-red-500 ck-caption-1">{errors.reviewDeadlineDate.message}</p>
        )}
      </div>
    </div>
  );
}
