'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import SplitBox from '@/components/ui/split-box';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';
import { usePostCampaignMutation } from '@/service/campaigns/campaigns-mutation';
import { PostCampaignRequest } from '@/service/campaigns/types';

import InfoForm from './_components/info-form';
import ThumbnailForm from './_components/thumbnail-form';

/**
 * 캠페인 등록 페이지
 * 클라이언트만 접근 가능한 페이지
 */
export default function CampaignRegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: handlePostCampaign, isPending } = usePostCampaignMutation();

  // 이미지 변경 함수
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // !TODO alert 대신 모달이나 토스트로 변경 필요
    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      alert('JPG 또는 PNG 파일만 업로드할 수 있어요.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setSelectedFile(file);
  };

  const handleSubmit = (formData: CampaignCreateForm) => {
    if (!selectedFile) {
      toast.error('썸네일 이미지를 선택해주세요.', {
        position: 'top-center',
      });
      return;
    }

    // 미션 키워드를 배열로 변환
    const missionKeywords = formData.missionKeywords
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);

    const campaignData: Omit<PostCampaignRequest, 'thumbnailUrl'> = {
      campaignType: formData.campaignType,
      title: formData.title,
      productShortInfo: formData.productShortInfo,
      maxApplicants: formData.maxApplicants,
      productDetails: formData.productDetails,
      recruitmentStartDate: formData.recruitmentStartDate,
      recruitmentEndDate: formData.recruitmentEndDate,
      applicationDeadlineDate: formData.applicationDeadlineDate,
      selectionDate: formData.selectionDate,
      reviewDeadlineDate: formData.reviewDeadlineDate,
      selectionCriteria: formData.selectionCriteria,
      missionGuide: formData.missionGuide,
      missionKeywords: missionKeywords,
      category: {
        type: formData.categoryType,
        name: formData.categoryName,
      },
      companyInfo: {
        contactPerson: formData.contactPerson,
        phoneNumber: formData.phoneNumber,
      },
    };

    // 카테고리 타입이 '방문'일 때만 visitInfo 추가
    if (formData.categoryType === '방문') {
      // !TODO 타입 수정 필요
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (campaignData as any).visitInfo = {
        ...(formData.homepage && { homepage: formData.homepage }), // 선택적 필드
        contactPhone: formData.contactPhone,
        visitAndReservationInfo: formData.visitAndReservationInfo,
        businessAddress: formData.businessAddress,
        businessDetailAddress: formData.businessDetailAddress,
        lat: formData.lat,
        lng: formData.lng,
      };
    }

    handlePostCampaign({ file: selectedFile, campaignData });
  };

  return (
    <>
      <section className="px-5 pt-8 pb-5">
        <p className="ck-sub-title-1 mb-2">썸네일 등록</p>
        <ThumbnailForm preview={preview} onFilechange={handleFileChange} />
      </section>

      <SplitBox />

      <InfoForm onSubmit={handleSubmit} isPending={isPending} />
    </>
  );
}
