/**
 * SNS 플랫폼 등록 에러
 */
// SNS 플랫폼 등록 에러 코드
export const SNS_PLATFORMS_ERROR_CODES = {
  PLATFORM_CONNECT_ERROR: 'PLATFORM_CONNECT_ERROR',
  PLATFORM_ALREADY_CONNECTED: 'PLATFORM_ALREADY_CONNECTED',
} as const;
export type SNSPlatformsErrorCode = keyof typeof SNS_PLATFORMS_ERROR_CODES;
// SNS 플랫폼 등록 에러 메시지 매핑
export const SNS_PLATFORMS_ERROR_MESSAGE: Record<SNSPlatformsErrorCode, string> = {
  PLATFORM_CONNECT_ERROR: 'SNS 연결을 실패했어요. 유효한 주소 형식이 아니에요.',
  PLATFORM_ALREADY_CONNECTED: 'SNS 연결을 실패했어요. 이미 등록된 SNS에요.',
};
export const getSNSPlatformsErrorMessage = (errorCode: string) => {
  if (errorCode && errorCode in SNS_PLATFORMS_ERROR_CODES) {
    return SNS_PLATFORMS_ERROR_MESSAGE[errorCode as SNSPlatformsErrorCode];
  }
  return 'SNS 연결을 실패했어요.';
};
