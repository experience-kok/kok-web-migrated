import Image from 'next/image';

interface Props {
  thumbnailUrl: string;
}

/**
 * 캠페인 썸네일 컴포넌트
 * @returns
 */
export default function CampaignThumbnail({ thumbnailUrl }: Props) {
  return <Image src={thumbnailUrl} alt="썸네일 이미지" fill className="object-cover" />;
}
