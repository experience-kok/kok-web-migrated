import { Package, HomeIcon } from 'lucide-react';

import { type CampaignCategoryType } from '@/models/campaign';

interface CampaignCategoryTypeBadgeProps {
  type: CampaignCategoryType;
}

/**
 * 캠페인 타입 뱃지 컴포넌트
 */
export default function CampaignCategoryTypeBadge({ type }: CampaignCategoryTypeBadgeProps) {
  const getIconAndText = () => {
    switch (type) {
      case '방문':
        return {
          icon: <HomeIcon className="size-4" />,
          text: '방문형',
        };
      case '배송':
        return {
          icon: <Package className="size-4" />,
          text: '배송형',
        };
    }
  };

  const { icon, text } = getIconAndText();

  return (
    <div
      className={`ck-caption-1-bold text-ck-gray-700 inline-flex items-center gap-1.5 rounded-[12px] border-[1px] bg-white px-2.5 py-1.5`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </div>
  );
}
