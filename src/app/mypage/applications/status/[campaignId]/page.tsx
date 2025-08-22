import { Suspense } from '@suspensive/react';

interface Props {
  params: Promise<{
    campaignId: string;
  }>;
}

/**
 * 캠페인 상태 페이지
 * 캠페인 진행 상태 및 지원자 목록 조회
 */
export default async function CampaignStatusPage({ params }: Props) {
  const { campaignId } = await params;

  return (
    <>
      {/* 캠페인 지원자 목록 조회 컴포넌트 */}
      <Suspense></Suspense>

      {/* 캠페인 지원자 목록 조회 컴포넌트 */}
      <Suspense></Suspense>
    </>
  );
}
