'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
}

/**
 * 캠페인 등록 페이지 정보 등록 폼 컴포넌트
 */
export default function InfoForm({ onSubmit, isPending }: Props) {
  const form = useForm<CampaignCreateForm>({
    resolver: zodResolver(campaignCreateSchema),
    defaultValues: {
      campaignType: undefined,
      categoryType: undefined,
      categoryName: undefined,
      title: '',
      productShortInfo: '',
      maxApplicants: undefined,
      recruitmentStartDate: '',
      recruitmentEndDate: '',
      applicationDeadlineDate: '',
      selectionDate: '',
      reviewDeadlineDate: '',
      productDetails: '',
      selectionCriteria: '',
      missionGuide: '',
      missionKeywords: '',
      homepage: '',
      contactPhone: '',
      visitAndReservationInfo: '',
      businessAddress: '',
      businessDetailAddress: '',
      contactPerson: '',
      phoneNumber: '',
      thumbnailUrl: '',
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
    formState: { errors },
  } = form;

  const categoryType = watch('categoryType');
  const missionKeywords = watch('missionKeywords');

  const handleCategoryTypeChange = (value: CampaignCategoryType) => {
    setValue('categoryType', value);
    setValue('categoryName', '' as CampaignCategoryName);
  };

  const handleFormSubmit = (data: CampaignCreateForm) => {
    console.log('폼 제출 시작');

    const processedData = {
      ...data,
      missionKeywords: data.missionKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
        .join(', '),
    };

    console.log('제출된 데이터:', processedData);
    onSubmit(processedData);
  };

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
          handleCategoryTypeChange={handleCategoryTypeChange}
        />
      </section>

      <SplitBox />

      {/* 상세 정보 섹션 */}
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">상세 정보</p>
        <DetailInfoForm register={register} errors={errors} />
      </section>

      <SplitBox />

      {/* 미션 정보 섹션 */}
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">미션 정보</p>
        <MissionInfoForm register={register} errors={errors} missionKeywords={missionKeywords} />
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
        <Button className="w-full" size="lg" type="submit">
          {isPending ? '등록 중...' : '등록하기'}
        </Button>
      </section>
    </form>
  );
}
