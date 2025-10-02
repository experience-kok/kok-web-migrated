'use client';

import type React from 'react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AlertDialog, { AlertDialogConfig } from '@/components/shared/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FloatingInput } from '@/components/ui/floating-input';
import { Label } from '@/components/ui/label';
import { isFetcherError } from '@/lib/fetcher';
import {
  clientBusinessInfoSchema,
  type ClientBusinessInfoRegisterForm,
} from '@/schemas/client.schemas';
import { usePostBusinessInfoMutation } from '@/service/clients/clients-mutation';

import { getBusinessInfoErrorMessage } from '@/types/clients/errors';

import TermsDialog from './terms-dialog';

export function BusinessInfoForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<ClientBusinessInfoRegisterForm>({
    resolver: zodResolver(clientBusinessInfoSchema),
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      businessRegistrationNumber: '',
    },
  });

  const [termsDialog, setTermsDialog] = useState(false);

  const [alertDialog, setAlertDialog] = useState<AlertDialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    actionText: '',
    closeText: '',
  });

  const { mutate: postBusinessInfo, isPending } = usePostBusinessInfoMutation();

  // 사업자번호 자동 포맷팅
  const formatBusinessNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');
    const truncated = numbersOnly.slice(0, 10);
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
      description: `신청 이후에 수정은 문의를 통해서만 가능해요.\n\n신청 결과는 이메일 또는 연락처로 전달해드릴 예정이에요.`,
      actionText: '신청하기',
      closeText: '취소',
      onAction: () =>
        postBusinessInfo(data, {
          onSuccess: () => {
            toast.success('클라이언트 계정을 신청했어요.', {
              position: 'top-center',
            });
            router.push('/mypage');
          },
          onError: error => {
            if (isFetcherError(error) && error.data?.errorCode) {
              const errorCode = error.data.errorCode;
              const message = getBusinessInfoErrorMessage(errorCode);
              toast.error(message, {
                position: 'top-center',
              });
            }
          },
        }),
    });
  };

  return (
    <div className="">
      <div className="space-y-2">
        <h3 className="ck-sub-title-1 text-ck-gray-900 pb-10">
          사업자 정보 등록을 위해 <br />
          정보를 알려주세요
        </h3>
      </div>

      <form onSubmit={handleSubmit(handlePostBusinessInfo)} className="space-y-4">
        <div className="space-y-2">
          <FloatingInput type="text" label="회사명" {...register('companyName')} />
          {errors.companyName && (
            <p className="text-ck-red-500 ck-caption-2">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <FloatingInput
            type="text"
            label="사업자번호"
            {...register('businessRegistrationNumber')}
            onChange={handleBusinessNumberChange}
            value={watch('businessRegistrationNumber')}
          />
          {errors.businessRegistrationNumber && (
            <p className="text-ck-red-500 ck-caption-2">
              {errors.businessRegistrationNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={watch('termsAgreed')}
                onCheckedChange={checked => {
                  setValue('termsAgreed', checked === true, { shouldValidate: true });
                }}
              />
              <Label htmlFor="terms" className="cursor-pointer">
                (필수) 클라이언트 이용약관에 동의합니다.
              </Label>
            </div>
            <button
              type="button"
              onClick={() => setTermsDialog(true)}
              className="text-ck-gray-700 ck-caption-1 hover:underline"
            >
              보기
            </button>
          </div>
          {errors.termsAgreed && (
            <p className="text-ck-red-500 ck-caption-2">{errors.termsAgreed.message}</p>
          )}
        </div>

        <Button type="submit" className="ck-body-1-bold w-full" disabled={!isValid || isPending}>
          {isPending ? '등록 중...' : '등록하기'}
        </Button>
      </form>

      <TermsDialog open={termsDialog} onOpenChange={setTermsDialog} />

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
