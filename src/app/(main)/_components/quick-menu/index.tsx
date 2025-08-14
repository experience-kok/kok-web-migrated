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
    { id: 11, name: 'AAA', icon: 'accommodation' },
    { id: 12, name: 'BBB', icon: 'accommodation' },
  ];

  return (
    <div className="grid grid-cols-6 gap-x-1 gap-y-4">
      {menuItems.map(item => (
        <div
          key={item.id}
          className="flex cursor-pointer flex-col items-center justify-center space-y-2"
        >
          {/* 아이콘 영역 - 추후 실제 아이콘으로 교체 예정 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gray-300"></div>

          {/* 메뉴 텍스트 */}
          <span className="ck-caption-2 text-ck-gray-900 text-center">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
