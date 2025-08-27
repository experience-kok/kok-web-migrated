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

interface Props extends React.PropsWithChildren {
  campaignId: number;
}

/**
 * 캠페인 진행 상태 다이얼로그
 */
export default function CampaignProgressStatusDialog({ campaignId, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>캠페인 진행 상태</DialogTitle>
          <DialogDescription asChild>
            <div className="max-h-[300px] overflow-y-scroll">
              <section className="mb-4">
                <h3 className="ck-body-1-bold mb-2">현재 진행 상태</h3>
                <p className="mb-4">캠페인 ID: {campaignId}</p>
                <p>여기에 실제 진행 상태 정보를 표시합니다.</p>
              </section>

              <section>
                <h3 className="ck-body-1-bold mb-2">진행 단계</h3>
                <ul className="space-y-1" role="list">
                  <li>• 지원자 모집 완료</li>
                  <li>• 참가자 선정 완료</li>
                  <li>• 미션 진행 중</li>
                  <li>• 콘텐츠 검토 대기</li>
                </ul>
              </section>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row items-center justify-end">
          <DialogClose asChild>
            <DialogButton variant="ghost">닫기</DialogButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
