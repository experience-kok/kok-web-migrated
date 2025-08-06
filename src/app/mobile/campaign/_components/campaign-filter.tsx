'use client';

import { useState, useEffect } from 'react';

import { SlidersHorizontal, RotateCcw } from 'lucide-react';

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
import { CampaignType, CAMPAIGN_TYPES } from '@/models/campaign';

import { useURLParams } from '@/hooks/use-url-params';

/**
 * 캠페인 필터 컴포넌트
 */
export default function CampaignFilter() {
  const { getParam, updateParams } = useURLParams();

  // 현재 URL에서 선택된 캠페인 타입들 가져오기
  const getCurrentCampaignTypes = (): CampaignType[] => {
    const campaignTypesParam = getParam('campaignTypes');
    if (!campaignTypesParam) return [];
    return campaignTypesParam.split(',') as CampaignType[];
  };

  // 로컬 상태 (드로어가 열려있는 동안의 임시 선택 상태)
  const [selectedTypes, setSelectedTypes] = useState<CampaignType[]>([]);

  // 드로어 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 드로어가 열릴 때마다 현재 URL 파라미터로 로컬 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedTypes(getCurrentCampaignTypes());
    }
  }, [isOpen]);

  // 토글 핸들러
  const handleToggle = (type: CampaignType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  // 초기화 핸들러
  const handleReset = () => {
    setSelectedTypes([]);
  };

  // 필터 적용 핸들러
  const handleApply = () => {
    if (selectedTypes.length === 0 || selectedTypes.length === CAMPAIGN_TYPES.length) {
      // 아무것도 선택하지 않았거나 전체 선택한 경우 파라미터 제거
      updateParams({
        campaignTypes: undefined,
        page: '1',
      });
    } else {
      // 선택된 타입들을 쉼표로 구분하여 설정
      updateParams({
        campaignTypes: selectedTypes.join(','),
        page: '1',
      });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <div className="border-ck-gray-300 text-ck-gray-900 ck-body-2 flex cursor-pointer items-center gap-1 rounded-full border-[1px] px-3 py-2">
          <SlidersHorizontal className="size-4" />
          <div>필터</div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>필터</DrawerTitle>
        </DrawerHeader>

        {/* 캠페인 타입 필터 */}
        <div className="px-6 pt-5 pb-4">
          <h3 className="ck-body-1-bold">캠페인 타입</h3>

          {/* Grid로 자동 개행되는 캠페인 타입 선택 */}
          <div className="mt-2 flex items-center gap-2">
            {CAMPAIGN_TYPES.map(type => (
              <div
                key={type}
                className={`ck-body-2 cursor-pointer rounded-full border-[1px] px-3 py-2 text-center transition-colors ${
                  selectedTypes.includes(type)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-ck-gray-300 text-ck-gray-900 bg-white'
                } hover:border-blue-300`}
                onClick={() => handleToggle(type)}
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <div className="flex gap-3">
            {/* 초기화 버튼 */}
            <Button
              size={'mobileBottom'}
              variant="ghost"
              className="text-ck-gray-500 flex-1 gap-0.5"
              onClick={handleReset}
            >
              <RotateCcw className="size-4" />
              초기화
            </Button>

            {/* 필터 적용 버튼 */}
            <DrawerClose asChild>
              <Button size={'mobileBottom'} className="flex-[3]" onClick={handleApply}>
                필터 적용하기
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
