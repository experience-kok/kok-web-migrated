import { Pin, Share } from 'lucide-react';

import ApplicatnsCount from '@/components/shared/campaign-card/applicants-count';
import CampaignTypeBadge from '@/components/shared/campaign-card/campaign-type-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SplitBox from '@/components/ui/split-box';
import { Text } from '@/components/ui/text';
import {
  getCampaignBasicInfo,
  getCampaignDetailInfo,
  getCampaignKeywords,
  getCampaignMissionGuide,
  getCampaignThumbnail,
} from '@/service/campaigns/campaigns-api';

import CampaignThumbnail from './_components/campaign-thumbnail';

interface Props {
  params: {
    campaignId: string;
  };
}

/**
 * 캠페인 상세 페이지
 */
export default async function CampaignDetailPage({ params }: Props) {
  const { campaignId } = params;

  const { thumbnailUrl } = await getCampaignThumbnail(Number(campaignId));

  const {
    title,
    campaignType,
    currentApplicants,
    maxApplicants,
    recruitmentStartDate,
    recruitmentEndDate,
  } = await getCampaignBasicInfo(Number(campaignId));

  const { productDetails, selectionCriteria, reviewDeadlineDate, selectionDate } =
    await getCampaignDetailInfo(Number(campaignId));

  const { missionGuide } = await getCampaignMissionGuide(Number(campaignId));

  const { missionKeywords } = await getCampaignKeywords(Number(campaignId));

  // 에러 방지를 위한 안전한 키워드 파싱
  const parsedMissionKeywords = Array.isArray(missionKeywords)
    ? missionKeywords
        .filter(keyword => keyword && typeof keyword === 'string') // null, undefined, 빈 문자열 필터링
        .map(keyword => `#${keyword.trim()}`) // 공백 제거 후 # 추가
    : [];

  return (
    <div className="bg-gray-50">
      <div className="mx-auto min-h-screen max-w-[720px] bg-white">
        {/* Product Image Section */}
        <div className="relative">
          <div className="relative aspect-square bg-gray-50">
            <CampaignThumbnail thumnailUrl={thumbnailUrl} />
          </div>

          <div className="absolute right-4 bottom-4 flex gap-2" style={{ marginTop: '120px' }}>
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
              <Pin className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
              <Share className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 px-6 py-5">
          <CampaignTypeBadge campaignType={campaignType} />

          <div>
            <Text as="h1" size={'xl'} weight={'bold'} className="leading-tight">
              {title}
            </Text>
            <ApplicatnsCount currentApplicants={currentApplicants} maxApplicants={maxApplicants} />
          </div>

          <div>
            <Text>캠페인 모집 기간 &nbsp;</Text>
            <Text>
              {recruitmentStartDate} ~ {recruitmentEndDate}
            </Text>
          </div>
        </div>

        <SplitBox className="h-2" />

        {/* Campaign Information Section */}
        <div className="space-y-4 px-6 py-5">
          <Text as="h2" size={'lg'} weight={'bold'}>
            📅 주요 일정
          </Text>

          {/* 모집기간 */}
          <div className="flex items-center justify-between">
            <div>
              <Text as="h3" weight={'medium'} className="mb-1">
                인플루언서 발표
              </Text>
              <Text as="p" size={'sm'} color={'foreground'}>
                {selectionDate}
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Text as="h3" weight={'medium'} className="mb-1">
                리뷰제출 마감일
              </Text>
              <Text as="p" size={'sm'} color={'foreground'}>
                {reviewDeadlineDate}
              </Text>
            </div>
          </div>

          {/* 제공 제품 */}
          <Text as="h2" size={'lg'} weight={'bold'}>
            🎁 제공 제품
          </Text>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <Text as="p" size={'sm'}>
                {productDetails}
              </Text>
            </div>
          </div>

          {/* 신청조건 */}
          <Text as="h2" size={'lg'} weight={'bold'}>
            ✅ 신청조건
          </Text>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <Text as="p" size={'sm'}>
                {selectionCriteria}
              </Text>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">⚠️ 주의사항:</span> 허위 정보 기재 시 선발에서 제외될 수
              있어요.
            </p>
          </div>
        </div>

        <SplitBox className="h-2" />

        <div className="space-y-4 px-6 py-5">
          {/* 미션 가이드 */}
          <Text as="h2" size={'lg'} weight={'bold'}>
            📌 미션 가이드
          </Text>
          <div>{missionGuide}</div>
        </div>

        <Separator />

        <div className="space-y-4 px-6 py-5">
          <Text as="h2" size={'lg'} weight={'bold'}>
            💬 키워드
          </Text>
          <Text as="p" weight={'semibold'}>
            키워드를 콘텐츠에 포함해주세요
          </Text>

          {/* 키워드 표시 개선 */}
          {parsedMissionKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {parsedMissionKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <Text as="p" size="sm" color="muted">
              키워드가 없습니다.
            </Text>
          )}
        </div>
        <SplitBox className="h-2" />

        <div className="px-6 py-5">
          <Text as="h2" size={'lg'} weight={'bold'} className="mb-4">
            📅 추가 안내사항
          </Text>

          <Text as="p">- 업체 요청에 따라 선정 인원이 변경될 수 있어요.</Text>
          <Text as="p">- 온라인 리뷰는 신청한 SNS 계정에 업로드 후 6개월간 유지해야 해요.</Text>
          <Text as="p">
            - 제공받은 제품은 교환, 판매, 양도가 불가해요. 적발시 캠페인 참여가 제한될 수 있어요.
          </Text>
          <Text as="p">- SNS 게시물 작성시 경제적 대가관계를 표기해주세요.</Text>
        </div>
      </div>
    </div>
  );
}
