import { useRef, useState } from 'react';

import { Upload } from 'lucide-react';
import Image from 'next/image';

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

interface Props {
  preview: string | null; // 미리보기 이미지
  onFilechange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 캠페인 등록 페이지 썸네일 등록 컴포넌트
 */
export default function ThumbnailForm({ preview, onFilechange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // 파일 확장자 검증 함수
  const validateFileExtension = (file: File): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension || '');
  };

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (validateFileExtension(file)) {
        // 올바른 확장자인 경우 부모 컴포넌트의 핸들러 호출
        onFilechange(e);
      } else {
        // 올바르지 않은 확장자인 경우 에러 모달 표시
        setIsErrorModalOpen(true);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  };

  // 이미지 업로드 컨테이너 클릭시 인풋 태그 클릭되도록 하는 함수
  const handleClickImageContainer = () => {
    inputRef.current?.click();
  };

  return (
    <>
      {/* 혹시 사용자가 JPG, PNG가 아닌 다른 확장자의 이미지를 업로드 했을 경우 */}
      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>등록할 수 없는 이미지 형식이에요</DialogTitle>
            <DialogDescription>JPG 또는 PNG 형식의 이미지로 다시 등록해주세요.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row items-center justify-end">
            <DialogClose asChild>
              <DialogCheckTextButton>확인</DialogCheckTextButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            onClick={handleClickImageContainer}
            className="absolute right-4 bottom-4 bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            이미지 변경
          </Button>
        </div>
      ) : (
        <div
          className="border-ck-blue-500/20 cursor-pointer rounded-[12px] border-2 border-dashed p-5 text-center"
          onClick={handleClickImageContainer}
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

      {/* 숨겨진 파일 업로드 인풋 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
