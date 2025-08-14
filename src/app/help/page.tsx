'use client';

import { useState } from 'react';

import {
  Users,
  Gift,
  Star,
  MessageSquare,
  CreditCard,
  Mail,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Zap,
  Trophy,
  Clock,
  Phone,
  Bot,
  Send,
  Mic,
  FileText,
  Headphones,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelpPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '회원가입',
      description: '이메일 또는 소셜 계정으로 간편하게 가입하세요',
      icon: <Users className="h-6 w-6" />,
      details: ['이메일 주소 입력 후 인증', '기본 프로필 정보 작성'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
    },
    {
      title: '체험단 신청',
      description: '원하는 제품의 체험단에 신청하세요',
      icon: <Gift className="h-6 w-6" />,
      details: ['체험 가능한 제품 목록 확인', '신청서 작성 및 제출', '선정 결과 확인'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
    },
    {
      title: '제품 체험',
      description: '선정되면 제품을 받아 체험하세요',
      icon: <CheckCircle className="h-6 w-6" />,
      details: ['제품 수령 및 체험', '체험 기간 준수', '사진 및 영상 촬영'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 border-green-200',
    },
    {
      title: '리뷰 작성',
      description: '솔직한 후기를 작성해주세요',
      icon: <Star className="h-6 w-6" />,
      details: ['상세한 후기 작성', '사진/영상 첨부', '평점 및 추천도 입력'],
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
    },
  ];

  const faqs = [
    {
      question: '체험단 신청은 무료인가요?',
      answer: '네, 체험단 신청은 완전 무료입니다. 선정되시면 제품을 무료로 체험하실 수 있습니다.',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      question: '체험단 선정 기준은 무엇인가요?',
      answer:
        '프로필 완성도, 이전 리뷰 품질, 해당 카테고리에 대한 관심도 등을 종합적으로 고려하여 선정합니다.',
      icon: <Target className="h-4 w-4" />,
    },
    {
      question: '리뷰 작성 기한은 얼마나 되나요?',
      answer:
        '제품 수령 후 2주 이내에 리뷰를 작성해주셔야 합니다. 기한 내 미작성 시 향후 체험단 참여에 제한이 있을 수 있습니다.',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      question: '포인트는 어떻게 사용하나요?',
      answer: '적립된 포인트는 현금으로 출금하거나 쇼핑몰에서 할인 쿠폰으로 사용하실 수 있습니다.',
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      question: '체험 제품을 반납해야 하나요?',
      answer:
        '대부분의 제품은 체험 후 그대로 가져가실 수 있습니다. 일부 고가 제품의 경우 반납이 필요할 수 있으며, 이는 신청 시 명시됩니다.',
      icon: <Gift className="h-4 w-4" />,
    },
    {
      question: '챗봇으로 무엇을 할 수 있나요?',
      answer:
        '챗봇을 통해 체험단 정보 조회, 신청 현황 확인, 리뷰 작성 가이드, 포인트 조회 등 다양한 서비스를 이용하실 수 있습니다.',
      icon: <Bot className="h-4 w-4" />,
    },
  ];

  const chatbotFeatures = [
    {
      title: '체험단 정보 조회',
      description: '현재 모집 중인 체험단 정보를 실시간으로 확인',
      icon: <FileText className="h-5 w-5" />,
      examples: [
        '현재 모집 중인 체험단 알려줘',
        '뷰티 카테고리 체험단 있어?',
        '마감임박 체험단 보여줘',
      ],
    },
    {
      title: '신청 현황 확인',
      description: '내가 신청한 체험단의 선정 결과 및 진행 상황',
      icon: <CheckCircle className="h-5 w-5" />,
      examples: ['내 신청 현황 알려줘', '선정된 체험단 있어?', '배송 정보 확인해줘'],
    },
    {
      title: '리뷰 작성 도움',
      description: '좋은 리뷰 작성을 위한 팁과 가이드 제공',
      icon: <Star className="h-5 w-5" />,
      examples: ['리뷰 어떻게 써야 해?', '사진 첨부 방법 알려줘', '좋은 리뷰 예시 보여줘'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Floating Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-orange-200 opacity-20"></div>
        <div className="absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full bg-purple-200 opacity-20"></div>
        <div className="absolute bottom-40 left-20 h-12 w-12 animate-pulse rounded-full bg-blue-200 opacity-20"></div>
        <div className="absolute right-10 bottom-20 h-24 w-24 animate-bounce rounded-full bg-pink-200 opacity-20"></div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff5c33] via-[#ff7849] to-[#ff9466] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 h-40 w-40 -translate-x-20 -translate-y-20 animate-pulse rounded-full bg-white/10"></div>
          <div className="absolute right-0 bottom-0 h-60 w-60 translate-x-30 translate-y-30 animate-pulse rounded-full bg-white/5"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fadeInUp mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">체험콕 가이드 센터</span>
            </div>

            <h1
              className="animate-fadeInUp mb-6 text-3xl font-bold sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                도움말 센터
              </span>
            </h1>

            <p
              className="animate-fadeInUp mb-8 text-lg text-orange-100 sm:text-xl lg:text-2xl"
              style={{ animationDelay: '0.2s' }}
            >
              체험콕 서비스를 쉽고 빠르게 이용하는 방법을 알아보세요
            </p>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Interactive Quick Start Guide */}
        <section className="mb-16 sm:mb-20">
          <div className="mb-12 text-center">
            <Badge className="mb-4 rounded-full bg-[#ff5c33] px-4 py-2 text-base font-semibold text-white hover:bg-[#ff5c33]/90">
              <Zap className="mr-2 h-4 w-4" />
              4단계 완성
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              서비스 이용 방법
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              간단한 4단계로 체험콕에 참여하고 포인트를 받아보세요
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card
                  className={`cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    activeStep === index ? step.bgColor : 'hover:border-[#ff5c33]'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 transition-opacity duration-300 hover:opacity-5`}
                  ></div>

                  <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col items-center justify-center bg-gray-50/50 p-8 text-center md:w-1/3">
                      <div
                        className={`h-24 w-24 bg-gradient-to-r ${step.color} mb-6 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110`}
                      >
                        {step.icon}
                      </div>

                      <Badge
                        variant="secondary"
                        className="mb-4 animate-pulse px-4 py-2 text-base font-semibold"
                      >
                        STEP {index + 1}
                      </Badge>

                      <h3 className="mb-4 text-3xl font-bold">{step.title}</h3>
                      <p className="text-lg leading-relaxed text-gray-600">{step.description}</p>
                    </div>

                    <div className="flex items-center p-8 md:w-2/3">
                      <ul className="w-full space-y-8">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="animate-fadeInUp flex items-center text-2xl text-gray-700"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            <div className="mr-6 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                              <ChevronRight className="h-6 w-6 text-white" />
                            </div>
                            <span className="leading-relaxed font-semibold">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* 다음 단계 화살표 */}
                {index < steps.length - 1 && (
                  <div className="mt-6 mb-2 flex justify-center">
                    <div className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-gradient-to-r from-[#ff5c33] to-[#ff7849] shadow-lg">
                      <ChevronRight className="h-4 w-4 rotate-90 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Chatbot Guide Section */}
        <section className="mb-16 sm:mb-20">
          <div className="mb-12 text-center">
            <Badge className="mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-base font-semibold text-white">
              <Bot className="mr-2 h-4 w-4" />
              AI 챗봇 가이드
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              챗봇 이용 방법
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              AI 챗봇으로 더 빠르고 편리하게 서비스를 이용하세요
            </p>
          </div>

          <div className="mb-12 space-y-8">
            {chatbotFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardHeader className="px-6 pb-4">
                  <CardTitle className="flex items-center text-xl transition-colors group-hover:text-blue-600">
                    <div className="mr-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{feature.title}</div>
                      <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="rounded-lg bg-white/80 p-6">
                    <h4 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      예시 질문
                    </h4>
                    <ul className="space-y-3">
                      {feature.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="flex items-center rounded-lg bg-gray-50 p-3 text-base text-gray-700"
                        >
                          <Send className="mr-3 h-4 w-4 flex-shrink-0 text-blue-500" />
                          <span>&quot;{example}&quot;</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chatbot Usage Tips */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader className="px-6 pb-4">
              <CardTitle className="flex items-center text-xl">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Headphones className="h-6 w-6" />
                </div>
                챗봇 이용 팁
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white/80 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold">명확한 질문</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    구체적이고 명확한 질문을 하시면 더 정확한 답변을 받을 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg bg-white/80 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      <Mic className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold">음성 인식</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    음성으로도 질문할 수 있어서 더욱 편리하게 이용하실 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg bg-white/80 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
                      <Clock className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold">24시간 이용</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    언제든지 궁금한 점을 물어보세요. 24시간 언제나 도움을 드립니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced Detailed Guide */}
        <section className="mb-16 sm:mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">상세 이용 가이드</h2>
            <p className="text-lg text-gray-600">각 단계별 자세한 설명을 확인하세요</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 pb-4">
                <CardTitle className="flex items-center text-lg transition-colors group-hover:text-blue-600">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  회원가입 및 프로필 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-6">
                {[
                  { title: '계정 생성', desc: '이메일, 카카오, 네이버 계정으로 간편 가입' },
                  { title: '프로필 완성', desc: '닉네임, 관심사, 자기소개 등 기본 정보 입력' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-blue-50"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-bold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 pb-4">
                <CardTitle className="flex items-center text-lg transition-colors group-hover:text-purple-600">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <Gift className="h-5 w-5" />
                  </div>
                  체험단 신청하기
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-6">
                {[
                  { title: '체험단 목록 확인', desc: '현재 모집 중인 체험단 리스트 확인' },
                  { title: '신청서 작성', desc: '체험 동기, 활용 계획 등 상세 내용 작성' },
                  { title: '선정 결과 확인', desc: '마이페이지에서 선정 여부 및 배송 정보 확인' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-purple-50"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-sm font-bold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:col-span-2">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 pb-4">
                <CardTitle className="flex items-center text-lg transition-colors group-hover:text-amber-600">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                    <Star className="h-5 w-5" />
                  </div>
                  리뷰 작성 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-6">
                <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-amber-700">
                    <Trophy className="mr-2 h-4 w-4" />
                    좋은 리뷰 작성 팁
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> 제품의 장단점을
                      솔직하게 작성
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> 실제 사용 사진 3장
                      이상 첨부
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> 구체적인 사용 경험
                      공유
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> 다른 사용자에게 도움이
                      되는 정보 포함
                    </li>
                  </ul>
                </div>
                <div className="flex items-center space-x-3 rounded-lg bg-amber-50 p-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    리뷰 작성 기한: 제품 수령 후 2주 이내
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="mb-16 sm:mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">자주 묻는 질문</h2>
            <p className="text-lg text-gray-600">궁금한 점들을 빠르게 해결하세요</p>
          </div>

          <Card className="mx-auto max-w-4xl border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-xl border border-gray-200 px-6 transition-all duration-300 hover:shadow-md"
                  >
                    <AccordionTrigger className="py-6 text-left hover:text-[#ff5c33] hover:no-underline">
                      <span className="flex w-full items-center">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#ff5c33] to-[#ff7849] text-white">
                          {faq.icon}
                        </div>
                        <span className="text-base font-semibold">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-14 text-base leading-relaxed text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced Contact Section */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">고객지원</h2>
            <p className="text-lg text-gray-600">언제든지 도움이 필요하시면 연락주세요</p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="group border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="px-6 pb-4">
                <CardTitle className="flex items-center text-lg transition-colors group-hover:text-blue-600">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div>이메일 문의</div>
                    <CardDescription className="mt-1 text-sm">24시간 이내 답변</CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <p className="mb-4 text-lg font-semibold text-blue-600">support@com</p>
                <Button className="h-12 w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700">
                  <Mail className="mr-2 h-4 w-4" />
                  이메일 보내기
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="px-6 pb-4">
                <CardTitle className="flex items-center text-lg transition-colors group-hover:text-green-600">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div>실시간 채팅</div>
                    <CardDescription className="mt-1 text-sm">평일 09:00 - 18:00</CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <p className="mb-4 text-sm text-gray-600">
                  빠른 답변이 필요하시면 실시간 채팅을 이용해주세요
                </p>
                <Button className="h-12 w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  채팅 시작하기
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="px-6 pb-4">
                <CardTitle className="flex items-center text-lg transition-colors group-hover:text-purple-600">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div>전화 문의</div>
                    <CardDescription className="mt-1 text-sm">평일 09:00 - 18:00</CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <p className="mb-4 text-lg font-semibold text-purple-600">1588-0000</p>
                <Button className="h-12 w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-700">
                  <Phone className="mr-2 h-4 w-4" />
                  전화 걸기
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
