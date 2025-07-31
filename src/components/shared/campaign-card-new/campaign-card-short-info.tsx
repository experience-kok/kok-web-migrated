interface Props {
  productShortInfo: string;
}

/**
 * 캠페인 카드의 한줄 요약 정보 컴포넌트
 * @returns
 */
export default function CampaignCardShortInfo({ productShortInfo }: Props) {
  return <p className="ck-caption-1 text-muted-foreground mb-2 line-clamp-1">{productShortInfo}</p>;
}
