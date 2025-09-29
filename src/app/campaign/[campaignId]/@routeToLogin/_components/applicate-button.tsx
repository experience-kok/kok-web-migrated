'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import AlertDialog, { AlertDialogConfig } from '@/components/shared/alert-dialog';
import BottomButton from '@/components/shared/bottom-button';

export default function ApplicateButton() {
  const router = useRouter();
  const [alertDialog, setAlertDialog] = useState<AlertDialogConfig>({
    isOpen: false,
  });

  const handleClickApplicateButton = () => {
    setAlertDialog(prev => ({
      ...prev,
      isOpen: true,
    }));
  };

  const routeToLoginPage = () => {
    router.push('/login');
  };

  return (
    <>
      <BottomButton onClick={handleClickApplicateButton}>지원하기</BottomButton>

      <AlertDialog
        isOpen={alertDialog.isOpen}
        onOpenChange={open => setAlertDialog(prev => ({ ...prev, isOpen: open }))}
        title={'로그인 페이지로 이동할까요?'}
        description={'캠페인 지원은 로그인이 필요한 서비스에요.'}
        actionText={'이동하기'}
        onAction={routeToLoginPage}
        closeText="취소"
      />
    </>
  );
}
