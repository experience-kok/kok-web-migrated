import { ReactNode } from 'react';

import {
  Dialog,
  DialogCheckTextButton,
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
}

export interface InfoDialogConfig {
  isOpen: boolean;
  title?: string;
  description?: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

/**
 * 사용자에게 단순 알림 메시지를 렌더링하는 컴포넌트에요.
 */
export default function InfoDialog({
  isOpen,
  onOpenChange,
  trigger,
  title = '프로필 등록 후 지원할 수 있어요',
  description,
  actionText = '확인',
  onAction,
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
            <DialogCheckTextButton onClick={handleAction}>{actionText}</DialogCheckTextButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
