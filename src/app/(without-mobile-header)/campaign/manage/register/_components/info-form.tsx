'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Calendar, Clock, FileText, Target, Users } from 'lucide-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CampaignCategoryType } from '@/models/campaign';
import { CampaignCreateForm, campaignCreateSchema } from '@/schemas/campaign.schemas';

interface Props {
  onSubmit: SubmitHandler<CampaignCreateForm>;
}

export default function InfoForm({ onSubmit }: Props) {
  const form = useForm<CampaignCreateForm>({
    resolver: zodResolver(campaignCreateSchema),
    defaultValues: {
      campaignType: undefined,
      categoryType: undefined,
      categoryName: undefined,
      title: '',
      productShortInfo: '',
      maxApplicants: undefined,
      recruitmentStartDate: '',
      recruitmentEndDate: '',
      applicationDeadlineDate: '',
      selectionDate: '',
      reviewDeadlineDate: '',
      productDetails: '',
      selectionCriteria: '',
      missionGuide: '',
      missionKeywords: '',
      companyName: '',
      businessRegistrationNumber: '',
      contactPerson: '',
      phoneNumber: '',
      thumbnailUrl: '',
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const categoryType = watch('categoryType');
  const missionKeywords = watch('missionKeywords');

  const handleCategoryTypeChange = (value: CampaignCategoryType) => {
    setValue('categoryType', value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue('categoryName', '' as any); // 빈 문자열로 설정하여 에러 방지
  };

  // 미션 키워드를 배열로 변환하여 미리보기
  const keywordArray = missionKeywords
    ? missionKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
    : [];

  const handleFormSubmit = (data: CampaignCreateForm) => {
    console.log('폼 제출 시작');

    // 미션 키워드를 쉼표로 구분된 문자열로 변환
    const processedData = {
      ...data,
      missionKeywords: data.missionKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
        .join(', '),
    };

    console.log('제출된 데이터:', processedData);
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            기본 정보
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-md">
              캠페인 타입 <span className="text-primary">*</span>
            </label>
            <Controller
              name="campaignType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="캠페인 타입을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="인스타그램">인스타그램</SelectItem>
                    <SelectItem value="블로그">블로그</SelectItem>
                    <SelectItem value="유튜브">유튜브</SelectItem>
                    <SelectItem value="틱톡">틱톡</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.campaignType && (
              <p className="text-sm text-red-500">{errors.campaignType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              카테고리 타입 <span className="text-primary">*</span>
            </Label>
            <Controller
              name="categoryType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={handleCategoryTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 타입을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="방문">방문</SelectItem>
                    <SelectItem value="배송">배송</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryType && (
              <p className="text-sm text-red-500">{errors.categoryType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              카테고리 <span className="text-primary">*</span>
            </Label>
            <Controller
              name="categoryName"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={!categoryType}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        categoryType ? '카테고리를 선택하세요' : '먼저 카테고리 타입을 선택하세요'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryType === '방문' && (
                      <>
                        <SelectItem value="맛집">맛집</SelectItem>
                        <SelectItem value="카페">카페</SelectItem>
                        <SelectItem value="뷰티">뷰티</SelectItem>
                        <SelectItem value="숙박">숙박</SelectItem>
                      </>
                    )}
                    {categoryType === '배송' && (
                      <>
                        <SelectItem value="식품">식품</SelectItem>
                        <SelectItem value="화장품">화장품</SelectItem>
                        <SelectItem value="생활용품">생활용품</SelectItem>
                        <SelectItem value="패션">패션</SelectItem>
                        <SelectItem value="잡화">잡화</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryName && (
              <p className="text-sm text-red-500">{errors.categoryName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              캠페인 제목 <span className="text-primary">*</span>
            </Label>
            <Input {...register('title')} placeholder="캠페인 제목을 입력하세요 (최대 200자)" />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              제품/서비스 간략 정보 <span className="text-primary">*</span>
            </Label>
            <Input
              {...register('productShortInfo')}
              placeholder="제공 혜택을 간단히 요약해주세요 (최대 50자)"
            />
            {errors.productShortInfo && (
              <p className="text-sm text-red-500">{errors.productShortInfo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              최대 지원 인원 <span className="text-primary">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <Input
                {...register('maxApplicants', { valueAsNumber: true })}
                type="number"
                placeholder="10"
                min="1"
              />
            </div>
            {errors.maxApplicants && (
              <p className="text-sm text-red-500">{errors.maxApplicants.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-md">
                모집 시작일 <span className="text-primary">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <Input {...register('recruitmentStartDate')} type="date" />
              </div>
              {errors.recruitmentStartDate && (
                <p className="text-sm text-red-500">{errors.recruitmentStartDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md">
                모집 종료일 <span className="text-primary">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <Input {...register('recruitmentEndDate')} type="date" />
              </div>
              {errors.recruitmentEndDate && (
                <p className="text-sm text-red-500">{errors.recruitmentEndDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md">
                지원 마감일 <span className="text-primary">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <Input {...register('applicationDeadlineDate')} type="date" />
              </div>
              {errors.applicationDeadlineDate && (
                <p className="text-sm text-red-500">{errors.applicationDeadlineDate.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            상세 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-md">
              제공 제품/서비스 상세 정보 <span className="text-primary">*</span>
            </Label>

            {/* 추후 에디터로 변경 필요 */}
            <Textarea
              {...register('productDetails')}
              placeholder="캠페인에서 제공하는 혜택과 체험 내용에 대한 자세한 설명을 입력해주세요"
              className="min-h-[120px]"
            />
            {errors.productDetails && (
              <p className="text-sm text-red-500">{errors.productDetails.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              선정 기준 <span className="text-primary">*</span>
            </Label>
            <Textarea
              {...register('selectionCriteria')}
              placeholder="인플루언서 선정 시 고려할 기준을 설명해주세요 (팔로워 수, 전문성, 활동 이력 등)"
              className="min-h-[80px]"
            />
            {errors.selectionCriteria && (
              <p className="text-sm text-red-500">{errors.selectionCriteria.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              참가자 선정일 <span className="text-primary">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <Input {...register('selectionDate')} type="date" />
            </div>
            {errors.selectionDate && (
              <p className="text-sm text-red-500">{errors.selectionDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-md">
              리뷰 제출 마감일 <span className="text-primary">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <Input {...register('reviewDeadlineDate')} type="date" />
            </div>
            {errors.reviewDeadlineDate && (
              <p className="text-sm text-red-500">{errors.reviewDeadlineDate.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 업체 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            업체 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-md">
                업체명 <span className="text-primary">*</span>
              </Label>
              <Input {...register('companyName')} placeholder="업체명을 입력하세요 (최대 100자)" />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-md">사업자등록번호</Label>
              <Input
                {...register('businessRegistrationNumber')}
                placeholder="000-00-00000 (선택사항)"
              />
              {errors.businessRegistrationNumber && (
                <p className="text-sm text-red-500">{errors.businessRegistrationNumber.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-md">
                담당자명 <span className="text-primary">*</span>
              </Label>
              <Input
                {...register('contactPerson')}
                placeholder="담당자명을 입력하세요 (최대 50자)"
              />
              {errors.contactPerson && (
                <p className="text-sm text-red-500">{errors.contactPerson.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-md">
                연락처 <span className="text-primary">*</span>
              </Label>
              <Input {...register('phoneNumber')} placeholder="010-0000-0000" />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 미션 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>
            미션 가이드 <span className="text-primary">*</span>
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            선정된 인플루언서가 수행해야 할 구체적인 미션 내용을 작성해주세요
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            {...register('missionGuide')}
            placeholder="1. 카페 방문 시 직원에게 체험단임을 알려주세요.&#10;2. 음료와 디저트를 맛있게 즐기며 사진을 찍어주세요.&#10;3. 인스타그램에 사진과 함께 솔직한 후기를 작성해주세요."
            className="min-h-[200px]"
          />
          {errors.missionGuide && (
            <p className="text-sm text-red-500">{errors.missionGuide.message}</p>
          )}
        </CardContent>
      </Card>

      {/* 미션 키워드 */}
      <Card>
        <CardHeader>
          <CardTitle>
            미션 키워드 <span className="text-primary">*</span>
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            리뷰 콘텐츠에 반드시 포함되어야 하는 해시태그나 키워드를 쉼표(,)로 구분하여 입력하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            {...register('missionKeywords')}
            placeholder="카페추천, 디저트맛집, 강남카페, 인스타맛집"
            className="min-h-[100px]"
          />
          {errors.missionKeywords && (
            <p className="text-sm text-red-500">{errors.missionKeywords.message}</p>
          )}

          {/* 키워드 미리보기 */}
          {keywordArray.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">키워드 미리보기:</Label>
              <div className="flex flex-wrap gap-2">
                {keywordArray.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary border-primary/20 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-xs">총 {keywordArray.length}개의 키워드</p>
            </div>
          )}

          {/* 입력 가이드 */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-muted-foreground text-sm">
              <strong>입력 예시:</strong> 카페추천, 디저트맛집, 강남카페
              <br />
              <strong>주의사항:</strong> 각 키워드는 쉼표(,)로 구분하여 입력해주세요
            </p>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" type="submit">
        {isSubmitting ? '등록 중...' : '등록하기'}
      </Button>
    </form>
  );
}
