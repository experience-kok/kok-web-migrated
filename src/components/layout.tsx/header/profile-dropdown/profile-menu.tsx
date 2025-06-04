'use client';

import { Button } from '@/components/ui/button';

export default function ProfileMenu({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="flex w-full items-center justify-start gap-2 px-2 py-2 text-sm"
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
}
