'use client';

import { useState } from 'react';

export default function CampaignRegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        {/* <InfoForm onSubmit={handleSubmit} /> */}
      </div>
    </div>
  );
}
