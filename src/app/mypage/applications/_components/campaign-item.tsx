'use client';

import Link from 'next/link';

import { CampaignCard } from '@/components/shared/campaign-card-new';
import { Button } from '@/components/ui/button';
import { CampaignApplicationStatus, CampaignType } from '@/models/campaign';

interface Props {
  id: number;
  thumbnailUrl: string;
  title: string;
  productShortInfo: string;
  campaignType: CampaignType;
  applicationStatus: CampaignApplicationStatus;
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
  applicationStatus,
  grayscale = false,
}: Props) {
  console.log({
    id,
    thumbnailUrl,
    title,
    productShortInfo,
    campaignType,
    applicationStatus,
    grayscale,
  });

  // 이미지 필터 클래스 생성
  const imageFilterClass = grayscale ? 'filter grayscale' : '';

  // APPROVED 상태일 때만 버튼 활성화
  const isButtonEnabled = applicationStatus === 'APPROVED';

  // 지원자 보기 버튼 클릭 핸들러
  const handleApplicantsClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Link의 기본 동작(라우팅) 방지
    e.stopPropagation(); // 이벤트 버블링 방지

    if (!isButtonEnabled) return; // 비활성화 상태면 실행하지 않음

    console.log('t');
  };

  return (
    <Link href={`/campaign/${id}`}>
      <CampaignCard className="flex flex-row transition-transform duration-150 active:scale-95">
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

        {isButtonEnabled && (
          <div className="flex items-center">
            <Button
              variant="secondary"
              onClick={handleApplicantsClick}
              className="ck-body-2 transition-transform duration-150 active:scale-95"
            >
              진행상태
            </Button>
          </div>
        )}
      </CampaignCard>
    </Link>
  );
}
