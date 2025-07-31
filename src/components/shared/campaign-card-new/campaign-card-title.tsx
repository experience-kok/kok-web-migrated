import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
}

/**
 * 캠페인 카드의 제목 컴포넌트
 */
export default function CampaignCardTitle({ title, className }: Props) {
  return <p className={cn('ck-body-2 line-clamp-2', className)}>{title}</p>;
}
