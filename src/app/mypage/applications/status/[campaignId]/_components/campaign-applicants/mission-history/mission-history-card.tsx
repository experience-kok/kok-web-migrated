import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

import { ClientMission } from '@/types/campaigns/models';

interface Props {
  mission: ClientMission;
}

/**
 * 미션 이력 카드
 */
export default function MissionHistoryCard({ mission }: Props) {
  const { missionUrl, isCompleted } = mission;

  return (
    <Link href={missionUrl}>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="max-w-[150px] truncate text-sm text-gray-900">{missionUrl}</div>

            <div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {isCompleted ? '완료' : '미완료'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
