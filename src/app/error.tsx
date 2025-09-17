'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  return (
    <>
      <main className="min-h-[100dvh]">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4">
          <p className="ck-headline-1 text-ck-gray-900 mb-3">Error</p>
          <div className="flex flex-col items-center gap-0">
            <p className="ck-body-2 text-ck-gray-700 text-center">예기치 못한 에러가 발생했어요.</p>
            <p className="ck-body-1 text-ck-gray-700 text-center">
              잠시 후 다시 시도해 보거나 문의를 남겨주세요.
            </p>
          </div>

          <Link
            href="/"
            className="text-ck-blue-500 hover:text-ck-blue-600 mt-2 transition-colors duration-200"
          >
            메인 페이지로 이동하기
          </Link>

          <Image
            src={'/not_found.svg'}
            width={128}
            height={128}
            alt="404 이미지"
            className="mt-4"
          />
        </div>
      </main>
    </>
  );
}
