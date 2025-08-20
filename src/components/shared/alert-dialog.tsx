import { ReactNode } from 'react';

import {
  Dialog,
  DialogButton,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;

  title?: string;
  description?: ReactNode;

  // 작업 버튼 텍스트
  actionText?: string;
  onAction?: () => void;

  // 닫기 버튼 텍스트
  closeText?: string;
  onClose?: () => void;
}

export interface AlertDialogConfig {
  isOpen: boolean;
  title?: string;
  description?: ReactNode;
  actionText?: string;
  onAction?: () => void;
  closeText?: string;
  onClose?: () => void;
}

/**
 * 사용자에게 중요한 작업 전 알림 또는 특정 작업으로 유도할 때 사용하는 다이얼로그 컴포넌트에요.
 */
export default function AlertDialog({
  isOpen,
  onOpenChange,
  trigger,
  title = '프로필 등록 후 지원할 수 있어요',
  description,
  actionText = '확인',
  onAction,
  closeText = '닫기',
  onClose,
}: Props) {
  const handleAction = () => {
    onAction?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row items-center justify-end">
          <DialogClose asChild>
            <DialogButton variant="ghost" onClick={onClose}>
              {closeText}
            </DialogButton>
          </DialogClose>
          <DialogClose asChild>
            <DialogButton onClick={handleAction}>{actionText}</DialogButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
