'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogButton,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SplitBox from '@/components/ui/split-box';
import { CampaignCategoryName, CampaignCategoryType } from '@/models/campaign';
import { CampaignCreateForm, campaignCreateSchema } from '@/schemas/campaign.schemas';

import BasicInfoForm from './basic-info-form';
import CompanyInfoForm from './company-info-form';
import DetailInfoForm from './detail-info-form';
import MissionInfoForm from './mission-info-form';
import VisitInfoForm from './visit-info-form';

interface Props {
  onSubmit: SubmitHandler<CampaignCreateForm>;
  isPending: boolean;
  hasSelectedFile: boolean; // 썸네일 파일 선택 여부
}

/**
 * 캠페인 등록 페이지 정보 등록 폼 컴포넌트
 */
export default function InfoForm({ onSubmit, isPending, hasSelectedFile }: Props) {
  const form = useForm<CampaignCreateForm>({
    resolver: zodResolver(campaignCreateSchema),
    mode: 'onChange', // 실시간 검증을 위해 추가
    defaultValues: {
      // 상시 캠페인 여부
      isAlwaysOpen: false,

      // 기본 정보
      campaignType: undefined,
      title: '',
      productShortInfo: '',
      maxApplicants: undefined,
      productDetails: '',

      // 날짜 정보
      recruitmentStartDate: '',
      recruitmentEndDate: '',
      selectionDate: '',
      selectionCriteria: '',

      // 카테고리 정보
      categoryType: undefined,
      categoryName: undefined,

      // 미션 정보
      titleKeywords: '',
      bodyKeywords: '',
      numberOfVideo: 0,
      numberOfImage: 0,
      numberOfText: 0,
      isMap: false,
      missionGuide: '',
      missionStartDate: '',
      missionDeadlineDate: '',

      // 업체 정보
      contactPerson: '',
      phoneNumber: '',

      // 방문 정보
      homepage: '',
      contactPhone: '',
      visitAndReservationInfo: '',
      businessAddress: '',
      businessDetailAddress: '',
      lat: undefined,
      lng: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = form;

  const categoryType = watch('categoryType');
  const titleKeywords = watch('titleKeywords');
  const bodyKeywords = watch('bodyKeywords');
  const isAlwaysOpen = watch('isAlwaysOpen');

  const handleCategoryTypeChange = (value: CampaignCategoryType) => {
    setValue('categoryType', value);
    setValue('categoryName', '' as CampaignCategoryName);
  };

  const handleFormSubmit = (data: CampaignCreateForm) => {
    console.log('폼 제출 시작');

    const processedData = {
      ...data,
      titleKeywords: data.titleKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
        .join(', '),
      bodyKeywords: data.bodyKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
        .join(', '),
    };

    onSubmit(processedData);
  };

  // 버튼 비활성화 조건: 폼이 유효하지 않거나, 썸네일이 선택되지 않거나, 등록 중일 때
  const isSubmitDisabled = !isValid || !hasSelectedFile || isPending;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 사업체 정보 섹션 */}
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">사업체 정보</p>
        <CompanyInfoForm register={register} errors={errors} />
      </section>

      <SplitBox />

      {/* 캠페인 정보 섹션 */}
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">캠페인 정보</p>
        <BasicInfoForm
          register={register}
          control={control}
          errors={errors}
          categoryType={categoryType}
          isAlwaysOpen={isAlwaysOpen}
          handleCategoryTypeChange={handleCategoryTypeChange}
        />
      </section>

      <SplitBox />

      {/* 상세 정보 섹션 */}
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">상세 정보</p>
        <DetailInfoForm register={register} errors={errors} isAlwaysOpen={isAlwaysOpen} />
      </section>

      <SplitBox />

      {/* 미션 정보 섹션 */}
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">미션 정보</p>
        <MissionInfoForm
          register={register}
          errors={errors}
          control={control}
          categoryType={categoryType}
          isAlwaysOpen={isAlwaysOpen}
          titleKeywords={titleKeywords}
          bodyKeywords={bodyKeywords}
        />
      </section>

      {/* 방문 정보 섹션 - 카테고리 타입이 "방문"일 때만 표시 */}
      {categoryType === '방문' && (
        <>
          <SplitBox />
          <section className="px-5 pt-8 pb-5">
            <p className="ck-sub-title-1 mb-2">방문 정보</p>
            <VisitInfoForm register={register} errors={errors} setValue={setValue} />
          </section>
        </>
      )}

      <section className="px-5 pb-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg" disabled={isSubmitDisabled}>
              {isPending ? '등록 중...' : '등록하기'}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>캠페인을 등록할까요?</DialogTitle>
              <DialogDescription asChild>
                <div className="max-h-[300px] overflow-y-scroll">
                  <section className="mb-4">
                    <h3 className="ck-body-1-bold mb-2">등록 후 수정이 불가한 항목</h3>
                    <ul className="space-y-1" role="list">
                      <li>• 담당자명</li>
                      <li>• 연락처</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="ck-body-1-bold mb-2">지원자가 없는 경우에만 수정 가능한 항목</h3>
                    <ul className="space-y-1" role="list">
                      <li>• 캠페인 타입</li>
                      <li>• 카테고리 타입</li>
                      <li>• 카테고리</li>
                      <li>• 제품 서비스 간략 정보</li>
                      <li>• 캠페인 모집 시작일</li>
                      <li>• 캠페인 모집 종료일</li>
                      <li>• 제공 제품/서비스 상세 정보</li>
                      <li>• 선정 기준</li>
                      <li>• 참가자 발표일</li>
                      <li>• 미션 가이드</li>
                      <li>• 미션 키워드</li>
                      <li>• 미션 시작일</li>
                      <li>• 미션 마감일</li>
                    </ul>
                  </section>
                </div>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-row items-center justify-end">
              <DialogClose asChild>
                <DialogButton variant="ghost">취소</DialogButton>
              </DialogClose>
              <DialogClose asChild>
                <DialogButton onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitDisabled}>
                  {isPending ? '등록 중...' : '등록하기'}
                </DialogButton>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </form>
  );
}
