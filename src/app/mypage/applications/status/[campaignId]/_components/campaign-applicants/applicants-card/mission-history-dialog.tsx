import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  applicantNickname?: string;
}

/**
 * 미션 이력 다이얼로그
 */
export default function MissionHistoryDialog({ isOpen, onOpenChange, applicantNickname }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{applicantNickname}님의 미션 이력</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 미션 이력 목록이 들어갈 자리 */}
          <div className="py-8 text-center text-gray-500">
            미션 이력을 불러오는 중...
            {/* 실제 구현 시 미션 이력 API 호출 후 데이터 표시 */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
