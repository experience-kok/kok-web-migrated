'use client';

import { ChevronLeft } from 'lucide-react';

/**
 * 프로필 페이지 헤더 컴포넌트
 */
export default function MypageHeader() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="relative z-10 flex h-16 w-full border-b border-gray-100/50 bg-white backdrop-blur-xl">
      <div className="h-full w-full px-5">
        <div className="flex h-full w-full items-center">
          <div className="flex h-full w-full items-center">
            <button
              onClick={handleBack}
              className="flex cursor-pointer items-center justify-center"
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
