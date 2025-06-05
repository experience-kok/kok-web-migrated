import Image from 'next/image';

import ApplicatnsCount from '@/components/shared/campaign-card/applicants-count';
import CampaignTypeBadge from '@/components/shared/campaign-card/campaign-type-badge';
import LikeButton from '@/components/shared/campaign-card/like-button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Campaign } from '@/models/campaign';

interface Props {
  campaign: Campaign;
  ranking: number;
}

/**
 * 랭킹 캠페인 카드 컴포넌트
 */
export default function RankCampaignCard({ campaign, ranking }: Props) {
  const {
    title,
    thumbnailUrl,
    maxApplicants,
    currentApplicants,
    campaignType,
    applicationDeadlineDate,
  } = campaign;

  // 남은 날짜 계산
  const daysRemaining = Math.ceil(
    (new Date(applicationDeadlineDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <Card className="flex-row gap-2 border-none py-0 shadow-none">
      <CardContent className="group relative h-[115px] w-[115px] cursor-pointer overflow-hidden rounded-lg p-0 md:h-[105px] md:w-[105px] lg:h-[135px] lg:w-[135px]">
        <AspectRatio ratio={1 / 1} className="h-full w-full">
          <Image
            src={thumbnailUrl || ''}
            alt={`Campaign thumbnail for ${title || 'unknown'}`}
            fill
            sizes="115px"
            quality={85} // 이미지 품질 조정으로 렌더링 부담 감소
            className="rounded-lg object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
            style={{
              willChange: 'transform', // 렌더링 최적화
              backfaceVisibility: 'hidden', // 떨림 방지
              transform: 'translateZ(0)', // GPU 가속 활성화
            }}
          />
        </AspectRatio>
        <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-md bg-black/70">
          <Text className="text-white" size="sm" weight="bold">
            {ranking}
          </Text>
        </div>
        <div className="absolute right-2 bottom-2">
          <LikeButton />
        </div>
      </CardContent>
      <CardFooter className="flex-1 flex-col items-start justify-start px-4">
        <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
          <CampaignTypeBadge campaignType={campaignType} />
        </div>
        <Text className="line-clamp-1">{title}</Text>
        <div className="mb-2 flex flex-col gap-1">
          <Text className="line-clamp-1" size="sm" color="muted-foreground" weight="semibold">
            {campaign.productShortInfo}
          </Text>
          <Text size="sm" color="primary" weight="bold">
            {daysRemaining > 0 ? `${daysRemaining}일 남음` : '마감'}
          </Text>
        </div>
        <div className="flex w-full justify-end">
          <ApplicatnsCount currentApplicants={currentApplicants} maxApplicants={maxApplicants} />
        </div>
      </CardFooter>
    </Card>
  );
}
