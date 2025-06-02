// 유저 권한
export const ROLE = {
  USER: '유저',
  CLIENT: '기업고객',
  ADMIN: '관리자',
} as const;
export type Role = keyof typeof ROLE;

// 유저 성별
export const GENDER = {
  MALE: '남',
  FEMALE: '여',
  UNKNOWN: '알수없음',
} as const;
export type Gender = keyof typeof GENDER;

// 유저 타입
export interface User {
  id: number;
  email: string | null;
  nickname: string;
  profileImage: string | null;
  phone: string | null;
  gender: Gender;
  age: number | null;
  role: Role;
}
