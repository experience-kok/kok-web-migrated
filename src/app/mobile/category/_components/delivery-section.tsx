import Link from 'next/link';

/**
 * 캠페인 페이지 배송 카테고리 영역
 */
export default function DeliverySection() {
  return (
    <section className="mt-10 px-5">
      <p className="ck-caption-1">배송 캠페인</p>
      <div className="mt-2 grid grid-cols-2 gap-4 rounded-[12px] bg-white px-5 py-2.5 shadow-[0_0_8px_0_rgba(0,0,0,0.05)]">
        <Link href={`/campaign/delivery?categoryName=${encodeURIComponent('식품')}`}>
          <div className="ck-body-2-bold">식품</div>
        </Link>
        <Link href={`/campaign/delivery?categoryName=${encodeURIComponent('화장품')}`}>
          <div className="ck-body-2-bold">화장품</div>
        </Link>
        <Link href={`/campaign/delivery?categoryName=${encodeURIComponent('생활용품')}`}>
          <div className="ck-body-2-bold">생활용품</div>
        </Link>
        <Link href={`/campaign/delivery?categoryName=${encodeURIComponent('패션')}`}>
          <div className="ck-body-2-bold">패션</div>
        </Link>
        <Link href={`/campaign/delivery?categoryName=${encodeURIComponent('잡화')}`}>
          <div className="ck-body-2-bold">잡화</div>
        </Link>
      </div>
    </section>
  );
}
