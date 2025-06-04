import { User } from '@/models/user';

/**
 * 내 정보 조회 응답
 */
export interface GetUsersProfileResponse {
  user: User;
}
