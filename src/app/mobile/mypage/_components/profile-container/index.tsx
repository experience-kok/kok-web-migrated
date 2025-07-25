'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Tooltip from '@/components/shared/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetUsersProfile } from '@/service/users/users-query';

import ProfileImageUploadDialog from './profile-image-upload-dialog';

/**
 * 내 정보 프로필 컨테이너 컴포넌트
 * /mypage
 */
export default function ProfileContainer() {
  const {
    data: { user: user },
  } = useGetUsersProfile();

  return (
    <section className="px-4 py-6">
      <div className="flex items-center gap-5">
        <ProfileImageUploadDialog user={user}>
          <Tooltip content="프로필 이미지 변경">
            <div className="group relative cursor-pointer">
              <Avatar className="h-20 w-20">
                <AvatarImage asChild src={user.profileImage ?? undefined}>
                  <Image
                    src={user.profileImage ?? '/kogi.svg'}
                    width={70}
                    height={70}
                    alt="프로필 이미지"
                  />
                </AvatarImage>

                <AvatarFallback>
                  <Image src={'/kogi.svg'} width={70} height={70} alt="프로필 이미지" />
                </AvatarFallback>
              </Avatar>

              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
                <Camera size={20} className="fill-muted-foreground text-white" />
              </div>
            </div>
          </Tooltip>
        </ProfileImageUploadDialog>

        <div className="flex flex-col items-start">
          <span className="chkok-text-lg font-bold">{user.nickname}</span>

          <Link href="/mobile/mypage/edit">
            <span className="chkok-text-md text-muted-foreground cursor-pointer underline">
              내 정보 수정
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
