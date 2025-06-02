import { Menu } from 'lucide-react';

/**
 * 네비게이션 메뉴에 사용할 햄버거 버튼 컴포넌트
 */
export default function HamburgerButton() {
  return <Menu className="hover:text-primary hidden h-6 w-6 cursor-pointer md:flex" />;
}
