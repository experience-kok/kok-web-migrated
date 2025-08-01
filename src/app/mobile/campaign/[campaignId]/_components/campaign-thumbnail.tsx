import Image from 'next/image';

interface Props {
  thumnailUrl: string;
}

/**
 * 캠페인 썸네일 컴포넌트
 * @returns
 */
export default function CampaignThumbnail({ thumnailUrl }: Props) {
  return <Image src={thumnailUrl} alt="썸네일 이미지" fill className="object-cover" />;
}
