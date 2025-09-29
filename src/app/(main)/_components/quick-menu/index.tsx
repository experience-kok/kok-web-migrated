import Image from 'next/image';
import Link from 'next/link';

/**
 * 메인 페이지 퀵 메뉴 컴포넌트
 */
export default function QuickMenu() {
  const menuItems = [
    { id: 1, name: '이용가이드', icon: '/guide.svg' },
    {
      id: 2,
      name: '맛집',
      icon: '/restaurant.svg',
      url: `/campaign/visit?categoryName=${encodeURIComponent('맛집')}`,
    },
    {
      id: 3,
      name: '카페',
      icon: '/cafe.svg',
      url: `/campaign/visit?categoryName=${encodeURIComponent('카페')}`,
    },
    {
      id: 4,
      name: '뷰티',
      icon: '/beauty.svg',
      url: `/campaign/visit?categoryName=${encodeURIComponent('뷰티')}`,
    },
    {
      id: 5,
      name: '숙박',
      icon: '/lodge.svg',
      url: `/campaign/visit?categoryName=${encodeURIComponent('숙박')}`,
    },
    {
      id: 6,
      name: '기타',
      icon: '/another.svg',
      url: `/campaign/visit?categoryName=${encodeURIComponent('기타')}`,
    },
    // { id: 7, name: '화장품', icon: '/' },
    // { id: 8, name: '생활용품', icon: '/' },
    // { id: 9, name: '패션', icon: '/' },
    // { id: 10, name: '잡화', icon: '/' },
    // { id: 11, name: 'AAA', icon: '/' },
    // { id: 12, name: 'BBB', icon: '/' },
  ];

  return (
    <div className="grid grid-cols-6 gap-x-1 gap-y-4">
      {menuItems.map(item => (
        <Link href={item.url || '/'} key={item.id}>
          <div className="flex cursor-pointer flex-col items-center justify-center space-y-2">
            {item.icon !== '/' ? (
              <>
                {/* Image 컴포넌트의 src에 public 폴더 기준 상대 경로를 직접 전달 */}
                <Image
                  src={`/quickmenu/${item.icon}`}
                  className="ck-interactive-scale-icon"
                  width={48}
                  height={48}
                  alt={`${item.name} 아이콘`}
                  quality={100}
                  priority
                  unoptimized
                />
              </>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gray-300"></div>
            )}

            {/* 메뉴 텍스트 */}
            <span className="ck-caption-2 text-ck-gray-900 text-center">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
