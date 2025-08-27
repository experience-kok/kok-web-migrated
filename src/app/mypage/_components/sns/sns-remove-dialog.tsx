'use client';

import { useState } from 'react';

import { MinusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogButton,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteSNSPlatformMutation } from '@/service/users/users-mutation';

interface Props {
  snsId: number;
}

/**
 * SNS 삭제 다이얼로그
 */
export default function SNSRemoveDialog({ snsId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteSNSPlatform, isPending } = useDeleteSNSPlatformMutation();

  const handleSubmit = () => {
    deleteSNSPlatform(snsId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'} variant={'ghost'} className="text-white">
          <MinusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>연결을 해제할까요?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex flex-row items-center justify-end">
          <DialogClose asChild>
            <DialogButton variant="ghost">취소</DialogButton>
          </DialogClose>
          <DialogClose asChild>
            <DialogButton onClick={handleSubmit} disabled={isPending}>
              {isPending ? '해제 중...' : '해제하기'}
            </DialogButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
