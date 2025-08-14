'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  preview: string | null;
  profileImage: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 내 정보 수정 페이지의 유저 아바타 컴포넌트
 */
export default function ProfileAvatar({ preview, profileImage, onFileChange }: Props) {
  const handleAvatarClick = () => {
    // input 요소를 클릭하여 파일 선택 다이얼로그 열기
    const fileInput = document.getElementById('profile-image-input');
    fileInput?.click();
  };

  return (
    <section className="flex flex-col items-center justify-center py-10">
      <div className="group relative">
        <div className="relative cursor-pointer" onClick={handleAvatarClick}>
          <Avatar className="h-20 w-20">
            {preview ? (
              <AvatarImage asChild src={preview}>
                <Image src={preview} width={70} height={70} alt="프로필 이미지" />
              </AvatarImage>
            ) : profileImage ? (
              <AvatarImage asChild src={profileImage}>
                <Image src={profileImage} width={70} height={70} alt="프로필 이미지" />
              </AvatarImage>
            ) : null}
            <AvatarFallback>
              <Image src={'/kogi.svg'} width={70} height={70} alt="프로필 이미지" />
            </AvatarFallback>
          </Avatar>

          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

          {/* 카메라 아이콘 */}
          <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
            <Camera size={20} className="fill-muted-foreground text-white" />
          </div>
        </div>

        {/* 숨겨진 파일 입력 */}
        <input
          id="profile-image-input"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      <div className="ck-body-1-bold text-ck-gray-700">프로필 이미지 등록</div>
      <div className="ck-caption-1 text-ck-red-500">JPG 또는 PNG 파일만 업로드할 수 있어요.</div>
    </section>
  );
}
