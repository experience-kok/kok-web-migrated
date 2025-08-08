'use client';

import { useState } from 'react';

import SplitBox from '@/components/ui/split-box';

import ThumbnailForm from './_components/thumbnail-form';

/**
 * 캠페인 등록 페이지
 * 클라이언트만 접근 가능한 페이지
 */
export default function CampaignRegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  return (
    <>
      <section className="px-5 pb-5">
        <p className="ck-sub-title-1 mb-2">썸네일 등록</p>
        <ThumbnailForm preview={preview} onFilechange={handleFileChange} />
      </section>

      <SplitBox />
    </>
  );
}
