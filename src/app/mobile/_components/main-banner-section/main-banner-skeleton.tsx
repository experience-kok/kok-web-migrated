import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * MainBanner 컴포넌트의 스켈레톤
 */
export default function MainBannerSkeleton() {
  return (
    <div className="relative w-full">
      {/* 캐러샐 컨테이너 */}
      <div className="mx-auto w-full">
        <div className="-ml-4 flex">
          {/* 모바일: 1개, 태블릿: 2개, 데스크톱: 3개 표시 */}
          <div className="w-full pl-0 md:w-1/2 md:pl-4 lg:w-1/3">
            <AspectRatio ratio={16 / 9} className="md:rounded-lg">
              <Skeleton className="h-full w-full md:rounded-lg" />
            </AspectRatio>
          </div>

          {/* 태블릿 이상에서 2번째 아이템 */}
          <div className="hidden w-1/2 pl-4 md:block lg:w-1/3">
            <AspectRatio ratio={16 / 9} className="md:rounded-lg">
              <Skeleton className="h-full w-full md:rounded-lg" />
            </AspectRatio>
          </div>

          {/* 데스크톱에서 3번째 아이템 */}
          <div className="hidden w-1/3 pl-4 lg:block">
            <AspectRatio ratio={16 / 9} className="md:rounded-lg">
              <Skeleton className="h-full w-full md:rounded-lg" />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
}
