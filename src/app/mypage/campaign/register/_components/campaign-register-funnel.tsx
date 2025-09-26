'use client';

import { useFunnel } from '@use-funnel/browser';

import {
  CompanyData,
  CategoryData,
  CampaignData,
  ThumbnailData,
  ProductData,
  SelectionData,
} from '../_schemas/company-register-schemas';

import CampaignInfoStep from './campaign-info-step';
import CategoryInfoStep from './category-info-step';
import CompanyInfoStep from './company-info-step';
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
              history.push('', {
                ...context,
                selectionInfo: data,
              });
            }}
          />
        )}
      />
    </>
  );
}
