import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CampaignCardBaseProps = React.PropsWithChildren & {
  className?: string;
};

/**
 * 캠페인 카드 베이스 컴포넌트
 * @description 캠페인 카드 베이스 컴포넌트이며 카드의 내용 컴포넌트를 렌더링합니다.
 */
export default function CampaignCardBase({ children, className }: CampaignCardBaseProps) {
  return <Card className={cn('gap-2 border-none py-0 shadow-none', className)}>{children}</Card>;
}
