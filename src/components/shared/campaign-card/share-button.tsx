import { Share2 } from 'lucide-react';

/**
 * 카드컴포넌트에서 사용할 공유 버튼 컴포넌트
 */
export default function ShareButton() {
  return (
    <>
      <Share2 className="h-6 w-6 cursor-pointer transition-all ease-in-out hover:text-blue-500" />
    </>
  );
}
