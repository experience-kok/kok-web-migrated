import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';

export default function TestPage() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          Open Sheet
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-background rounded-t-2xl p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Menu</h3>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted/50"
            ></Button>
          </SheetClose>
        </div>
        <div className="grid gap-4">
          <Link
            href="#"
            className="hover:bg-muted flex items-center gap-3 rounded-md p-3 transition-colors"
            prefetch={false}
          >
            <span>Home</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-muted flex items-center gap-3 rounded-md p-3 transition-colors"
            prefetch={false}
          >
            <span>Search</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-muted flex items-center gap-3 rounded-md p-3 transition-colors"
            prefetch={false}
          >
            <span>Settings</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
