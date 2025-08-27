import { PropsWithChildren } from 'react';

import { Badge } from '@/components/ui/badge';
import { CampaignType } from '@/models/campaign';

const BADGE_TYPE: Record<CampaignType, { label: string; style: string }> = {
  // 유튜브
  유튜브: {
    label: '유튜브',
    style: 'bg-red-100 text-red-500',
  },
  // 네이버 블로그
  블로그: {
    label: '블로그',
    style: 'bg-green-100 text-green-500',
  },
  // 인스타그램
  인스타그램: {
    label: '인스타그램',
    style: 'bg-pink-100 text-pink-500',
  },
  // 틱톡
  // 틱톡: {
  //   label: '틱톡',
  //   style: 'bg-black text-white',
  // },
} as const;

interface Props extends PropsWithChildren {
  campaignType: CampaignType;
}

export default function CampaignCardBadge({ campaignType, children }: Props) {
  const { label, style } = BADGE_TYPE[campaignType];

  return (
    <Badge className={`hover:none font-semibold ${style}`} variant="secondary">
      {children ?? label}
    </Badge>
  );
}
