'use client';

import Image from 'next/image';
import Link from 'next/link';

import CampaignTypeBadge from '@/components/shared/campaign-card/campaign-type-badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { CampaignType } from '@/models/campaign';

interface Props {
  id: number;
  thumbnailUrl: string;
  title: string;
  productShortInfo: string;
  campaignType: CampaignType;
  /** 이미지를 흑백으로 표시할지 여부 */
  grayscale?: boolean;
}

/**
 * 지원 목록 캠페인 아이템
 */
export default function CampaignItem({
  id,
  thumbnailUrl,
  title,
  productShortInfo,
  campaignType,
  grayscale = false,
}: Props) {
  console.log({
    id,
    thumbnailUrl,
    title,
    productShortInfo,
    campaignType,
    grayscale,
  });

  // 이미지 필터 클래스 생성
  const imageFilterClass = grayscale ? 'filter grayscale' : '';

  return (
    <Link href={`/campaign/${id}`}>
      <Card className="flex-row gap-2 border-none py-0 shadow-none">
        <CardContent className="group relative h-[115px] w-[115px] cursor-pointer overflow-hidden rounded-lg p-0 md:h-[105px] md:w-[105px] lg:h-[135px] lg:w-[135px]">
          <AspectRatio ratio={1 / 1} className="h-full w-full">
            <Image
              src={thumbnailUrl || ''}
              alt={`Campaign thumbnail for ${title || 'unknown'}`}
              fill
              sizes="115px"
              quality={85} // 이미지 품질 조정으로 렌더링 부담 감소
              className={`rounded-lg object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110 ${imageFilterClass}`}
              style={{
                willChange: 'transform', // 렌더링 최적화
                backfaceVisibility: 'hidden', // 떨림 방지
                transform: 'translateZ(0)', // GPU 가속 활성화
              }}
            />
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex-1 cursor-pointer flex-col items-start justify-start gap-2 px-4">
          <CampaignTypeBadge campaignType={campaignType} />
          <div className="flex flex-col">
            <Text className="line-clamp-1">{title}</Text>
            <Text className="line-clamp-1" size="sm" color="muted-foreground" weight="semibold">
              {productShortInfo}
            </Text>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
