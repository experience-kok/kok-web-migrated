import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * 헤더에 사용될 검색 버튼 컴포넌트
 */
export default function SearchButton() {
  return (
    <Button className="size-8 md:size-9" variant="ghost">
      <Search className="size-6" />
    </Button>
  );
}
