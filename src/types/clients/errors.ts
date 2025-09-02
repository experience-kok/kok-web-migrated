/**
 * 클라이언트 지원 에러
 */
// 클라이언트 지원 에러 코드
export const BUSINESS_INFO_ERROR_CODES = {
  ALREADY_REGISTERED: 'ALREADY_REGISTERED', // 이미 신청한 상태
} as const;
export type BusinessInfoErrorCode = keyof typeof BUSINESS_INFO_ERROR_CODES;
//
export const BUSINESS_INFO_ERROR_MESSAGE: Record<BusinessInfoErrorCode, string> = {
  ALREADY_REGISTERED: '이미 클라이언트 계정을 신청했어요.',
};
// 클라이언트 지원 에러 메시지 매핑
export const getBusinessInfoErrorMessage = (errorCode?: string) => {
  if (errorCode && errorCode in BUSINESS_INFO_ERROR_CODES) {
    return BUSINESS_INFO_ERROR_MESSAGE[errorCode as BusinessInfoErrorCode];
  }

  return '클라이언트 계정 신청을 실패했어요.';
};
