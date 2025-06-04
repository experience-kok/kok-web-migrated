'use client';

import { useState } from 'react';

import { EditForm } from '@/schemas/profile.schemas';
import { usePutProfileMutation } from '@/service/users/users-mutation';
import { useGetUsersProfile } from '@/service/users/users-query';

import ProfileAvatar from './profile-avatar';
import ProfileForm from './profile-form';

export default function ProfileEditContainer() {
  const {
    data: { user: user },
  } = useGetUsersProfile();

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: handlePutProfile } = usePutProfileMutation();

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

  const handleSubmit = (formData: EditForm) => {
    if (!selectedFile) {
      return;
    }

    handlePutProfile({ file: selectedFile, userData: formData });
  };

  return (
    <>
      <ProfileAvatar
        preview={preview}
        onFileChange={handleFileChange}
        profileImage={user.profileImage}
      />
      <ProfileForm
        defaultValues={{
          nickname: user.nickname,
          phone: user.phone ?? '',
          gender: user.gender,
          age: user.age ?? 0,
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
