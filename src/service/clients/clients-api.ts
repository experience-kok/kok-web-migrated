import { fetcher } from '@/lib/fetcher';

import { PostBusinessInfoRequest } from '@/types/clients/requests';

/**
 * 사업자 정보 등록/수정
 */
export async function postBusinessInfo({
  companyName,
  businessRegistrationNumber,
}: PostBusinessInfoRequest) {
  const requestBody = {
    companyName,
    businessRegistrationNumber,
  };
  const response = await fetcher.post(`/business-info`, requestBody, {
    requiresAuth: true,
  });

  return response;
}
