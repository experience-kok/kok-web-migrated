'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { CampaignCreateForm } from '@/schemas/campaign.schemas';
import { usePostCampaignMutation } from '@/service/campaigns/campaigns-mutation';
import { PostCampaignRequest } from '@/service/campaigns/types';

import InfoForm from './_components/info-form';

export default function CampaignRegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: handlePostCampaign } = usePostCampaignMutation();

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
        companyName: formData.companyName,
        businessRegistrationNumber: formData.businessRegistrationNumber || '',
        contactPerson: formData.contactPerson,
        phoneNumber: formData.phoneNumber,
      },
    };

    handlePostCampaign({ file: selectedFile, campaignData });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 hidden lg:block">
          <h1 className="mb-2 text-center text-3xl font-bold">캠페인 등록</h1>
          <p className="text-muted-foreground text-center">새로운 체험 캠페인을 등록해보세요</p>
        </div>

        {/* 썸네일 등록 */}
        {/* <ImageUpload preview={preview} onFileChange={handleFileChange} /> */}

        {/* 기본 정보 - 폼이 자체적으로 관리됨 */}
        <InfoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
