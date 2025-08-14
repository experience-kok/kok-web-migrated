'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          <div className="group relative cursor-pointer">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.profileImage ?? '/kogi.png'}
                width={70}
                height={70}
                alt="프로필 이미지"
              />

              <AvatarFallback>
                <Image src={'/kogi.png'} width={70} height={70} alt="프로필 이미지" />
              </AvatarFallback>
            </Avatar>

            <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
              <Camera size={20} className="fill-muted-foreground text-white" />
            </div>
          </div>
        </ProfileImageUploadDialog>

        <div className="flex flex-col items-start">
          <span className="ck-body-1 font-bold">{user.nickname}</span>

          <Link href="/mypage/edit">
            <span className="ck-body-2 text-muted-foreground cursor-pointer underline">
              내 정보 수정
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
