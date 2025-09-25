'use client';

import { useFunnel } from '@use-funnel/browser';

import { DELIVERY_CATEGORIES, VISIT_CATEGORIES } from '@/types/campaigns/models';

import {
  CompanyData,
  CategoryData,
  CampaignData,
  ThumbnailData,
} from '../_schemas/company-register-schemas';

import CampaignInfoStep from './campaign-info-step';
import CategoryInfoStep from './category-info-step';
import CompanyInfoStep from './company-info-step';
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
        캠페인정보={({ history, context }) => <CampaignInfoStep context={context} />}
      />
    </>
  );
}

// 카테고리 선택 래퍼 컴포넌트 (내부 퍼널 포함)
function CategorySelectionWrapper({
  company,
  onNext,
  onPrev,
}: {
  company: CompanyData;
  onNext: (data: CategoryData) => void;
  onPrev: () => void;
}) {
  // 카테고리 선택을 위한 내부 퍼널
  const categoryFunnel = useFunnel<{
    타입선택: object;
    카테고리선택: { categoryType: '방문' | '배송' };
    캠페인타입선택: { categoryType: '방문' | '배송'; categoryName: string };
  }>({
    id: 'category-selection',
    initial: {
      step: '타입선택',
      context: {},
    },
  });

  return (
    <>
      <categoryFunnel.Render
        타입선택={({ history }) => (
          <CategoryTypeStep
            onNext={type => {
              history.push('카테고리선택', { categoryType: type });
            }}
            onPrev={onPrev}
          />
        )}
        카테고리선택={({ context, history }) => (
          <CategoryNameStep
            categoryType={context.categoryType}
            onNext={name => {
              history.push('캠페인타입선택', {
                categoryType: context.categoryType,
                categoryName: name,
              });
            }}
            onPrev={() => {
              history.back();
            }}
          />
        )}
        캠페인타입선택={({ context, history }) => (
          <CampaignTypeStep
            onNext={type => {
              onNext({
                categoryType: context.categoryType,
                categoryName: context.categoryName as any,
                campaignType: type as any,
              });
            }}
            onPrev={() => {
              history.back();
            }}
          />
        )}
      />
    </>
  );
}

// 1단계: 업체 정보 입력
// function CompanyInfoStep({ onNext }: { onNext: (data: CompanyData) => void }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<CompanyData>({
//     resolver: zodResolver(companySchema),
//   });

//   const phoneNumber = watch('phoneNumber');

//   // 전화번호 자동 포맷팅
//   useEffect(() => {
//     if (phoneNumber) {
//       const cleaned = phoneNumber.replace(/\D/g, '');
//       if (cleaned.length <= 11) {
//         const formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
//         if (formatted !== phoneNumber) {
//           setValue('phoneNumber', formatted);
//         }
//       }
//     }
//   }, [phoneNumber, setValue]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="mx-auto max-w-xl">
//         <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <h2 className="text-3xl font-bold text-white">캠페인 생성</h2>
//             <p className="mt-2 text-blue-100">업체 정보를 입력해주세요</p>
//           </div>

//           <form onSubmit={handleSubmit(onNext)} className="space-y-6 p-8">
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">
//                 담당자명 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register('contactPerson')}
//                 className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
//                 placeholder="홍길동"
//               />
//               {errors.contactPerson && (
//                 <p className="mt-1 flex items-center text-sm text-red-600">
//                   <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {errors.contactPerson.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">
//                 담당자 연락처 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register('phoneNumber')}
//                 className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
//                 placeholder="010-1234-5678"
//                 maxLength={13}
//               />
//               {errors.phoneNumber && (
//                 <p className="mt-1 flex items-center text-sm text-red-600">
//                   <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {errors.phoneNumber.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
//             >
//               다음 단계
//             </button>
//           </form>
//         </div>

