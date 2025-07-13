'use client';

import Link from 'next/link';

import { CampaignCard } from '@/components/shared/campaign-card-new';
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
      <CampaignCard className="flex flex-row">
        <CampaignCard.Image
          imageUrl={thumbnailUrl}
          imageAlt={`Campaign thumbnail for ${title || 'unknown'}`}
          aspectRatio={1 / 1}
          width={75}
          height={75}
          className={imageFilterClass} // grayscale 클래스 적용
        />

        <div className="flex cursor-pointer flex-col items-start px-2">
          <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
            <CampaignCard.Badge campaignType={campaignType} />
          </div>
          <CampaignCard.Title title={title} />
          <CampaignCard.ShortInfo productShortInfo={productShortInfo} />
        </div>
      </CampaignCard>
    </Link>
  );
}
