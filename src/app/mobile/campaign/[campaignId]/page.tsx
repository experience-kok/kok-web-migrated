import CampaignTypeBadge from '@/components/shared/campaign-card/campaign-type-badge';
import SplitBox from '@/components/ui/split-box';
import {
  getCampaignBasicInfo,
  getCampaignDetailInfo,
  getCampaignKeywords,
  getCampaignMissionGuide,
  getCampaignThumbnail,
} from '@/service/campaigns/campaigns-api';

import CampaignApplicant from './_components/campaign-applicant';
import CampaignBasicInfo from './_components/campaign-basic-info';
import CampaignThumbnail from './_components/campaign-thumbnail';

interface Props {
  params: Promise<{
    campaignId: string;
  }>;
}

/**
 * 캠페인 상세 페이지
 */
export default async function CampaignDetailPage({ params }: Props) {
  const { campaignId } = await params;

  // 캠페인 썸네일 이미지 주소
  const { thumbnailUrl } = await getCampaignThumbnail(Number(campaignId));

  // 캠페인 기본 정보
  const {
    title,
    campaignType,
    currentApplicants,
    maxApplicants,
    recruitmentStartDate,
    recruitmentEndDate,
  } = await getCampaignBasicInfo(Number(campaignId));

  // 캠페인 주요 일정
  const { productDetails, selectionCriteria, reviewDeadlineDate, selectionDate } =
    await getCampaignDetailInfo(Number(campaignId));

  // 캠페인 미션 가이드
  const { missionGuide } = await getCampaignMissionGuide(Number(campaignId));

  // 캠페인 미션 키워드
  const { missionKeywords } = await getCampaignKeywords(Number(campaignId));

  // 캠페인 키워드
  const parsedMissionKeywords = Array.isArray(missionKeywords)
    ? missionKeywords
        .filter(keyword => keyword && typeof keyword === 'string') // null, undefined, 빈 문자열 필터링
        .map(keyword => `#${keyword.trim()}`) // 공백 제거 후 # 추가
    : [];

  return (
    <>
      {/* 캠페인 썸네일 이미지 */}
      <section className="relative aspect-square">
        <CampaignThumbnail thumnailUrl={thumbnailUrl} />
      </section>

      {/* 캠페인 기본 정보 - 캠페인 타입, 지원자 수, 캠페인 모집 기간 */}
      <section className="px-5 py-5">
        <CampaignTypeBadge campaignType={campaignType} />

        <div className="mt-2">
          <p className="ck-title">{title}</p>

          <CampaignApplicant currentApplicants={currentApplicants} maxApplicants={maxApplicants} />

          <div className="mt-2">
            <span>캠페인 모집 기간 &nbsp;</span>
            <span>
              {recruitmentStartDate} ~ {recruitmentEndDate}
            </span>
          </div>
        </div>
      </section>

      <SplitBox />

      {/* 캠페인 주요 일정 - 인플루언서 발표일, 리뷰 제출 마감일 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">주요 일정</div>

        <div className="ck-body-2-bold mt-2">인플루언서 발표일</div>
        <div className="ck-body-2 text-ck-gray-700">{selectionDate}</div>

        <div className="ck-body-2-bold mt-3">리뷰 제출 마감일</div>
        <div className="ck-body-2 text-ck-gray-700">{reviewDeadlineDate}</div>
      </section>

      <SplitBox />

      {/* 캠페인 제공 제품 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">제공 제품</div>

        <div className="ck-body-2 text-ck-gray-700 mt-2">{productDetails}</div>
      </section>

      <SplitBox />

      {/* 캠페인 지원 조건 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">지원 조건</div>

        <div className="ck-body-2 text-ck-gray-700 mt-2">{selectionCriteria}</div>

        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="ck-caption-2 text-yellow-800">
            <span className="font-medium">⚠️ 주의사항:</span> 허위 정보 기재 시 선발에서 제외될 수
            있어요.
          </p>
        </div>
      </section>

      <SplitBox />

      {/* 캠페인 미션 가이드 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">미션 가이드</div>

        <div className="ck-body-2 text-ck-gray-700 mt-2">{missionGuide}</div>
      </section>

      <SplitBox />

      {/* 캠페인 미션 키워드 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">키워드</div>
        <div className="mt-2">아래 키워드를 콘텐츠에 포함해주세요.</div>

        {/* 키워드 표시 개선 */}
        {parsedMissionKeywords.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
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
          <p className="text-ck-gray-700 ck-body-2 mt-3">키워드가 없습니다.</p>
        )}
      </section>

      <SplitBox />

      {/* 캠페인 기본 정보 */}
      <CampaignBasicInfo />

      <SplitBox />

      {/* 추가 안내사항 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">안내사항</div>

        <div className="mt-2">
          <p className="ck-body-2 flex items-start">
            <span className="bg-ck-gray-900 mt-2 mr-2 h-1 w-1 flex-shrink-0 rounded-full"></span>
            <span>업체 요청에 따라 선정 인원이 변경될 수 있어요.</span>
          </p>
          <p className="ck-body-2 flex items-start">
            <span className="bg-ck-gray-900 mt-2 mr-2 h-1 w-1 flex-shrink-0 rounded-full"></span>
            <span>온라인 리뷰는 지원한 SNS 계정에 업로드 후 6개월간 유지해야 해요.</span>
          </p>
          <p className="ck-body-2 flex items-start">
            <span className="bg-ck-gray-900 mt-2 mr-2 h-1 w-1 flex-shrink-0 rounded-full"></span>
            <span>
              제공받은 제품은 교환, 판매, 양도가 불가해요. 적발시 캠페인 참여가 제한될 수 있어요.
            </span>
          </p>
          <p className="ck-body-2 flex items-start">
            <span className="bg-ck-gray-900 mt-2 mr-2 h-1 w-1 flex-shrink-0 rounded-full"></span>
            <span>SNS 게시물 작성시 경제적 대가관계를 표기해주세요.</span>
          </p>
        </div>
      </section>
    </>
  );
}
