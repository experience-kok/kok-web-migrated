'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Gender } from '@/models/user';
import { EditForm, editFormSchema } from '@/schemas/profile.schemas';

interface Props {
  defaultValues: {
    nickname: string;
    phone: string;
    gender: Gender;
    age: number;
  };
  onSubmit: (data: EditForm) => void;
  isPending: boolean;
}

/**
 * 내 정보 수정 페이지의 유저 정보 수정 폼 컴포넌트
 */
export default function ProfileForm({ defaultValues, onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues,
  });

  const isSubmitDisabled = isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="items-center space-y-3 px-6">
      <div className="grid w-full items-center">
        <div className="ck-body-2-bold mb-1">
          닉네임 <span className="text-ck-red-500">*</span>
        </div>
        <Input {...register('nickname', { required: true })} />
        {errors.nickname && (
          <p className="text-ck-red-500 ck-caption-1">{errors.nickname.message}</p>
        )}
      </div>

      <div className="grid w-full items-center">
        <div className="ck-body-2-bold mb-1">
          전화번호 <span className="text-ck-red-500">*</span>
        </div>
        <Input {...register('phone', { required: true })} />
        {errors.phone && <p className="text-ck-red-500 ck-caption-1">{errors.phone.message}</p>}
      </div>

      <div className="grid w-full items-center">
        <div className="ck-body-2-bold mb-1">
          나이 <span className="text-ck-red-500">*</span>
        </div>
        <Input type="number" {...register('age', { required: true, valueAsNumber: true })} />
        {errors.age && <p className="text-ck-red-500 ck-caption-1">{errors.age.message}</p>}
      </div>

      <div className="grid w-full items-center">
        <div className="ck-body-2-bold mb-1">
          성별 <span className="text-ck-red-500">*</span>
        </div>
        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              className="flex items-center"
              onValueChange={field.onChange}
              value={field.value}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MALE" id="MALE" />
                <Label htmlFor="MALE">남성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FEMALE" id="FEMALE" />
                <Label htmlFor="FEMALE">여성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="UNKNOWN" id="UNKNOWN" />
                <Label htmlFor="UNKNOWN">비공개</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.gender && <p className="text-ck-red-500 ck-caption-1">{errors.gender.message}</p>}
      </div>

      <Button className="mt-5 w-full" size="lg" type="submit" disabled={isSubmitDisabled}>
        {isPending ? '수정중...' : '수정하기'}
      </Button>
    </form>
  );
}
