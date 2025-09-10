import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
}

/**
 * 헤더에 사용될 검색 버튼 컴포넌트
 */
export default function SearchButton({ onClick }: Props) {
  return (
    <Button className="text-ck-gray-500 size-5" variant="ghost" onClick={onClick} aria-label="검색">
      <Search className="size-6" aria-hidden={true} />
    </Button>
  );
}
