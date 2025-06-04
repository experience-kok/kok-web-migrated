import { Plus } from 'lucide-react';

import { Text } from '@/components/ui/text';

const SNS_TYPE = {
  YOUTUBE: {
    title: '유튜브 연결하기',
  },
  INSTAGRAM: {
    title: '인스타그램 연결하기',
  },
  NAVER_BLOG: {
    title: '블로그 연결하기',
  },
} as const;

type SnsTypeKey = keyof typeof SNS_TYPE;

interface Props {
  type: SnsTypeKey;
  isRegistration: boolean; // !TODO sns 등록 여부 -> 서버에서 필드명 확정되면 수정 필요
}

/**
 * SNS 카드
 */
export default function SnsCard({ type, isRegistration }: Props) {
  const { title } = SNS_TYPE[type];
  return (
    <div
      className={`flex h-40 w-full flex-1 items-center justify-between rounded-md border-[1px] px-6 py-4 ${
        isRegistration ? 'border-solid' : 'border-dashed'
      }`}
    >
      <Text size="lg" weight="bold" color="muted-foreground">
        {title}
      </Text>

      <Plus size={16} className="text-muted-foreground" />
    </div>
  );
}
