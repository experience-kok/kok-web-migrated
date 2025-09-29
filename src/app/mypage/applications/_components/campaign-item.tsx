'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { CampaignCard } from '@/components/shared/campaign-card-new';
import { Button } from '@/components/ui/button';

import { CampaignApplicationStatus, CampaignType } from '@/types/campaigns/models';

import MissionSubmitDialog from './mission-submit-dialog';

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
  const router = useRouter();
  const [isMissionDialogOpen, setIsMissionDialogOpen] = useState(false);
  const isPending = applicationStatus === 'PENDING';

  // 이미지 필터 클래스 생성
  const imageFilterClass = grayscale ? 'filter grayscale' : '';

  // APPROVED 상태일 때만 버튼 활성화 (클라이언트만 진행 상태 확인)
  const 진행상태_버튼_활성화 = applicationStatus === 'APPROVED';

  // SELECTED 상태일 때만 버튼 활성화 (유저만 미션 등록 가능)
  const 미션등록_버튼_활성화 = applicationStatus === 'SELECTED';

  // 진행상태 버튼 클릭 핸들러
  const handleProgressStatusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/mypage/applications/status/${id}`);
  };

  // 미션등록 버튼 클릭 핸들러
  const handleMissionButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMissionDialogOpen(true);
  };

  // 카드 전체 클릭 시 상세로 이동 (PENDING이면 이동 차단)
  const handleCardClick = () => {
    if (isPending) return;
    router.push(`/campaign/${id}`);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        <CampaignCard
          className={`ck-interactive-scale flex flex-row ${isPending ? 'cursor-not-allowed' : ''}`}
        >
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

          {진행상태_버튼_활성화 && (
            <div className="flex items-center" onClick={handleProgressStatusClick}>
              <Button variant="secondary" className="ck-body-2">
                진행상태
              </Button>
            </div>
          )}

          {미션등록_버튼_활성화 && (
            <div className="flex items-center" onClick={handleMissionButtonClick}>
              <Button variant="secondary" className="ck-body-2">
                미션 등록
              </Button>
            </div>
          )}
        </CampaignCard>
      </div>

      <MissionSubmitDialog
        isOpen={isMissionDialogOpen}
        onOpenChange={setIsMissionDialogOpen}
        campaignId={id}
      />
    </>
  );
}
