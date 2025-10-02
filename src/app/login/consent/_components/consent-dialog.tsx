'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
}

export function ConsentDialog({ open, onOpenChange, title, content }: ConsentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {/* 내용이 길어질 경우를 대비해 스크롤 가능하도록 설정 */}
        <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap">{content}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="ck-body-1-bold">
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
