'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface Props extends React.PropsWithChildren {
  date: Date;
  setDate: (date?: Date) => void;
  title: string;
}

export default function CampaignDatePicker({ date, setDate, title, children }: Props) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent className="px-5 pb-10">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }}
          />

          <DrawerClose asChild>
            <Button
              size={'lg'}
              className="ck-body-1-bold mx-auto h-[53px] w-full max-w-[600px] rounded-[12px] px-6 transition-transform duration-150 ease-in-out active:scale-95"
            >
              선택하기
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
}
