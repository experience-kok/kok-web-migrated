interface Props {
  currentApplicants: number; // 현재 신청 인원 수
  maxApplicants: number; // 최대 선정 인원 수
}

/**
 * 캠페인 상세 페이지 지원자 수 컴포넌트
 */
export default function CampaignApplicant({ currentApplicants, maxApplicants }: Props) {
  const 신청인원수가_최대인원수보다_크다 = currentApplicants > maxApplicants;

  return (
    <div className="ck-caption-2 text-ck-gray-600">
      <span>지원&nbsp;</span>
      <span className={신청인원수가_최대인원수보다_크다 ? 'text-ck-blue-500 font-bold' : ''}>
        {currentApplicants}&nbsp;
      </span>
      <span>/&nbsp;{maxApplicants}명</span>
    </div>
  );
}
