'use client';

import { useState } from 'react';

import { ClientOnly } from '@suspensive/react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { useAuth } from '@/hooks/use-auth';
import { usePreventScroll } from '@/hooks/use-prevent-scroll'; // 스크롤 방지 훅 추가

import CampaignSearch from './campaign-search';
import HeaderLogo from './header-logo';
import LoginButton from './login-button';
import ProfileDropdown from './profile-dropdown';
import SearchButton from './search-button';

/**
 * 헤더 레이아웃 컴포넌트
 */
export default function Header() {
  const auth = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 검색 모달이 열렸을 때 스크롤 방지
  usePreventScroll({
    enabled: isSearchOpen,
    hideOverflow: true,
    preventTouch: true,
  });

  const handleClickSearchButton = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="relative z-10 flex h-16 w-full bg-white/80 backdrop-blur-xl md:h-18">
        <div className="h-full w-full px-5">
          <div className="flex h-full w-full items-center">
            <div className="flex h-full w-full items-center">
              <HeaderLogo />
            </div>
            <div className="flex items-center gap-3">
              <SearchButton onClick={handleClickSearchButton} />
              <div className="hidden md:block">
                <ClientOnly>{auth.isLoggedIn ? <ProfileDropdown /> : <LoginButton />}</ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 검색바 오버레이 */}
      {isSearchOpen && (
        <>
          {/* 전체 배경 오버레이 */}
          <div
            className="fixed inset-0 z-51 bg-black/70 backdrop-blur-md"
            onClick={handleCloseSearch}
          />

          {/* 검색바 컨테이너 */}
          <div className="pointer-events-none fixed inset-0 z-52 flex items-start justify-center p-6 pt-20">
            <div className="animate-in fade-in-0 zoom-in-95 pointer-events-auto w-full max-w-3xl transform duration-300">
              {/* 헤더 섹션 */}
              <div className="rounded-t-3xl bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text
                      as="h2"
                      color={'foreground'}
                      size={'2xl'}
                      weight={'bold'}
                      className="mb-1"
                    >
                      캠페인 검색
                    </Text>
                    <Text as="p" color={'muted-foreground'} weight={'semibold'}>
                      원하는 캠페인을 빠르게 찾아봐요
                    </Text>
                  </div>
                  <Button
                    size={'icon'}
                    variant={'ghost'}
                    onClick={handleCloseSearch}
                    className="bg-background/80 cursor-pointer rounded-full p-3 text-gray-500 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* 검색 섹션 */}
              <div className="bg-background relative flex-1 rounded-b-3xl p-8">
                <CampaignSearch onClose={handleCloseSearch} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
