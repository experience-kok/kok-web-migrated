// HTTP 요청 성공 응답
export interface SuccessResponse<T> {
  data: T;
  status: number;
  message: string;
  success: true;
}

// HTTP 요청 실패 응답
export interface ErrorResponse {
  errorCode: string;
  status: number;
  message: string;
  success: false;
}
