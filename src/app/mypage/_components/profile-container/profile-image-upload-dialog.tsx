'use client';

import React, { PropsWithChildren, useState } from 'react';

import { Camera } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
} from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';
import { User } from '@/models/user';
import { usePatchProfileImageMutation } from '@/service/images/images-mutation';

interface Props extends PropsWithChildren {
  user: User;
}

/**
 * 프로필 이미지 업로드 다이얼로그
 */
export default function ProfileImageUploadDialog({ children, user }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: handlePatchProfile } = usePatchProfileImageMutation();

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

  // 다이얼로그가 닫힐 때 실행될 함수
  const handleCloseDialog = (open: boolean) => {
    if (!open && preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const handleAvatarClick = () => {
    // input 요소를 클릭하여 파일 선택 다이얼로그 열기
    const fileInput = document.getElementById('profile-image-input');
    fileInput?.click();
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      return;
    }

    handlePatchProfile(selectedFile);
  };

  return (
    <Dialog onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>프로필 이미지 업로드</DialogTitle>
          </DialogHeader>

          <section className="flex flex-col items-center justify-center">
            <div className="group relative">
              <div className="relative cursor-pointer" onClick={handleAvatarClick}>
                <Avatar className="h-20 w-20">
                  {preview ? (
                    <AvatarImage asChild src={preview}>
                      <Image src={preview} width={70} height={70} alt="프로필 이미지" />
                    </AvatarImage>
                  ) : user.profileImage ? (
                    <AvatarImage asChild src={user.profileImage}>
                      <Image src={user.profileImage} width={70} height={70} alt="프로필 이미지" />
                    </AvatarImage>
                  ) : null}
                  <AvatarFallback>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/public/kogi/kogi.png`}
                      width={70}
                      height={70}
                      alt="프로필 이미지"
                    />
                  </AvatarFallback>
                </Avatar>

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
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <Text size={'sm'} color="red" className="mt-2">
              JPG 또는 PNG 파일만 업로드할 수 있어요.
            </Text>
          </section>

          <DialogClose asChild>
            <Button onClick={handleSubmit} disabled={!selectedFile}>
              저장
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
