'use client';

import { format } from 'date-fns';
import { ImageIcon, MapPin, SquarePlay, TypeIcon } from 'lucide-react';
import Image from 'next/image';

import CampaignCategoryTypeBadge from '@/app/campaign/[campaignId]/_components/campaign-category-type-badge';
import CampaignThumbnail from '@/app/campaign/[campaignId]/_components/campaign-thumbnail';
import CampaignVisitInfo from '@/app/campaign/[campaignId]/_components/campaign-visit-info';
import BottomButton from '@/components/shared/bottom-button';
import CampaignTypeBadge from '@/components/shared/campaign-card/campaign-type-badge';
import {
  Dialog,
  DialogButton,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SplitBox from '@/components/ui/split-box';
import { usePostCampaignMutationNew } from '@/service/campaigns/campaigns-mutation';

import { PostCampaignRequest } from '@/types/campaigns/requests';

import {
  CampaignData,
  CategoryData,
  CompanyData,
  MissionContentData,
  MissionData,
  ProductData,
  SelectionData,
  ThumbnailData,
  VisitData,
} from '../../_schemas/company-register-schemas';

interface Props {
  context: {
    companyInfo: CompanyData;
    categoryInfo: CategoryData;
    thumbnailUrl: ThumbnailData;
    campaignInfo: CampaignData;
    productInfo: ProductData;
    selectionInfo: SelectionData;
    missionInfo: MissionData;
    missionContentInfo: MissionContentData;
    visitInfo?: VisitData;
  };
}

/**
 * 캠페인 생성 애니메이션 페이지입니다.
 */
export default function CreateCampaignStep({ context }: Props) {
  console.log('생성페이지', context);
  const {
    campaignInfo,
    categoryInfo,
    thumbnailUrl,
    companyInfo,
    productInfo,
    selectionInfo,
    missionInfo,
    missionContentInfo,
    visitInfo,
  } = context;

  const { mutate: postCampaign, isPending } = usePostCampaignMutationNew();

  const handlePostCampaign = () => {
    const requestBody: PostCampaignRequest = {
      isAlwaysOpen: campaignInfo.isAlwaysOpen,
      thumbnailUrl: thumbnailUrl.thumbnailUrl,
      campaignType: categoryInfo.campaignType,
      title: campaignInfo.title,
      productShortInfo: productInfo.productShortInfo,
      maxApplicants: campaignInfo.maxApplicants,
      productDetails: productInfo.productDetails,
      recruitmentStartDate: formatDate(campaignInfo.recruitmentStartDate),
      recruitmentEndDate: formatDate(campaignInfo.recruitmentEndDate),
      selectionDate: formatDate(selectionInfo.selectionDate),
      selectionCriteria: selectionInfo.selectionCriteria,
      missionInfo: {
        titleKeywords: getKeywordsArray(missionInfo.titleKeywords),
        bodyKeywords: getKeywordsArray(missionInfo.bodyKeywords),
        numberOfVideo: missionContentInfo.numberOfVideo,
        numberOfImage: missionContentInfo.numberOfImage,
        numberOfText: missionContentInfo.numberOfText,
        isMap: missionContentInfo.isMap,
        missionGuide: missionInfo.missionGuide,
        missionStartDate: formatDate(missionContentInfo.missionStartDate),
        missionDeadlineDate: formatDate(missionContentInfo.missionDeadlineDate),
      },
      category: {
        type: categoryInfo.categoryType,
        name: categoryInfo.categoryName,
      },
      companyInfo: {
        contactPerson: companyInfo.contactPerson,
        phoneNumber: companyInfo.phoneNumber,
      },
      visitInfo: visitInfo
        ? {
            homepage: visitInfo.homepage,
            contactPhone: visitInfo.contactPhone,
            visitAndReservationInfo: visitInfo.visitAndReservationInfo,
            businessAddress: visitInfo.businessAddress,
            businessDetailAddress: visitInfo.businessDetailAddress ?? '',
            lat: visitInfo.lat,
            lng: visitInfo.lng,
          }
        : undefined,
    };

    postCampaign(requestBody);
  };

  const getKeywordsArray = (keywords: string | undefined) => {
    if (!keywords) return [];
    return keywords
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);
  };

  function formatDate(date: Date): string;
  function formatDate(date: undefined): undefined;
  function formatDate(date: Date | undefined): string | undefined;
  function formatDate(date: Date | undefined): string | undefined {
    return date ? format(date, 'yyyy-MM-dd') : undefined;
  }

  const parsedMissionTitleKeywords = getKeywordsArray(missionInfo.titleKeywords);
  const parsedMissionBodyKeywords = getKeywordsArray(missionInfo.bodyKeywords);

  // isPending 상태일 때 로딩 애니메이션 표시
  if (isPending) {
    return (
      <>
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .kogi-float-animation {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>

        <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center space-y-4 text-center">
          <Image
            src="/kogi-make.svg"
            alt="캠페인을 생성중인 코기"
            width={200}
            height={200}
            priority
            className="kogi-float-animation"
          />
          <p className="ck-title">
            캠페인을 안전하게
            <br />
            생성하고 있어요
          </p>
          <p className="ck-body-1 text-ck-gray-600">잠시만 기다려주세요!</p>
        </div>
      </>
    );
  }

  // 미리보기 화면
  return (
    <div>
      <div className="ck-title px-5 pt-5 pb-10">
        입력해주신 정보로 <br />
        캠페인을 생성했어요
      </div>

      <section className="relative aspect-square">
        <CampaignThumbnail thumbnailUrl={thumbnailUrl.thumbnailUrl} />
      </section>

      <section className="px-5 py-5">
        <CampaignTypeBadge campaignType={categoryInfo.campaignType} />

        <div className="mt-2">
          <p className="ck-title">{campaignInfo.title}</p>

          <div className="mt-2">
            <CampaignCategoryTypeBadge type={categoryInfo.categoryType} />
          </div>
        </div>
      </section>

      <SplitBox />

      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">주요 일정</div>
        <div className="mt-2 flex items-center">
          <div className="ck-body-2-bold w-24">캠페인 모집 기간</div>
          <div className="ck-body-2 text-ck-gray-700 ml-3">
            {campaignInfo.isAlwaysOpen || !campaignInfo.recruitmentEndDate
              ? '상시 모집'
              : `${formatDate(campaignInfo.recruitmentStartDate)} ~ ${formatDate(
                  campaignInfo.recruitmentEndDate,
                )}`}
          </div>
        </div>

        {!campaignInfo.isAlwaysOpen && selectionInfo.selectionDate && (
          <div className="mt-1 flex items-center">
            <div className="ck-body-2-bold w-24">발표일</div>
            <div className="ck-body-2 text-ck-gray-700 ml-3">
              {formatDate(selectionInfo.selectionDate)}
            </div>
          </div>
        )}
        {!campaignInfo.isAlwaysOpen &&
          missionContentInfo.missionStartDate &&
          missionContentInfo.missionDeadlineDate && (
            <div className="mt-1 flex items-center">
              <div className="ck-body-2-bold w-24">체험&리뷰</div>
              <div className="ck-body-2 text-ck-gray-700 ml-3">
                {formatDate(missionContentInfo.missionStartDate)} ~{' '}
                {formatDate(missionContentInfo.missionDeadlineDate)}
              </div>
            </div>
          )}
      </section>

      <SplitBox />

      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">제공 제품</div>

        <div className="ck-body-2 text-ck-gray-700 mt-2">{productInfo.productDetails}</div>
      </section>

      <SplitBox />

      {/* 캠페인 지원 조건 */}
      <section className="px-5 pt-8 pb-5">
        <div className="ck-sub-title-1">지원 조건</div>

        <div className="ck-body-2 text-ck-gray-700 mt-2 whitespace-pre-line">
          {selectionInfo.selectionCriteria}
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
            <div className="ck-caption-2">{missionContentInfo.numberOfText}자↑</div>
          </div>
          <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
            <ImageIcon className="size-6" />
            <div className="ck-caption-2">{missionContentInfo.numberOfImage}장↑</div>
          </div>
          <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
            <SquarePlay className="size-6" />
            <div className="ck-caption-2">{missionContentInfo.numberOfVideo}개↑</div>
          </div>
          {missionContentInfo.isMap && (
            <div className="text-ck-gray-900 flex w-14 flex-col items-center gap-2">
              <MapPin className="size-6" />
              <div className="ck-caption-2">지도필수</div>
            </div>
          )}
        </div>

        <div className="ck-body-2 text-ck-gray-900 mt-3 whitespace-pre-line">
          {missionInfo.missionGuide || '미션 가이드가 없습니다.'}
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
        {parsedMissionTitleKeywords.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {parsedMissionTitleKeywords.map((keyword, index) => (
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
        {parsedMissionBodyKeywords.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {parsedMissionBodyKeywords.map((keyword, index) => (
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
      {categoryInfo.categoryType === '방문' && visitInfo && (
        <>
          <CampaignVisitInfo
            locationData={{
              id: 0,
              campaignId: 0,
              lat: visitInfo?.lat,
              lng: visitInfo?.lng,
              homepage: visitInfo?.homepage || '',
              contactPhone: visitInfo?.contactPhone,
              visitAndReservationInfo: visitInfo?.visitAndReservationInfo,
              businessAddress: visitInfo?.businessAddress,
              businessDetailAddress: visitInfo?.businessDetailAddress || '',
              hasCoordinates: true,
            }}
          />
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

      <Dialog>
        <DialogTrigger asChild>
          <BottomButton>캠페인 생성하기</BottomButton>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>캠페인을 생성할까요?</DialogTitle>
            <DialogDescription>
              <>
                캠페인은 담당자 검토를 거친 후, <br /> 결과를 이메일로 안내드려요.
                <br />
                캠페인 생성 후에는 정보 수정이 어려우니,
                <br /> 제출 전 내용을 꼼꼼히 확인해 주세요.
              </>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row items-center justify-end">
            <DialogClose asChild>
              <DialogButton variant="ghost">취소</DialogButton>
            </DialogClose>
            <DialogButton onClick={handlePostCampaign} disabled={isPending}>
              {isPending ? '생성 중...' : '생성하기'}
            </DialogButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
