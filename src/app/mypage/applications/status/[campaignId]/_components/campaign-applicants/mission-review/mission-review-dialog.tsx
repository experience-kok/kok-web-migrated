import { useState } from 'react';

import { toast } from 'sonner';

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
    if (!reviewText.trim()) {
      toast.error('검토 의견을 입력해주세요.');
      return;
    }

    postMissionReview(
      {
        missionId,
        clientFeedback: missionReviewType === 'COMPLETE' ? reviewText : undefined,
        revisionReason: missionReviewType === 'REVISION' ? reviewText : undefined,
      },
      {
        onSuccess: () => {
          const infoMessage =
            missionReviewType === 'COMPLETE'
              ? `${applicantNickname}님의 미션을 완료처리했어요.`
              : `${applicantNickname}님에게 수정 요청을 보냈어요.`;
          toast.success(infoMessage, {
            position: 'top-center',
          });

          // 성공 시 텍스트 초기화하고 모달 닫기
          setReviewText('');
          onOpenChange(false);
        },
        onError: () => {
          toast.error(`${applicantNickname}의 미션 처리를 실패했어요. 잠시 후 다시 시도해주세요.`, {
            position: 'top-center',
          });
        },
      },
    );
  };

  const handleClose = () => {
    if (!isPending) {
      setReviewText('');
      onOpenChange(false);
    }
  };

  const isComplete = missionReviewType === 'COMPLETE';
  const title = isComplete ? '미션 완료 검토' : '미션 수정 요청';
  const placeholder = isComplete
    ? `${applicantNickname}님에게 미션 완료에 대한 검토 의견을 작성해주세요...`
    : `${applicantNickname}님에게 수정이 필요한 부분에 대해 구체적으로 작성해주세요...`;
  const actionText = isComplete ? '완료 처리' : '수정 요청';

  // 버튼 비활성화 조건: 로딩 중이거나 텍스트가 비어있을 때
  const isSubmitDisabled = isPending || !reviewText.trim();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
            <DialogButton variant="ghost" disabled={isPending}>
              닫기
            </DialogButton>
          </DialogClose>
          <DialogButton onClick={handleSubmit} disabled={isSubmitDisabled}>
            {isPending ? '처리 중...' : actionText}
          </DialogButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
