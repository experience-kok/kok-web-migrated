import { Pin } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * 카드 컴포넌트에서 사용할 좋아요(찜) 버튼 컴포넌트
 */
export default function LikeButton() {
  return (
    <Button
      variant="ghost"
      className="group relative h-9 w-9 rounded-full p-2 transition-all ease-in-out hover:bg-gray-500 md:h-8 md:w-8"
    >
      <span className="absolute inset-0 rounded-full bg-gray-500 opacity-50"></span>
      <Pin className="text-muted relative h-6 w-6" />
    </Button>
  );
}
