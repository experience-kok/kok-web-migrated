import { Upload } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface Props {
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ThumbnailForm({ preview, onFileChange }: Props) {
  const handleClickImageContainer = () => {
    const fileInput = document.getElementById('thumbnail-image-input');
    fileInput?.click();
  };

  return (
    <section className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            썸네일 등록
          </CardTitle>
        </CardHeader>
        <CardContent>
          {preview ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
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
              className="border-primary/20 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center"
              onClick={handleClickImageContainer}
            >
              <div className="space-y-4">
                <Upload className="text-primary/50 mx-auto h-12 w-12" />
                <div>
                  <p className="text-lg font-medium">캠페인 대표 이미지를 업로드하세요</p>
                  <div className="flex flex-col items-center">
                    <Text size={'sm'} color="red">
                      JPG 또는 PNG 파일만 업로드할 수 있어요.
                    </Text>
                    <Text size={'sm'} color={'red'}>
                      권장 사이즈는 720px x 720px 이에요.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 숨겨진 파일 입력 */}
          <input
            id="thumbnail-image-input"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onFileChange}
            className="hidden"
          />
        </CardContent>
      </Card>
    </section>
  );
}
