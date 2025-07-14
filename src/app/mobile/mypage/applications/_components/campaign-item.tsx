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
        {/* 이미지 컨테이너에 flex-shrink-0 적용하여 크기 고정 */}
        <div className="flex-shrink-0">
          <CampaignCard.Image
            imageUrl={thumbnailUrl}
            imageAlt={`Campaign thumbnail for ${title || 'unknown'}`}
            width={75}
            height={75}
            className={imageFilterClass} // grayscale 클래스 적용
          />
        </div>

        {/* 텍스트 영역에 flex-1과 min-w-0 적용 */}
        <div className="flex min-w-0 flex-1 cursor-pointer flex-col items-start px-2">
          <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
            <CampaignCard.Badge campaignType={campaignType} />
          </div>
          {/* 제목이 길어질 경우를 대비한 처리 */}
          <div className="w-full">
            <CampaignCard.Title title={title} className="line-clamp-1" />
          </div>
          <div className="w-full">
            <CampaignCard.ShortInfo productShortInfo={productShortInfo} />
          </div>
        </div>
      </CampaignCard>
    </Link>
  );
}
