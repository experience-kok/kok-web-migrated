'use client';

import { useFunnel } from '@use-funnel/browser';

import {
  CompanyData,
  CategoryData,
  CampaignData,
  ThumbnailData,
  ProductData,
  SelectionData,
  MissionData,
  MissionContentData,
} from '../_schemas/company-register-schemas';

import CampaignInfoStep from './campaign-info-step';
import CategoryInfoStep from './category-info-step';
import CompanyInfoStep from './company-info-step';
import MissionContentInfoStep from './mission-content-info-step';
import MissionInfoStep from './mission-info-step';
import ProductInfoStep from './product-info-step';
import SelectionInfoStep from './selection-info-step';
import ThumbnailInfoStep from './thumbnail-info-step';

/**
 * 캠페인 등록 퍼널 컴포넌트
 */
export default function CampaignRegisterFunnel() {
  const funnel = useFunnel<{
    업체정보: { companyInfo?: CompanyData };
    카테고리정보: { companyInfo: CompanyData; categoryInfo?: CategoryData };
    썸네일정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl?: ThumbnailData;
    };
    캠페인정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl: ThumbnailData;
      campaignInfo?: CampaignData;
    };
    제품정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl: ThumbnailData;
      campaignInfo: CampaignData;
      productInfo?: ProductData;
    };
    인플루언서_선정정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl: ThumbnailData;
      campaignInfo: CampaignData;
      productInfo: ProductData;
      selectionInfo?: SelectionData;
    };
    미션정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl: ThumbnailData;
      campaignInfo: CampaignData;
      productInfo: ProductData;
      selectionInfo: SelectionData;
      missionInfo?: MissionData;
    };
    미션콘텐츠정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl: ThumbnailData;
      campaignInfo: CampaignData;
      productInfo: ProductData;
      selectionInfo: SelectionData;
      missionInfo: MissionData;
      missionContentInfo?: MissionContentData;
    };
    방문정보: {
      companyInfo: CompanyData;
      categoryInfo: CategoryData;
      thumbnailUrl: ThumbnailData;
      campaignInfo: CampaignData;
      productInfo: ProductData;
      selectionInfo: SelectionData;
      missionInfo: MissionData;
      missionContentInfo: MissionContentData;
    };
  }>({
    id: 'campaign-register',
    initial: {
      step: '업체정보',
      context: {},
    },
  });

  return (
    <>
      {/* 프로그레스바 추가 필요 */}
      <funnel.Render
        업체정보={({ history, context }) => (
          <CompanyInfoStep
            context={context}
            companyData={context.companyInfo}
            onNext={data => {
              history.push('카테고리정보', { companyInfo: data });
            }}
          />
        )}
        카테고리정보={({ history, context }) => (
          <CategoryInfoStep
            context={context}
            onNext={data => {
              history.push('썸네일정보', {
                ...context,
                categoryInfo: data,
              });
            }}
          />
        )}
        썸네일정보={({ history, context }) => (
          <ThumbnailInfoStep
            context={context}
            onNext={data => {
              history.push('캠페인정보', {
                ...context,
                thumbnailUrl: data,
              });
            }}
          />
        )}
        캠페인정보={({ history, context }) => (
          <CampaignInfoStep
            context={context}
            onNext={data => {
              history.push('제품정보', {
                ...context,
                campaignInfo: data,
              });
            }}
          />
        )}
        제품정보={({ history, context }) => (
          <ProductInfoStep
            context={context}
            onNext={data => {
              history.push('인플루언서_선정정보', {
                ...context,
                productInfo: data,
              });
            }}
          />
        )}
        인플루언서_선정정보={({ history, context }) => (
          <SelectionInfoStep
            context={context}
            onNext={data => {
              history.push('미션정보', {
                ...context,
                selectionInfo: data,
              });
            }}
          />
        )}
        미션정보={({ history, context }) => (
          <MissionInfoStep
            context={context}
            onNext={data => {
              history.push('미션콘텐츠정보', {
                ...context,
                missionInfo: data,
              });
            }}
          />
        )}
        미션콘텐츠정보={({ history, context }) => (
          <MissionContentInfoStep
            context={context}
            onNext={data => {
              const 방문캠페인 = context.categoryInfo.categoryType === '방문';

              if (방문캠페인) {
                history.push('방문정보', {
                  ...context,
                  missionContentInfo: data,
                });
              } else {
                history.push('완료', {
                  ...context,
                  missionContentInfo: data,
                });
              }
            }}
          />
        )}
        방문정보={({history, context}) => (
          
        )}
      />
    </>
  );
}
