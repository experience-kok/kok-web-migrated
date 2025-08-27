import { useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogButton,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { usePostMissionReviewMutation } from '@/service/campaigns/campaigns-mutation';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  missionReviewType: 'COMPLETE' | 'REVISION';
  missionId: number;
  applicantNickname: string;
}

/**
 * 클라이언트가 유저의 미션을 검토하는 다이얼로그 컴포넌트
 */
export default function MissionReviewDialog({
  isOpen,
  onOpenChange,
  missionReviewType,
  missionId,
  applicantNickname,
}: Props) {
  const [reviewText, setReviewText] = useState('');

  const { mutate: postMissionReview, isPending } = usePostMissionReviewMutation();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = () => {
    postMissionReview({
      missionId,
      clientFeedback: missionReviewType === 'COMPLETE' ? reviewText : undefined,
      revisionReason: missionReviewType === 'REVISION' ? reviewText : undefined,
    });
  };

  const isComplete = missionReviewType === 'COMPLETE';
  const title = isComplete ? '미션 완료 검토' : '미션 수정 요청';
  const placeholder = isComplete
    ? '미션 완료에 대한 검토 의견을 작성해주세요...'
    : '수정이 필요한 부분에 대해 구체적으로 작성해주세요...';
  const actionText = isComplete ? '완료 처리' : '수정 요청';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Textarea
          id="reviewTextArea"
          value={reviewText}
          onChange={handleTextChange}
          placeholder={placeholder}
          rows={6}
          disabled={isPending}
          className="min-h-48"
        />

        <DialogFooter className="flex flex-row items-center justify-end">
          <DialogClose asChild>
            <DialogButton variant="ghost">닫기</DialogButton>
          </DialogClose>
          <DialogClose asChild>
            <DialogButton onClick={handleSubmit}>{actionText}</DialogButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
