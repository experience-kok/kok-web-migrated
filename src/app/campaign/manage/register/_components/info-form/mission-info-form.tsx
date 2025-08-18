import { Calendar, Image as ImageIcon, Video, FileText, MapPin } from 'lucide-react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CampaignCategoryType } from '@/models/campaign';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
  control: Control<CampaignCreateForm>;
  categoryType: CampaignCategoryType | undefined;
  isAlwaysOpen: boolean;
  titleKeywords: string;
  bodyKeywords: string;
}

/**
 * 캠페인 등록 페이지 미션 정보 등록 컴포넌트
 */
export default function MissionInfoForm({
  register,
  errors,
  control,
  categoryType,
  isAlwaysOpen,
  titleKeywords,
  bodyKeywords,
}: Props) {
  // 미션 키워드를 배열로 변환
  const titleKeywordArray = titleKeywords
    ? titleKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
    : [];

  const bodyKeywordArray = bodyKeywords
    ? bodyKeywords
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
          선정된 인플루언서가 수행해야 할 구체적인 미션 내용을 작성해주세요.
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

      {/* 제목 키워드 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          제목 키워드 <span className="text-ck-red-500">*</span>
        </div>
        <div className="ck-body-2 text-ck-gray-700 mb-4">
          리뷰 제목에 반드시 포함되어야 하는 해시태그나 키워드를 쉼표(,)로 구분하여 입력해주세요.
        </div>
        <Textarea
          {...register('titleKeywords')}
          placeholder="강남맛집, 광교돈까스맛집"
          className="min-h-[100px]"
        />
        {errors.titleKeywords && (
          <p className="text-ck-red-500 ck-caption-1">{errors.titleKeywords.message}</p>
        )}

        {/* 키워드 미리보기 */}
        {titleKeywordArray.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-ck-gray-700 ck-body-2">총 {titleKeywordArray.length}개의 키워드</p>
            <div className="flex flex-wrap gap-2">
              {titleKeywordArray.map((keyword, index) => (
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
            <span className="ck-caption-1-bold">리뷰어 제목 작성 규칙: </span>
            제목 키워드 + 상품명(업장명)
          </div>
        </div>
      </div>

      {/* 본문 키워드 */}
      <div>
        <div className="ck-body-2-bold mb-1">
          본문 키워드 <span className="text-ck-red-500">*</span>
        </div>
        <div className="ck-body-2 text-ck-gray-700 mb-4">
          리뷰 본문에 반드시 포함되어야 하는 해시태그나 키워드를 쉼표(,)로 구분하여 입력해주세요.
        </div>
        <Textarea
          {...register('bodyKeywords')}
          placeholder="맛있어요, 분위기좋아요, 추천합니다"
          className="min-h-[100px]"
        />
        {errors.bodyKeywords && (
          <p className="text-ck-red-500 ck-caption-1">{errors.bodyKeywords.message}</p>
        )}

        {/* 키워드 미리보기 */}
        {bodyKeywordArray.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-ck-gray-700 ck-body-2">총 {bodyKeywordArray.length}개의 키워드</p>
            <div className="flex flex-wrap gap-2">
              {bodyKeywordArray.map((keyword, index) => (
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
            <span className="ck-caption-1-bold">리뷰어 본문 작성 규칙: </span>
            아래 키워드 중 1개 이상을 선택해 반드시 본문에 포함해주세요. 동일한 키워드는 10회 이상
            반복되지 않게 작성해주세요.
          </div>
        </div>
      </div>

      {/* 콘텐츠 요구사항 */}
      <div className="border-ck-gray-300 bg-ck-gray-50 rounded-[12px] border p-5">
        <div className="ck-body-2-bold text-ck-gray-900 mb-1">
          콘텐츠 요구사항 <span className="text-ck-red-500">*</span>
        </div>
        <div className="ck-body-2 text-ck-gray-700 mb-6">
          리뷰어가 업로드해야 하는 콘텐츠의 개수를 설정해주세요.
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4">
          {/* 이미지 수 */}
          <div>
            <div className="ck-body-2-bold mb-1">
              이미지 개수 <span className="text-ck-red-500">*</span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="text-ck-gray-700 size-4" />
              <Input
                {...register('numberOfImage', { valueAsNumber: true })}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>
            {errors.numberOfImage && (
              <p className="text-ck-red-500 ck-caption-1">{errors.numberOfImage.message}</p>
            )}

            {/* 비디오 개수 */}
            <div className="mt-3">
              <div className="ck-body-2-bold mb-1">
                비디오 개수 <span className="text-ck-red-500">*</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="text-ck-gray-700 size-4" />
                <Input
                  {...register('numberOfVideo', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </div>
              {errors.numberOfVideo && (
                <p className="text-ck-red-500 ck-caption-1">{errors.numberOfVideo.message}</p>
              )}
            </div>

            {/* 텍스트 수 */}
            <div className="mt-3">
              <div className="ck-body-2-bold mb-1">
                텍스트 수 <span className="text-ck-red-500">*</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="text-ck-gray-700 size-4" />
                <Input
                  {...register('numberOfText', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </div>
              {errors.numberOfText && (
                <p className="text-ck-red-500 ck-caption-1">{errors.numberOfText.message}</p>
              )}
            </div>
          </div>

          {/* 지도 표시 옵션 - 방문 캠페인일 때만 표시 */}
          {categoryType === '방문' && (
            <div className="border-ck-gray-200 border-t pt-4">
              <div className="flex items-center gap-3">
                <Controller
                  name="isMap"
                  control={control}
                  render={({ field }) => (
                    <Checkbox id="isMap" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <label
                  htmlFor="isMap"
                  className="ck-body-2-bold text-ck-gray-900 flex cursor-pointer items-center gap-2"
                >
                  <MapPin className="text-ck-red-500 size-4" />
                  지도 정보 포함 필수
                </label>
              </div>
              <div className="ck-caption-1 text-ck-gray-600 mt-1 ml-7">
                체크 시, 리뷰어는 반드시 위치 정보(지도)를 포함해야 합니다.
              </div>
              {errors.isMap && (
                <p className="text-ck-red-500 ck-caption-1 mt-1">{errors.isMap.message}</p>
              )}
            </div>
          )}
        </div>

        {/* 미션 시작일 - 상시 캠페인이 아닐 때만 표시 */}
        {!isAlwaysOpen && (
          <div>
            <div className="ck-body-2-bold mb-1">
              미션 시작일 <span className="text-ck-red-500">*</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-ck-gray-700 size-4" />
              <Input {...register('missionStartDate')} type="date" />
            </div>
            {errors.missionStartDate && (
              <p className="text-ck-red-500 ck-caption-1">{errors.missionStartDate.message}</p>
            )}
          </div>
        )}

        {/* 미션 마감일 - 상시 캠페인이 아닐 때만 표시 */}
        {!isAlwaysOpen && (
          <div className="mt-3">
            <div className="ck-body-2-bold mb-1">
              미션 마감일 <span className="text-ck-red-500">*</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-ck-gray-700 size-4" />
              <Input {...register('missionDeadlineDate')} type="date" />
            </div>
            {errors.missionDeadlineDate && (
              <p className="text-ck-red-500 ck-caption-1">{errors.missionDeadlineDate.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
