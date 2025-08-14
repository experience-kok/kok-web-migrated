'use client';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * 내 정보 수정 페이지 스켈레톤 컴포넌트
 * ProfileAvatar와 ProfileForm을 합친 스켈레톤
 */
export default function ProfileEditContainerSkeleton() {
  return (
    <div className="flex flex-col">
      {/* ProfileAvatar 스켈레톤 */}
      <section className="flex flex-col items-center justify-center py-10">
        <div className="group relative">
          <div className="relative">
            {/* 아바타 스켈레톤 */}
            <Skeleton className="h-20 w-20 rounded-full" />
            
            {/* 카메라 아이콘 위치 스켈레톤 */}
            <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* 프로필 이미지 등록 텍스트 스켈레톤 */}
        <Skeleton className="mt-2 h-4 w-32" />
        
        {/* 파일 업로드 안내 텍스트 스켈레톤 */}
        <Skeleton className="mt-1 h-3 w-48" />
      </section>

      {/* ProfileForm 스켈레톤 */}
      <div className="flex flex-col items-center gap-6 px-6">
        {/* 닉네임 필드 */}
        <div className="grid w-full items-center gap-1.5">
          <Skeleton className="h-4 w-16" /> {/* 라벨 */}
          <Skeleton className="h-12 w-full" /> {/* 입력 필드 */}
        </div>

        {/* 전화번호 필드 */}
        <div className="grid w-full items-center gap-1.5">
          <Skeleton className="h-4 w-20" /> {/* 라벨 */}
          <Skeleton className="h-12 w-full" /> {/* 입력 필드 */}
        </div>

        {/* 나이 필드 */}
        <div className="grid w-full items-center gap-1.5">
          <Skeleton className="h-4 w-8" /> {/* 라벨 */}
          <Skeleton className="h-12 w-full" /> {/* 입력 필드 */}
        </div>

        {/* 성별 필드 */}
        <div className="grid w-full items-center gap-1.5">
          <Skeleton className="h-4 w-10" /> {/* 라벨 */}
          <div className="flex items-center gap-6">
            {/* 라디오 버튼 3개 */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" /> {/* 라디오 버튼 */}
                <Skeleton className="h-4 w-10" /> {/* 라벨 텍스트 */}
              </div>
            ))}
          </div>
        </div>

        {/* 수정하기 버튼 */}
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}