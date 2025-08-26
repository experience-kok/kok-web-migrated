import { Suspense } from '@suspensive/react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { MissionHistoryListSkeleton } from './mission-history-card-skeleton';
import MissionHistoryList from './mission-history-list';

interface Props {
  userId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  applicantNickname?: string;
}

/**
 * 미션 이력 다이얼로그
 */
export default function MissionHistoryDialog({
  userId,
  isOpen,
  onOpenChange,
  applicantNickname,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>{applicantNickname}님의 미션 이력</DialogTitle>
        </DialogHeader>

        <Suspense fallback={<MissionHistoryListSkeleton />}>
          <MissionHistoryList userId={userId} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
