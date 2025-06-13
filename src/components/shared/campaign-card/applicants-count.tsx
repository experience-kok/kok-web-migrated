import { Text } from '@/components/ui/text';

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
export default function ApplicatnsCount({ maxApplicants, currentApplicants }: Props) {
  return (
    <div className="flex w-full items-center">
      {/* 지원 인원 텍스트 */}
      <Text size="sm" color="foreground">
        지원 {currentApplicants} /&nbsp;
      </Text>
      <Text size="sm" color="muted-foreground">
        {maxApplicants}명
      </Text>
    </div>
  );
}
