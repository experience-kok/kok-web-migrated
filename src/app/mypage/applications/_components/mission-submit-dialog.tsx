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
import { Input } from '@/components/ui/input';
import { usePostMissionMutation } from '@/service/campaigns/campaigns-mutation';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: number;
}

/**
 * 유저가 미션을 등록하는 다이얼로그 컴포넌트
 */
export default function MissionSubmitDialog({ isOpen, onOpenChange, campaignId }: Props) {
  const [missionUrl, setMissionUrl] = useState('');

  const { mutate: postMission, isPending } = usePostMissionMutation();

  const handleMissionUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissionUrl(e.target.value);
  };

  const handleClose = () => {
    if (!isPending) {
      setMissionUrl('');
      onOpenChange(false);
    }
  };

  const handlePostMission = () => {
    postMission(
      {
        applicationId: campaignId,
        missionUrl,
      },
      {
        onSuccess: () => {
          toast.success('미션을 등록했어요.', {
            position: 'top-center',
          });
          // 성공 시 URL 초기화 및 다이얼로그 닫기
          setMissionUrl('');
          onOpenChange(false);
        },
        onError: () => {
          toast.error('미션 등록을 실패했어요.', {
            position: 'top-center',
          });
        },
      },
    );
  };

  // missionUrl이 비어있는지 확인하는 변수
  const isMissionUrlEmpty = missionUrl.trim().length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>미션을 등록할까요?</DialogTitle>
        </DialogHeader>

        <Input
          id="reviewTextArea"
          value={missionUrl}
          onChange={handleMissionUrlChange}
          placeholder={'https://blog.naver.com'}
          disabled={isPending}
        />

        <DialogFooter className="flex flex-row items-center justify-end">
          <DialogClose asChild>
            <DialogButton variant="ghost" disabled={isPending}>
              닫기
            </DialogButton>
          </DialogClose>
          <DialogButton onClick={handlePostMission} disabled={isPending || isMissionUrlEmpty}>
            {isPending ? '등록 중...' : '등록하기'}
          </DialogButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
