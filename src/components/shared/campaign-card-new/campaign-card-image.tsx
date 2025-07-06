import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Props {
  imageUrl: string;
  imageAlt: string;
  isLikeButton?: boolean;
}

/**
 * 캠페인 카드의 이미지 컴포넌트
 */
export default function CampaignCardImage({ imageUrl, imageAlt, isLikeButton = false }: Props) {
  return (
    <AspectRatio ratio={1 / 1}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        quality={85}
        className="rounded-lg object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
        style={{
          willChange: 'transform', // 렌더링 최적화
          backfaceVisibility: 'hidden', // 떨림 방지
          transform: 'translateZ(0)', // GPU 가속 활성화
        }}
      />
      {isLikeButton && <div className="abolute right-2 bottom-2"></div>}
    </AspectRatio>
  );
}
