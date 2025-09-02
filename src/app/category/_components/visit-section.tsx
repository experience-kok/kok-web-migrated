import Link from 'next/link';

/**
 * 캠페인 페이지 방문 카테고리 영역
 */
export default function VisitSection() {
  return (
    <section className="mt-8 px-5">
      <p className="ck-caption-1">방문 캠페인</p>
      <div className="mt-2 grid grid-cols-2 gap-4 rounded-[12px] bg-white px-5 py-2.5 shadow-[0_0_8px_0_rgba(0,0,0,0.05)]">
        <Link href={`/campaign/visit?categoryName=${encodeURIComponent('맛집')}`}>
          <div className="ck-body-2-bold">맛집</div>
        </Link>
        <Link href={`/campaign/visit?categoryName=${encodeURIComponent('카페')}`}>
          <div className="ck-body-2-bold">카페</div>
        </Link>
        <Link href={`/campaign/visit?categoryName=${encodeURIComponent('뷰티')}`}>
          <div className="ck-body-2-bold">뷰티</div>
        </Link>
        <Link href={`/campaign/visit?categoryName=${encodeURIComponent('숙박')}`}>
          <div className="ck-body-2-bold">숙박</div>
        </Link>
        <Link href={`/campaign/visit?categoryName=${encodeURIComponent('기타')}`}>
          <div className="ck-body-2-bold">기타</div>
        </Link>
      </div>
    </section>
  );
}
