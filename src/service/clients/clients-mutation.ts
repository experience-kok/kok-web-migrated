import { useMutation } from '@tanstack/react-query';

import { postBusinessInfo } from './clients-api';

/**
 * 사업자 정보 등록/수정 뮤테이션
 */
export function usePostBusinessInfoMutation() {
  return useMutation({
    mutationFn: postBusinessInfo,
  });
}
