'use client';

import { useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { usePostSNSPlatformMutation } from '@/service/users/users-mutation';

import { SNSPlatformType } from '@/types/users/models';

// 플랫폼 정보 매핑
const PLATFORM_INFO = {
  YOUTUBE: {
    label: '유튜브',
    placeholder: 'https://www.youtube.com/@chkok',
  },
  INSTAGRAM: {
    label: '인스타그램',
    placeholder: 'https://www.instagram.com/chkok.official/',
  },
  BLOG: {
    label: '블로그',
    placeholder: 'https://blog.naver.com/chkok',
  },
  TIKTOK: {
    label: '틱톡',
    placeholder: 'https://www.tiktok.com/@chkok',
  },
} as const;

interface Props {
  currentPlatform: SNSPlatformType;
}

/**
 * SNS 연결 다이얼로그
 */
export default function SNSConnectDialog({ currentPlatform }: Props) {
  const [snsUrl, setSnsUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: postSNSPlatform, isPending } = usePostSNSPlatformMutation();

  const handleSubmit = () => {
    if (!snsUrl.trim()) {
      return;
    }

    postSNSPlatform(
      {
        type: currentPlatform,
        url: snsUrl.trim(),
      },
      {
        onSuccess: () => {
          // 성공시 다이얼로그 닫고 상태 초기화
          setIsOpen(false);
          setSnsUrl('');
        },
      },
    );
  };

  const platformInfo = PLATFORM_INFO[currentPlatform];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'} variant={'ghost'} className="text-ck-gray-900">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{platformInfo.label} 계정 연결</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">{platformInfo.label} 주소</label>
            <Input
              placeholder={platformInfo.placeholder}
              value={snsUrl}
              onChange={e => setSnsUrl(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <DialogButton variant="ghost" onClick={() => setIsOpen(false)} className="flex-1">
              취소
            </DialogButton>
            <DialogButton
              onClick={handleSubmit}
              disabled={!snsUrl.trim() || isPending}
              className="flex-1"
            >
              {isPending ? '등록 중...' : '연결하기'}
            </DialogButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
