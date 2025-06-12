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
    <Button className="size-8 md:size-9" variant="ghost" onClick={onClick}>
      <Search className="size-6" />
    </Button>
  );
}
