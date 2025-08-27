/**
 * 캠페인 지원 에러
 */
// 캠페인 지원 에러 코드
export const CAMPAIGN_APPLICATION_ERROR_CODES = {
  PROFILE_INCOMPLETE: 'PROFILE_INCOMPLETE', // 프로필 미완성
  SNS_CONNECTION_REQUIRED: 'SNS_CONNECTION_REQUIRED', // SNS 계정 연동 필요
  PLATFORM_MISMATCH: 'PLATFORM_MISMATCH', // 플랫폼 불일치
  INSUFFICIENT_ROLE: 'INSUFFICIENT_ROLE', // 권한 부족 (기업 회원)
} as const;
export type CampaignApplicationErrorCode = keyof typeof CAMPAIGN_APPLICATION_ERROR_CODES;
// 캠페인 지원 에러 타이틀 매핑
export const CAMPAIGN_APPLICATION_ERROR_TITLE: Record<CampaignApplicationErrorCode, string> = {
  PROFILE_INCOMPLETE: '프로필 등록 후 지원할 수 있어요',
  SNS_CONNECTION_REQUIRED: 'SNS 계정 연결 후 지원할 수 있어요',
  PLATFORM_MISMATCH: '지원할 수 없는 캠페인이에요',
  INSUFFICIENT_ROLE: '기업 회원은 캠페인 지원이 불가해요',
};
export const getCampaignApplicationErrorTitle = (errorCode?: string) => {
  if (errorCode && errorCode in CAMPAIGN_APPLICATION_ERROR_CODES) {
    return CAMPAIGN_APPLICATION_ERROR_TITLE[errorCode as CampaignApplicationErrorCode];
  }
  return '캠페인 지원을 실패했어요';
};
// 캠페인 지원 에러 메시지 매핑
export const CAMPAIGN_APPLICATION_ERROR_MESSAGES: Record<CampaignApplicationErrorCode, string> = {
  PROFILE_INCOMPLETE: '캠페인 지원을 위해 프로필을 완성해주세요.', // 프로필 설정 페이지로 이동
  SNS_CONNECTION_REQUIRED: '캠페인 지원을 위해 SNS 계정을 연결해주세요.',
  PLATFORM_MISMATCH:
    '등록하신 SNS 계정으로는 지원할 수 없는 캠페인이에요. 캠페인이 요구하는 SNS 계정을 연결하러 갈까요?',
  INSUFFICIENT_ROLE: '일반 회원 계정으로 다시 시도해 주세요.',
};
export const getCampaignApplicationErrorMessage = (errorCode?: string) => {
  if (errorCode && errorCode in CAMPAIGN_APPLICATION_ERROR_CODES) {
    return CAMPAIGN_APPLICATION_ERROR_MESSAGES[errorCode as CampaignApplicationErrorCode];
  }
  return '캠페인 지원을 실패했어요. 잠시 후 다시 시도해 주세요.';
};
