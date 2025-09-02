import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <main className="min-h-[100dvh]">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4">
          <p className="ck-headline-1 text-ck-gray-900 mb-3">404 Error</p>
          <div className="flex flex-col items-center gap-0">
            <p className="ck-body-2 text-ck-gray-700 text-center">
              요청하신 페이지를 찾을 수 없어요.
            </p>
            <p className="ck-body-1 text-ck-gray-700 text-center">
              입력하신 주소가 정확한지 확인해주세요.
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
