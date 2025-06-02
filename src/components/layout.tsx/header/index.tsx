'use client';

import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';
import HeaderSecondNav from './header-second-nav';
import SearchButton from './search-button';

/**
 * 헤더 레이아웃 컴포넌트
 */
export default function Header() {
  return (
    <>
      <header className="flex h-14 w-full bg-white md:h-16 md:border-b-[1px] md:border-gray-200">
        <div className="h-full w-full px-6 lg:px-16">
          <div className="flex h-full w-full items-center">
            <div className="flex h-full w-full items-center">
              <HeaderLogo />
              <HeaderNav />
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                {/* <ClientOnly>{auth.isLoggedIn ? <UserAvatar /> : <LoginButton />}</ClientOnly> */}
              </div>
              <SearchButton />
            </div>
          </div>
        </div>
      </header>
      <HeaderSecondNav />
    </>
  );
}
