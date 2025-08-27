interface Props {
  maxApplicants: number | null;
  currentApplicants: number;
  isAlwaysOpen: boolean;
}

/**
 * 지원 인원 컴포넌트
 * @param maxApplicants 최대 선정 인원
 * @param currentApplicants 현재 지원 인원
 * @param isAlwaysOpen 상시 모집 여부
 * @returns
 */
export default function CampaignCardApplicantCount({
  maxApplicants,
  currentApplicants,
  isAlwaysOpen,
}: Props) {
  return (
    <div className="flex w-full items-center">
      {isAlwaysOpen ? (
        <span className="ck-caption-2 text-ck-gray-600">지원 {currentApplicants}명</span>
      ) : (
        <>
          <span className="ck-caption-2 text-ck-gray-600">지원 {currentApplicants} /&nbsp;</span>
          <span className="ck-caption-2 text-ck-gray-600">{maxApplicants}명</span>
        </>
      )}
    </div>
  );
}
