import { ComponentPropsWithoutRef } from 'react';

import { Button } from '../ui/button';

type Props = ComponentPropsWithoutRef<typeof Button>;

export default function BottomButton({ children, ...rest }: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-[600px] bg-white shadow-lg">
      <div className="px-4 pt-0 pb-8">
        <div className="flex items-center gap-2">
          <Button
            size={'lg'}
            className="ck-body-1-bold mx-auto h-[53px] w-full max-w-[600px] rounded-[12px] px-6"
            {...rest}
          >
            {children}
          </Button>
        </div>
      </div>
    </div>
  );
}
