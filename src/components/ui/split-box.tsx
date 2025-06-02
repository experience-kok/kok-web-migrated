import { cn } from '@/lib/utils';

/**
 * 상하 여백 띄우는 박스 컴포넌트
 * @description 높이는 class로 넘겨주어야함
 */
export default function SplitBox({ className }: React.ComponentProps<'div'>) {
  return <div className={cn('w-full bg-gray-100', className)} />;
}
