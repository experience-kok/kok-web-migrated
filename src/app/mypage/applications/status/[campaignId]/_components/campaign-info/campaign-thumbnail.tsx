import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Props {
  thumnailUrl: string;
}

/**
 * 캠페인 썸네일 컴포넌트
 * @returns
 */
export default function CampaignThumbnail({ thumnailUrl }: Props) {
  return (
    <AspectRatio ratio={1 / 1}>
      <Image
        src={thumnailUrl}
        alt={`캠페인 이미지`}
        fill
        quality={85}
        style={{
          willChange: 'transform', // 렌더링 최적화
          backfaceVisibility: 'hidden', // 떨림 방지
          transform: 'translateZ(0)', // GPU 가속 활성화
          borderRadius: '12px',
        }}
      />
    </AspectRatio>
  );
}
