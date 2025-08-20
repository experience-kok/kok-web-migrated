import { Image as ImageIcon, Type as TypeIcon, SquarePlay, MapPin } from 'lucide-react';

import CampaignTypeBadge from '@/components/shared/campaign-card/campaign-type-badge';
import SplitBox from '@/components/ui/split-box';
import {
  getCampaignBasicInfo,
  getCampaignDetailInfo,
  getCampaignLocation,
  getCampaignMissionGuide,
  getCampaignThumbnail,
} from '@/service/campaigns/campaigns-api';
import { GetCampaignLocationInfoResponse } from '@/service/campaigns/types';

import CampaignApplicant from './_components/campaign-applicant';
import CampaignCategoryTypeBadge from './_components/campaign-category-type-badge';
import CampaignThumbnail from './_components/campaign-thumbnail';
import CampaignVisitInfo from './_components/campaign-visit-info';

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
    categoryType,
    currentApplicants,
    maxApplicants,
    recruitmentStartDate,
    recruitmentEndDate,
  } = await getCampaignBasicInfo(Number(campaignId));

  // 캠페인 주요 일정
  const { isAlwaysOpen, productDetails, selectionCriteria, selectionDate } =
    await getCampaignDetailInfo(Number(campaignId));

  // 캠페인 미션 가이드
  const { missionInfo } = await getCampaignMissionGuide(Number(campaignId));
  const {
    missionGuide,
    titleKeywords,
    bodyKeywords,
    numberOfVideo,
    numberOfImage,
    numberOfText,
    isMap,
    missionStartDate,
    missionDeadlineDate,
  } = missionInfo || {};

  // 캠페인 위치 정보 (방문 캠페인일 때만 호출)
  let locationData: GetCampaignLocationInfoResponse | null = null;
  if (categoryType === '방문') {
    locationData = await getCampaignLocation(Number(campaignId));
  }

  // 캠페인 키워드
  const parsedTitleKeywords = Array.isArray(titleKeywords)
    ? titleKeywords
        .filter(keyword => keyword && typeof keyword === 'string') // null, undefined, 빈 문자열 필터링
        .map(keyword => `#${keyword.trim()}`) // 공백 제거 후 # 추가
    : [];
  const parsedBodyKeywords = Array.isArray(bodyKeywords)
    ? bodyKeywords
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
            <CampaignCategoryTypeBadge type={categoryType} />
          </div>
        </div>
      </section>

      <SplitBox />

      {/* 캠페인 주요 일정 - 인플루언서 발표일, 리뷰 제출 마감일 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">주요 일정</div>
        <div className="mt-2 flex items-center">
          <div className="ck-body-2-bold w-24">캠페인 모집 기간</div>
          <div className="ck-body-2 text-ck-gray-700 ml-3">
            {isAlwaysOpen || !recruitmentEndDate
              ? '상시 모집'
              : `${recruitmentStartDate} ~ ${recruitmentEndDate}`}
          </div>
        </div>

        {!isAlwaysOpen && selectionDate && (
          <div className="mt-1 flex items-center">
            <div className="ck-body-2-bold w-24">발표일</div>
            <div className="ck-body-2 text-ck-gray-700 ml-3">{selectionDate}</div>
          </div>
        )}
        {!isAlwaysOpen && missionStartDate && missionDeadlineDate && (
          <div className="mt-1 flex items-center">
            <div className="ck-body-2-bold w-24">체험&리뷰</div>
            <div className="ck-body-2 text-ck-gray-700 ml-3">
              {missionStartDate} ~ {missionDeadlineDate}
            </div>
          </div>
        )}
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

        <div className="ck-body-2 text-ck-gray-700 mt-2 whitespace-pre-line">
          {selectionCriteria}
        </div>

        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="ck-caption-2 text-yellow-800">
            <span>⚠️</span> 허위 정보 기재 시 선발에서 제외될 수 있어요.
          </p>
        </div>
      </section>

      <SplitBox />

      {/* 캠페인 미션 가이드 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">미션 가이드</div>

        <div className="mt-2 flex items-center gap-4">
          <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
            <TypeIcon className="size-6" />
            <div className="ck-caption-2">{numberOfText}자↑</div>
          </div>
          <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
            <ImageIcon className="size-6" />
            <div className="ck-caption-2">{numberOfImage}장↑</div>
          </div>
          <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
            <SquarePlay className="size-6" />
            <div className="ck-caption-2">{numberOfVideo}개↑</div>
          </div>
          {isMap && (
            <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
              <MapPin className="size-6" />
              <div className="ck-caption-2">지도필수</div>
            </div>
          )}
        </div>

        <div className="ck-body-2 text-ck-gray-900 mt-3 whitespace-pre-line">
          {missionGuide || '미션 가이드가 없습니다.'}
        </div>

        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="ck-caption-2 text-yellow-800">
            <span>⚠️</span> 캠페인 미션이 지켜지지 않을 시 수정 요청이 있을 수 있어요.
          </p>
        </div>
      </section>

      <SplitBox />

      {/* 캠페인 미션 키워드 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">키워드</div>

        {/* 제목 키워드 */}
        <div className="ck-body-2-bold mt-2 mb-1">제목 키워드</div>

        <div className="ck-body-2 mt-1">
          아래 키워드 중 1개를 선택하여 상품명(업장명)과 조합하여{' '}
          <span className="ck-body-2-bold text-ck-red-500">반드시 제목</span>에 포함해주세요.
        </div>

        {/* 제목 키워드 */}
        {parsedTitleKeywords.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {parsedTitleKeywords.map((keyword, index) => (
              <span
                key={index}
                className="ck-caption-2 text-ck-blue-800 bg-ck-blue-100 inline-block rounded-full px-3 py-1"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-ck-gray-700 ck-body-2 mt-3">키워드가 없습니다.</p>
        )}

        <div className="bg-ck-gray-300 mt-4 rounded-[12px] px-4 py-2">
          <div className="ck-caption-1 text-ck-gray-700">
            <span className="ck-caption-1-bold">제목 작성 규칙: </span>
            제목 키워드 + 상품명(업장명)
          </div>
          <div className="ck-caption-1 text-ck-gray-700">
            <span className="ck-caption-1-bold">제목 예시: </span>광교 돈까스 맛집 OOO 방문기
          </div>
        </div>

        {/* 본문 키워드 */}
        <div className="ck-body-2-bold mt-3 mb-1">본문 키워드</div>

        <div className="ck-body-2 mt-1">
          아래 키워드 중 1개 이상을 선택해
          <span className="ck-body-2-bold text-ck-red-500"> 반드시 본문</span>에 포함해주세요.
        </div>
        <div className="ck-body-2">
          동일한 키워드는
          <span className="ck-body-2-bold text-ck-red-500">10회 이상 반복되지 않게 작성</span>
          해주세요.
        </div>

        {/* 본문 키워드 */}
        {parsedBodyKeywords.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {parsedBodyKeywords.map((keyword, index) => (
              <span
                key={index}
                className="ck-caption-2 text-ck-blue-800 bg-ck-blue-100 inline-block rounded-full px-3 py-1"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-ck-gray-700 ck-body-2 mt-3">키워드가 없습니다.</p>
        )}

        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="ck-caption-2 text-yellow-800">
            <span>⚠️</span> 키워드가 지켜지지 않으면 수정요청이 있을 수 있어요.
          </p>
        </div>
      </section>

      <SplitBox />

      {/* 방문 캠페인일 때만 위치 정보 표시 */}
      {categoryType === '방문' && locationData && (
        <>
          <CampaignVisitInfo locationData={locationData} />
          <SplitBox />
        </>
      )}

      {/* 추가 안내사항 */}
      <section className="px-5 pt-8 pb-40">
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
            <span>
              SNS 게시물 작성시{' '}
              <span className="text-ck-red-500 ck-body-2-bold">경제적 대가관계를 표기</span>
              해주세요.
            </span>
          </p>
          <p className="ck-body-2 flex items-start">
            <span className="bg-ck-gray-900 mt-2 mr-2 h-1 w-1 flex-shrink-0 rounded-full"></span>
            <span>생성형 AI로 작성된 콘텐츠와 이미지는 수정 요청이 있을 수 있어요.</span>
          </p>
        </div>
      </section>
    </>
  );
}
