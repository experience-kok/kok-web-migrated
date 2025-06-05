import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Campaign } from '@/models/campaign';

import ApplicantsCount from './applicants-count';
import CampaignTypeBadge from './campaign-type-badge';
import LikeButton from './like-button';

interface Props {
  campaign: Campaign;
}

/**
 * 캠페인 카드 컴포넌트
 */
export default function CampaignCard({ campaign }: Props) {
  const { title, thumbnailUrl, maxApplicants, currentApplicants, campaignType, productShortInfo } =
    campaign;
  return (
    <Card className="gap-2 border-none py-0 shadow-none">
      <CardContent className="group relative cursor-pointer overflow-hidden rounded-lg p-0">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={thumbnailUrl || ''}
            alt={`Campaign thumbnail for ${title || 'unknown'}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85} // 이미지 품질 조정으로 렌더링 부담 감소
            className="rounded-lg object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
            style={{
              willChange: 'transform', // 렌더링 최적화
              backfaceVisibility: 'hidden', // 떨림 방지
              transform: 'translateZ(0)', // GPU 가속 활성화
            }}
          />
        </AspectRatio>
        <div className="absolute right-2 bottom-2">
          <LikeButton />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-0">
        <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
          <CampaignTypeBadge campaignType={campaignType} />
        </div>
        <Text className="line-clamp-2">{title || '제목이 없습니다.'}</Text>
        <Text size="sm" color="muted-foreground" weight="semibold" className="mb-2">
          {productShortInfo}
        </Text>
        <ApplicantsCount maxApplicants={maxApplicants} currentApplicants={currentApplicants} />
      </CardFooter>
    </Card>
  );
}
