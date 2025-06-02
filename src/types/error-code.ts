export const errorCode = {
  // 인증 관련 에러 코드
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_REFRESH_ERROR: 'TOKEN_REFRESH_ERROR',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
} as const;

export type ErrorCode = (typeof errorCode)[keyof typeof errorCode];
