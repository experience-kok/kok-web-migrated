export interface Menu {
  title: string;
  url: string;
}

// 메뉴 데이터 매핑
export const routeMenu: Menu[] = [
  {
    title: '홈',
    url: '/',
  },
  {
    title: '로그인',
    url: '/login',
  },
  {
    title: '내 정보',
    url: '/mypage',
  },
  {
    title: '내 정보 수정',
    url: '/mypage/edit',
  },
  {
    title: '캠페인',
    url: '/campaign',
  },
  {
    title: '캠페인 관리',
    url: '/campaign/manage',
  },
  {
    title: '캠페인 등록',
    url: '/campaign/manage/register',
  },
];

// 서브 메뉴 목록
export const subMenu: Menu[] = [
  { title: '홈', url: '/' },
  { title: '메뉴1', url: '/1' },
  { title: '메뉴2', url: '/2' },
  { title: '메뉴3', url: '/3' },
  { title: '메뉴4', url: '/4' },
];
