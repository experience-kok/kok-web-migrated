'use client';

import { ChevronLeft } from 'lucide-react';

/**
 * 캠페인 페이지 헤더 컴포넌트
 */
export default function CampaignHeader() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="relative z-10 flex h-16 w-full border-b border-gray-100/50 bg-white/80 backdrop-blur-xl md:h-18">
      <div className="h-full w-full px-4 lg:px-16">
        <div className="flex h-full w-full items-center">
          <div className="flex h-full w-full items-center">
            <button
              onClick={handleBack}
              className="flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100/50"
              aria-label="뒤로가기"
            >
              <ChevronLeft className="text-ck-gray-900" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
