import {
  TooltipProvider,
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * 툴팁 컴포넌트
 * @param content 툴팁 내용
 * @param children 툴팁 트리거
 */
export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <TooltipPrimitive>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent>{content}</TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
