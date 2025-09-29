'use client';

import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';

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

interface Props {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  error?: string;
}

/**
 * 모집 기간(시작일/종료일) 선택을 위한 날짜 선택 컴포넌트입니다.
 *
 * @param {Date} props.date - 현재 선택된 날짜입니다.
 * @param {(date: Date | undefined) => void} props.setDate - 사용자가 날짜를 선택하거나 해제했을 때 호출되는 콜백 함수입니다.
 * @param {string} props.error - (선택 사항) 폼 유효성 검사 시 발생하는 에러 메시지입니다. 이 값이 존재할 경우, 인풋 필드 아래에 빨간색 텍스트로 표시됩니다.
 */
export default function SelectionDatePicker({ date, setDate, error }: Props) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="ck-interactive-scale flex items-center justify-between">
            <div>인플루언서 선정일</div>
            <div>
              {date ? (
                <div className="text-ck-gray-700 flex items-center gap-2">
                  <div className="ck-body-2">{format(date, 'yyyy-MM-dd')}</div>
                  <ChevronRight className="size-4" />
                </div>
              ) : (
                <div className="text-ck-gray-700 flex items-center gap-2">
                  <div className="ck-body-2">없음</div>
                  <ChevronRight className="size-4" />
                </div>
              )}
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="px-5 pb-10">
          <DrawerHeader>
            <DrawerTitle>인플루언서 선정일</DrawerTitle>
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

      {error && <p className="text-ck-red-500 ck-caption-1">{error}</p>}
    </>
  );
}
