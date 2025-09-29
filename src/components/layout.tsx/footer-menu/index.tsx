'use client';

import React from 'react';

import { House, Menu, UserRound } from 'lucide-react';

import { useScrollDirection } from '@/hooks/use-scroll-direction';

import MenuItem from './menu-item';

/**
 * 모바일 전용 하단 메뉴
 */
export default function FooterMenu() {
  const scrollDirection = useScrollDirection();

  const menus: {
    icon: React.ReactNode;
    title: string;
    url: string;
    ariaLabel: string;
  }[] = [
    {
      icon: <Menu className="h-6 w-6" />,
      title: '카테고리',
      url: '/category',
      ariaLabel: '카테고리 페이지로 이동',
    },
    // {
    //   icon: <Users className="h-6 w-6" />,
    //   title: '커뮤니티',
    //   url: '/커뮤니티',
    //   ariaLabel: '커뮤니티 페이지로 이동',
    // },
    {
      icon: <House className="h-6 w-6" />,
      title: '홈',
      url: '/',
      ariaLabel: '메인 페이지로 이동',
    },
    // {
    //   icon: <Heart className="h-6 w-6" />,
    //   title: '찜',
    //   url: '/찜',
    //   ariaLabel: '찜 페이지로 이동',
    // },
    {
      icon: <UserRound className="h-6 w-6" />,
      title: '마이',
      url: '/mypage',
      ariaLabel: '마이 페이지로 이동',
    },
  ];

  return (
    <div className="">
      {/* 모바일 환경에서 ScrollToTopButton을 푸터 메뉴 위에 고정 */}
      {/* <div
        className={`fixed right-4 transition-all duration-300 ${scrollDirection === 'down' ? 'bottom-4' : 'bottom-20'}`}
      >
        <ScrollToTopButton />
      </div> */}
      <div
        className={`fixed right-0 bottom-0 left-0 mx-auto h-15 w-full max-w-[600px] border-t bg-white transition-transform duration-300 ${
          scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <ul className="flex h-full items-center justify-around">
          {menus.map((menu, index) => (
            <MenuItem
              icon={menu.icon}
              url={menu.url}
              key={menu.title + index}
              ariaLabel={menu.ariaLabel}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
