'use client';

import { useEffect, useState } from 'react';

import { ArrowBigUpDashIcon } from 'lucide-react';

/**
 * 화면 상단 이동 플로팅버튼 컴포넌트
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`text-primary rounded-full bg-white p-3 shadow-lg outline transition-all duration-300 hover:bg-gray-100 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowBigUpDashIcon />
    </button>
  );
}
