'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // 80vh hero section
      setIsScrolled(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services 섹션 Intersection Observer
  const servicesObserver = useIntersectionObserver({
    onIntersect: () => setVisibleSections(prev => new Set(prev).add('services')),
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  // About 섹션 Intersection Observer
  const aboutObserver = useIntersectionObserver({
    onIntersect: () => setVisibleSections(prev => new Set(prev).add('about')),
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  // Success Stories 섹션 Intersection Observer
  const successObserver = useIntersectionObserver({
    onIntersect: () => setVisibleSections(prev => new Set(prev).add('success')),
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  // Contact 섹션 Intersection Observer
  const contactObserver = useIntersectionObserver({
    onIntersect: () => setVisibleSections(prev => new Set(prev).add('contact')),
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      {/* Dynamic Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Kok
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="from-ck-blue-500 relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br via-blue-600 to-purple-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-xl"></div>
          <div
            className="absolute top-40 right-32 h-24 w-24 animate-bounce rounded-full bg-pink-400/20 blur-lg"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-32 left-32 h-40 w-40 animate-pulse rounded-full bg-yellow-400/15 blur-xl"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute right-20 bottom-20 h-28 w-28 animate-bounce rounded-full bg-purple-400/20 blur-lg"
            style={{ animationDelay: '0.5s' }}
          ></div>

          {/* Gradient Mesh */}
          <div className="absolute inset-0 translate-y-1/2 -skew-y-12 transform bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-0 -translate-y-1/4 skew-y-12 transform bg-gradient-to-l from-transparent via-pink-500/10 to-transparent"></div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
              `,
                backgroundSize: '40px 40px',
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="ck-headline-0 mb-8 text-5xl leading-tight font-bold text-white drop-shadow-2xl md:text-7xl">
            신뢰할 수 있는 리뷰로
            <br />
            <span className="animate-pulse bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent">
              브랜드의 미래를 그려봐요
            </span>
          </h1>
          <p className="ck-title mb-12 leading-relaxed text-blue-100 drop-shadow-lg md:text-2xl">
            강력한 리뷰 마케팅으로 브랜드를 성장시켜요
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              className="h-[53px] transform rounded-[12px] border border-white/20 bg-white/95 px-8 py-4 text-lg font-semibold text-gray-900 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl"
            >
              체험콕 바로가기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-[53px] transform rounded-[12px] border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 hover:shadow-xl"
            >
              문의하기
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div
            ref={servicesObserver.elementRef}
            className={`transition-all duration-700 ${
              visibleSections.has('services')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="mb-16 text-center text-4xl font-bold text-gray-900 md:text-5xl">
              Our Services
            </h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=256&fit=crop&crop=center"
                    alt="Product Strategy"
                    width={400}
                    height={256}
                    className="h-64 w-full rounded-lg object-cover shadow-lg"
                  />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Product Strategy</h3>
                <p className="leading-relaxed text-gray-600">
                  Develop comprehensive product strategies that align with market demands and
                  consumer behavior patterns.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=256&fit=crop&crop=center"
                    alt="Consumer Research"
                    width={400}
                    height={256}
                    className="h-64 w-full rounded-lg object-cover shadow-lg"
                  />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Consumer Research</h3>
                <p className="leading-relaxed text-gray-600">
                  Deep dive into consumer insights and behavioral analytics to understand your
                  target audience better.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=256&fit=crop&crop=center"
                    alt="Brand Storytelling"
                    width={400}
                    height={256}
                    className="h-64 w-full rounded-lg object-cover shadow-lg"
                  />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Brand Storytelling</h3>
                <p className="leading-relaxed text-gray-600">
                  Craft compelling narratives that connect your products with consumers on an
                  emotional level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div
            ref={aboutObserver.elementRef}
            className={`transition-all duration-700 ${
              visibleSections.has('about') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
                  Why Choose Kok?
                </h2>
                <p className="mb-6 text-xl leading-relaxed text-gray-600">
                  We believe every product has a story waiting to be told. Our mission is to help
                  brands discover and share these stories in ways that create meaningful connections
                  with consumers.
                </p>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  With over a decade of experience in product marketing and consumer psychology,
                  we&apos;ve helped hundreds of brands transform their market presence and build
                  lasting relationships with their customers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 h-2 w-2 rounded-full bg-indigo-600"></div>
                    <span className="text-gray-700">Data-driven consumer insights</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 h-2 w-2 rounded-full bg-indigo-600"></div>
                    <span className="text-gray-700">Creative storytelling approach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 h-2 w-2 rounded-full bg-indigo-600"></div>
                    <span className="text-gray-700">Measurable results and ROI</span>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=384&fit=crop&crop=center"
                  alt="Our Team"
                  width={600}
                  height={384}
                  className="h-96 w-full rounded-lg object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div
            ref={successObserver.elementRef}
            className={`transition-all duration-700 ${
              visibleSections.has('success')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="mb-16 text-center text-4xl font-bold text-gray-900 md:text-5xl">
              Success Stories
            </h2>
            <div className="grid gap-12 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-8">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=192&fit=crop&crop=center"
                  alt="Success Story 1"
                  width={400}
                  height={192}
                  className="mb-6 h-48 w-full rounded-lg object-cover"
                />
                <h3 className="mb-4 text-2xl font-bold text-gray-900">TechStart Launch</h3>
                <p className="leading-relaxed text-gray-600">
                  &quot;Kok helped us understand our consumers like never before. Their strategic
                  approach led to a 300% increase in user engagement within the first quarter.&quot;
                </p>
                <p className="mt-4 text-sm text-gray-500">- Sarah Chen, CEO of TechStart</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-8">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=192&fit=crop&crop=center"
                  alt="Success Story 2"
                  width={400}
                  height={192}
                  className="mb-6 h-48 w-full rounded-lg object-cover"
                />
                <h3 className="mb-4 text-2xl font-bold text-gray-900">RetailMax Transformation</h3>
                <p className="leading-relaxed text-gray-600">
                  &quot;The consumer insights and storytelling strategy completely transformed our
                  brand perception. Sales increased by 150% in just six months.&quot;
                </p>
                <p className="mt-4 text-sm text-gray-500">- Michael Rodriguez, CMO of RetailMax</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <div
            ref={contactObserver.elementRef}
            className={`transition-all duration-700 ${
              visibleSections.has('contact')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="mb-8 text-xl font-bold md:text-xl">체험콕</h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300">
              대표자명: 김현재
            </p>
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300">
              사업자등록번호 : 111-11-11111
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <span className="">
                &copy; {currentYear} Wings of Innovation. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
