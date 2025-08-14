'use client';

// import Image from 'next/image';

// import AdImage from '@/assets/ad.png';

export default function AdBanner() {
  return (
    <div className="bg-ck-gray-300 flex h-16 w-full flex-col items-center justify-center rounded-[12px]">
      {/* <Image src={AdImage} alt="광고 이미지" className="rounded-[12px]" /> */}

      <p className="ck-body-1-bold">이 위치에 캠페인을 홍보할 수 있어요!</p>
    </div>
  );
}
