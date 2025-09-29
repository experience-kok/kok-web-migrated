'use client';
import { useCallback } from 'react';

import { CreditCard, FolderPen, HelpCircle, LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { useLogoutMutation } from '@/service/auth/auth-mutation';

import { useAuth } from '@/hooks/use-auth';

import ProfileMenu from './profile-menu';

/**
 * 헤더 영역 프로필 드롭다운 버튼 컴포넌트
 */
export default function ProfileDropdown() {
  const router = useRouter();
  const auth = useAuth();

  const { mutate: handleLogout } = useLogoutMutation();

  // 프로필 페이지 이동
  const handleRouteToProfilePage = useCallback(() => {
    router.push('/mypage');
  }, [router]);

  // 캠페인 관리 페이지 이동
  const handleRoouteToCampaignManagePage = useCallback(() => {
    router.push('/campaign/manage');
  }, [router]);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage asChild src={auth.user?.profileImage ?? undefined}>
            <Image src={auth.user?.profileImage || ''} alt="logo" width={40} height={40} />
          </AvatarImage>
          <AvatarFallback>
            <Image
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/public/kogi/kogi.png`}
              width={70}
              height={70}
              alt="프로필 이미지"
            />
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-44 p-2">
        <div className="flex flex-col gap-1">
          <ProfileMenu
            icon={<User size={16} />}
            label="내 정보"
            onClick={handleRouteToProfilePage}
          />
          <ProfileMenu
            icon={<FolderPen size={16} />}
            label="캠페인 관리"
            onClick={handleRoouteToCampaignManagePage}
          />
          <Separator />
          <ProfileMenu icon={<Settings size={16} />} label="설정" />
          <ProfileMenu icon={<CreditCard size={16} />} label="결제 관리" />
          <ProfileMenu icon={<HelpCircle size={16} />} label="도움말" />
          <ProfileMenu icon={<LogOut size={16} />} label="로그아웃" onClick={handleLogout} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
