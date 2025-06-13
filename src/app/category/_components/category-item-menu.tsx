import React from 'react';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}
export default function CategoryItemMenu({ children, onClick }: Props) {
  return (
    <Button size={'lg'} variant={'ghost'} className="flex justify-between p-5" onClick={onClick}>
      {children}
      <ChevronRight width={24} height={24} />
    </Button>
  );
}
