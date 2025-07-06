interface Props {
  title: string;
}

/**
 * 캠페인 카드의 제목 컴포넌트
 */
export default function CampaignCardTitle({ title }: Props) {
  return <p className="chkok-text-md line-clamp-2">{title}</p>;
}
