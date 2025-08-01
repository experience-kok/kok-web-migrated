import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils'; // className 유틸리티 함수 (없다면 clsx나 직접 구현)

interface Props {
  imageUrl: string;
  imageAlt: string;
  isLikeButton?: boolean;
  width?: number;
  height?: number;
  aspectRatio?: number;
  className?: string; // 추가된 prop
}

/**
 * 캠페인 카드의 이미지 컴포넌트
 */
export default function CampaignCardImage({
  imageUrl,
  imageAlt,
  isLikeButton = false,
  width,
  height,
  aspectRatio = 1 / 1,
  className,
}: Props) {
  // 기본 이미지 클래스
  const baseImageClasses =
    'rounded-lg object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110';

  // className prop과 기본 클래스를 결합
  const imageClasses = cn(baseImageClasses, className);

  // width와 height가 모두 제공된 경우 AspectRatio 없이 사용
  if (width && height) {
    return (
      <div className="relative overflow-hidden rounded-[12px]" style={{ width, height }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={width}
          height={height}
          quality={85}
          className={cn(baseImageClasses, className)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // CSS로 명시적 설정
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            borderRadius: '12px',
          }}
        />
        {isLikeButton && <div className="absolute right-2 bottom-2"></div>}
      </div>
    );
  }

  // AspectRatio를 사용하는 경우 (기본값 또는 커스텀 비율)
  return (
    <AspectRatio ratio={aspectRatio}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        quality={85}
        className={imageClasses}
        style={{
          willChange: 'transform', // 렌더링 최적화
          backfaceVisibility: 'hidden', // 떨림 방지
          transform: 'translateZ(0)', // GPU 가속 활성화
          borderRadius: '12px',
        }}
      />
      {isLikeButton && <div className="absolute right-2 bottom-2"></div>}
    </AspectRatio>
  );
}
