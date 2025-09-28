'use client';

// useEffect를 import 목록에 추가합니다.
import React, { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import BottomButton from '@/components/shared/bottom-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogCheckTextButton,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePostPresignedUrlMutation } from '@/service/campaigns/campaigns-mutation';

import { ThumbnailData, thumbnailSchema } from '../_schemas/company-register-schemas';

interface Props {
  context: any;
  onNext: (data: ThumbnailData) => void;
}

/**
 * 썸네일 업로드 스텝 컴포넌트
 */
export default function ThumbnailInfoStep({ context, onNext }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setValue, getValues } = useForm<ThumbnailData>({
    resolver: zodResolver(thumbnailSchema),
    defaultValues: {
      thumbnailUrl: '',
    },
    mode: 'onChange',
  });

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: postPresignedUrl, isPending } = usePostPresignedUrlMutation();

  const handleChangeImageClick = () => {
    inputRef.current?.click();
  };

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 메모리 누수 방지를 위해 기존 preview URL 해제
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    // 파일 선택을 취소한 경우, 상태 초기화
    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      setValue('thumbnailUrl', '', { shouldValidate: true });
      return;
    }

    setSelectedFile(file);

    const localPreviewUrl = URL.createObjectURL(file);
    setPreview(localPreviewUrl);

    setValue('thumbnailUrl', localPreviewUrl, { shouldValidate: true });
  };

  const handleClickNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }

    postPresignedUrl(selectedFile, {
      onSuccess: thumbnailUrl => {
        setValue('thumbnailUrl', thumbnailUrl, { shouldValidate: true });
        onNext(getValues());
      },
      onError: () => {
        setIsErrorModalOpen(true);
      },
    });
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <div className="px-5">
        <div className="ck-title pt-5 pb-10">
          캠페인을 대표할 <br />
          썸네일을 등록해주세요
        </div>

        {preview ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-[12px]">
            <Image
              fill
              src={preview}
              alt="Preview"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleChangeImageClick}
              className="absolute right-4 bottom-4 bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              이미지 변경
            </Button>
          </div>
        ) : (
          <div
            className="border-ck-blue-500/20 cursor-pointer rounded-[12px] border-2 border-dashed p-5 text-center"
            onClick={handleChangeImageClick}
            role="button"
            tabIndex={0}
            aria-label="캠페인 대표 이미지 업로드"
          >
            <Upload className="text-ck-blue-500 mx-auto h-12 w-12" />
            <div className="mt-4">
              <p className="ck-sub-title-1">캠페인 대표 이미지를 업로드해주세요</p>
              <div className="flex flex-col items-center">
                <p className="ck-caption-1 text-ck-red-500">
                  JPG 또는 PNG 파일만 업로드할 수 있어요.
                </p>
                <p className="ck-caption-1 text-ck-red-500">권장 사이즈는 720px x 720px 이에요.</p>
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />

        <BottomButton
          type="button"
          onClick={handleClickNextStep}
          disabled={!selectedFile || isPending}
        >
          {isPending ? '썸네일 등록중...' : '다음으로'}
        </BottomButton>
      </div>

      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이미지 등록을 실패했어요</DialogTitle>
            <DialogDescription>잠시 후 다시 시도해주세요.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row items-center justify-end">
            <DialogClose asChild>
              <DialogCheckTextButton>확인</DialogCheckTextButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
