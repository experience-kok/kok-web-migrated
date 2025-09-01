'use client';

import type React from 'react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AlertDialog, { AlertDialogConfig } from '@/components/shared/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  clientBusinessInfoSchema,
  type ClientBusinessInfoRegisterForm,
} from '@/schemas/client.schemas';
import { usePostBusinessInfoMutation } from '@/service/clients/clients-mutation';

export function BusinessInfoForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientBusinessInfoRegisterForm>({
    resolver: zodResolver(clientBusinessInfoSchema),
    defaultValues: {
      companyName: '',
      businessRegistrationNumber: '',
    },
  });

  const [alertDialog, setAlertDialog] = useState<AlertDialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    actionText: '',
    closeText: '',
    onAction: undefined as (() => void) | undefined,
    onClose: undefined as (() => void) | undefined,
  });

  const { mutate: postBusinessInfo, isPending } = usePostBusinessInfoMutation();

  // 사업자번호 자동 포맷팅
  const formatBusinessNumber = (value: string) => {
    // 숫자만 추출
    const numbersOnly = value.replace(/\D/g, '');

    // 10자리까지만 허용
    const truncated = numbersOnly.slice(0, 10);

    // 포맷팅: 000-00-00000
    if (truncated.length <= 3) {
      return truncated;
    } else if (truncated.length <= 5) {
      return `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
    } else {
      return `${truncated.slice(0, 3)}-${truncated.slice(3, 5)}-${truncated.slice(5)}`;
    }
  };

  const handleBusinessNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBusinessNumber(e.target.value);
    setValue('businessRegistrationNumber', formatted);
  };

  const handlePostBusinessInfo = (data: ClientBusinessInfoRegisterForm) => {
    setAlertDialog({
      isOpen: true,
      title: '클라이언트 계정을 신청할까요?',
      description: `신청 이후에 수정은 문의를 통해서만 가능해요.

      신청 결과는 이메일 또는 연락처로 전달해드릴 예정이에요.`,
      actionText: '신청하기',
      closeText: '취소',
      onAction: () =>
        postBusinessInfo(data, {
          onSuccess: () => {
            toast.success('신청이 완료됐어요.', {
              position: 'top-center',
            });
            router.push('/mypage');
          },
          onError: () => {
            toast.error('신청을 실패했어요.', {
              position: 'top-center',
            });
          },
        }),
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h2 className="ck-headline-2 font-semibold">사업자 정보 등록</h2>
        <p className="text-ck-gray-700">회사 정보를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit(handlePostBusinessInfo)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="ck-body-2-bold">
            회사명
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder="회사명을 입력해주세요"
            {...register('companyName')}
            className={errors.companyName ? 'border-destructive' : ''}
          />
          {errors.companyName && (
            <p className="text-destructive text-sm">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessRegistrationNumber">사업자번호</Label>
          <Input
            id="businessRegistrationNumber"
            type="text"
            placeholder="000-00-00000"
            value={watch('businessRegistrationNumber')}
            onChange={handleBusinessNumberChange}
            className={errors.businessRegistrationNumber ? 'border-destructive' : ''}
          />
          {errors.businessRegistrationNumber && (
            <p className="text-destructive text-sm">{errors.businessRegistrationNumber.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          {isPending ? '등록 중...' : '등록하기'}
        </Button>
      </form>

      <AlertDialog
        isOpen={alertDialog.isOpen}
        onOpenChange={open => setAlertDialog(prev => ({ ...prev, isOpen: open }))}
        title={alertDialog.title}
        description={alertDialog.description}
        actionText={alertDialog.actionText}
        closeText={alertDialog.closeText}
        onAction={alertDialog.onAction}
        onClose={alertDialog.onClose}
      />
    </div>
  );
}
