'use client';

import { ArrowDownUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Sort, SORT_MAP } from '@/models/campaign';

import { useURLParams } from '@/hooks/use-url-params';

/**
 * 캠페인 정렬 컴포넌트
 */
export default function CampaignSort() {
  const { updateParams, getParam } = useURLParams();

  // currentSort가 없으면 기본값으로 'latest' 사용
  const currentSort = (getParam('sort') as Sort) || 'latest';

  // 정렬 변경 함수
  const handleSortChange = (sort: Sort | '') => {
    updateParams({
      sort,
      page: '1',
    });
  };

  // 현재 선택된 정렬의 한글 텍스트
  const currentSortText = SORT_MAP[currentSort];

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="border-ck-gray-300 text-ck-gray-900 ck-body-2 flex cursor-pointer items-center gap-1 rounded-full border-[1px] px-3 py-2">
            <ArrowDownUp className="size-4" />
            <div>{currentSortText}</div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>정렬</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            {Object.entries(SORT_MAP).map(([value, label]) => (
              <DrawerClose key={value} className="w-full">
                <Button
                  className={`w-full justify-start ${currentSort === value ? 'ck-body-1-bold' : 'ck-body-1'}`}
                  variant="ghost"
                  onClick={() => handleSortChange(value as Sort)}
                >
                  {label}
                </Button>
              </DrawerClose>
            ))}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