//         <div className="mt-6 flex justify-center">
//           <div className="flex space-x-2">
//             <div className="h-2 w-8 rounded-full bg-blue-600"></div>
//             <div className="h-2 w-8 rounded-full bg-gray-300"></div>
//             <div className="h-2 w-8 rounded-full bg-gray-300"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// 카테고리 타입 선택
function CategoryTypeStep({
  onNext,
  onPrev,
}: {
  onNext: (type: '방문' | '배송') => void;
  onPrev: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">캠페인 종류</h2>
            <p className="mt-2 text-purple-100">캠페인 타입을 선택해주세요</p>
          </div>

          <div className="space-y-4 p-8">
            <button
              onClick={() => onNext('방문')}
              className="group w-full rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 transition-all duration-200 hover:border-blue-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">방문형 캠페인</h3>
                    <p className="mt-1 text-sm text-gray-600">고객이 직접 매장을 방문하는 캠페인</p>
                  </div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onNext('배송')}
              className="group w-full rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50 p-6 transition-all duration-200 hover:border-green-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">배송형 캠페인</h3>
                    <p className="mt-1 text-sm text-gray-600">제품을 배송 받는 캠페인</p>
                  </div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors group-hover:text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={onPrev}
              className="mt-6 w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
            >
              이전 단계
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-2 w-8 rounded-full bg-gray-300"></div>
            <div className="h-2 w-8 rounded-full bg-purple-600"></div>
            <div className="h-2 w-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 카테고리명 선택
function CategoryNameStep({
  categoryType,
  onNext,
  onPrev,
}: {
  categoryType: '방문' | '배송';
  onNext: (name: string) => void;
  onPrev: () => void;
}) {
  const categories = categoryType === '방문' ? VISIT_CATEGORIES : DELIVERY_CATEGORIES;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">카테고리 선택</h2>
            <p className="mt-2 text-orange-100">
              {categoryType === '방문' ? '방문형' : '배송형'} 캠페인의 카테고리를 선택해주세요
            </p>
          </div>

          <div className="space-y-4 p-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onNext(category)}
                className="group w-full rounded-xl border-2 border-gray-200 p-4 text-left transition-all duration-200 hover:border-orange-400 hover:bg-orange-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 group-hover:text-orange-600">
                    {category}
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-400 transition-colors group-hover:text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}

            <button
              onClick={onPrev}
              className="mt-6 w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
            >
              이전 단계
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-2 w-8 rounded-full bg-gray-300"></div>
            <div className="h-2 w-8 rounded-full bg-orange-600"></div>
            <div className="h-2 w-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 캠페인 타입 선택
function CampaignTypeStep({
  onNext,
  onPrev,
}: {
  onNext: (type: string) => void;
  onPrev: () => void;
}) {
  const campaignTypes = [
    {
      type: '인스타그램',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
        </svg>
      ),
      color: 'from-purple-400 to-pink-600',
      description: '시각적 콘텐츠로 브랜드 스토리 전달',
    },
    {
      type: '블로그',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: 'from-green-400 to-teal-600',
      description: '상세한 리뷰와 경험 공유',
    },
    {
      type: '유튜브',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: 'from-red-500 to-red-600',
      description: '동영상으로 생생한 경험 전달',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">캠페인 타입</h2>
            <p className="mt-2 text-teal-100">원하는 캠페인 타입을 선택해주세요</p>
          </div>

          <div className="space-y-4 p-8">
            {campaignTypes.map(campaign => (
              <button
                key={campaign.type}
                onClick={() => onNext(campaign.type)}
                className="group w-full rounded-xl border-2 border-gray-200 p-6 transition-all duration-200 hover:border-teal-400 hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-14 w-14 bg-gradient-to-r ${campaign.color} flex items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110`}
                  >
                    {campaign.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600">
                      {campaign.type}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{campaign.description}</p>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400 transition-colors group-hover:text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}

            <button
              onClick={onPrev}
              className="mt-6 w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
            >
              이전 단계
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-2 w-8 rounded-full bg-gray-300"></div>
            <div className="h-2 w-8 rounded-full bg-teal-600"></div>
            <div className="h-2 w-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 완료 화면
function CompletionStep({
  companyData,
  categoryData,
  onReset,
}: {
  companyData: CompanyData;
  categoryData: CategoryData;
  onReset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">캠페인 생성 완료!</h2>
                <p className="mt-1 text-green-100">캠페인이 성공적으로 생성되었습니다</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-8">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-blue-900">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                업체 정보
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">담당자명</dt>
                  <dd className="text-sm font-medium text-gray-900">{companyData.contactPerson}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">연락처</dt>
                  <dd className="text-sm font-medium text-gray-900">{companyData.phoneNumber}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-purple-900">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                캠페인 정보
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">캠페인 타입</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        categoryData.categoryType === '방문'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {categoryData.categoryType}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">카테고리</dt>
                  <dd className="text-sm font-medium text-gray-900">{categoryData.categoryName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">플랫폼</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        categoryData.campaignType === '인스타그램'
                          ? 'bg-pink-100 text-pink-700'
                          : categoryData.campaignType === '블로그'
                            ? 'bg-teal-100 text-teal-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {categoryData.campaignType}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-amber-900">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                다음 단계 안내
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-2 h-4 w-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  캠페인 검토 후 24시간 이내 승인 여부를 알려드립니다
                </li>
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-2 h-4 w-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  승인 완료 시 인플루언서 매칭이 시작됩니다
                </li>
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-2 h-4 w-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  대시보드에서 캠페인 진행 상황을 확인할 수 있습니다
                </li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onReset}
                className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
              >
                새 캠페인 만들기
              </button>
              <button className="flex-1 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl">
                대시보드로 이동
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-2 w-8 rounded-full bg-green-600"></div>
            <div className="h-2 w-8 rounded-full bg-green-600"></div>
            <div className="h-2 w-8 rounded-full bg-green-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
