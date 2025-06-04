import z from 'zod';

// 내 정보 수정 폼 스키마
export const editFormSchema = z.object({
  nickname: z
    .string()
    .nonempty('닉네임을 입력해 주세요.')
    .min(2, { message: '닉네임은 2글자 이상 입력해 주세요.' })
    .max(8, { message: '닉네임은 8글자까지 입력할 수 있어요.' }),
  phone: z.string().regex(/^01[016789][0-9]{7,8}$/, '전화번호 형식을 확인해 주세요. (숫자만 입력)'),
  age: z
    .number({
      invalid_type_error: '나이를 입력해 주세요.',
    })
    .min(1, { message: '나이는 1살 이상부터 입력할 수 있어요.' })
    .max(100, { message: '나이는 최대 100살까지 입력할 수 있어요.' }),
  gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN'], { required_error: '성별을 선택해 주세요.' }),
});

export type EditForm = z.infer<typeof editFormSchema>;
