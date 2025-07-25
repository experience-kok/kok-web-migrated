/**
 * 메인 페이지 퀵 메뉴 컴포넌트
 */
export default function QuickMenu() {
  const menuItems = [
    { id: 1, name: '이용가이드', icon: 'guide' },
    { id: 2, name: '맛집', icon: 'restaurant' },
    { id: 3, name: '카페', icon: 'cafe' },
    { id: 4, name: '뷰티', icon: 'beauty' },
    { id: 5, name: '숙박', icon: 'accommodation' },
    { id: 6, name: '식품', icon: 'accommodation' },
    { id: 7, name: '화장품', icon: 'accommodation' },
    { id: 8, name: '생활용품', icon: 'accommodation' },
    { id: 9, name: '패션', icon: 'accommodation' },
    { id: 10, name: '잡화', icon: 'accommodation' },
  ];

  return (
    <div className="scrollbar-hide mb-4 flex space-x-4 overflow-x-auto px-4 whitespace-nowrap">
      {menuItems.map(item => (
        <div
          key={item.id}
          className="flex min-w-16 cursor-pointer flex-col items-center justify-center space-y-2"
        >
          {/* 아이콘 영역 - 추후 실제 아이콘으로 교체 예정 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
            <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          </div>

          {/* 메뉴 텍스트 */}
          <span className="chkok-caption text-foreground text-center">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
