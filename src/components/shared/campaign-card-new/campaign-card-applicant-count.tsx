interface Props {
  maxApplicants: number;
  currentApplicants: number;
}

/**
 * 지원 인원 컴포넌트
 * @param maxApplicants 최대 선정 인원
 * @param currentApplicants 현재 지원 인원
 * @returns
 */
export default function CampaignCardApplicantCount({ maxApplicants, currentApplicants }: Props) {
  return (
    <div className="flex w-full items-center">
      <span className="chkok-text-sm text-foreground">지원 {currentApplicants} /&nbsp;</span>
      <span className="chkok-text-sm text-foreground">{maxApplicants}명</span>
    </div>
  );
}
