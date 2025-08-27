'use client';

import { useGetUserMissionHistory } from '@/service/campaigns/campaigns-query';

import MissionHistoryCard from './mission-history-card';

interface Props {
  userId: number;
}

/**
 * 미션 이력 목록
 */
export default function MissionHistoryList({ userId }: Props) {
  const { data: missionHistory } = useGetUserMissionHistory(userId);

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="ck-caption-1 text-gray-600">아래의 카드를 클릭하면 주소로 이동해요.</p>
        <p className="ck-caption-1 text-gray-600">
          {missionHistory?.histories.length || 0}개의 미션 이력
        </p>
      </div>

      {/* 최대 4개 카드가 보이는 스크롤 컨테이너 */}
      <div className="bg-ck-gray-100 h-96 overflow-y-auto rounded-[12px] border p-4">
        <div className="flex flex-col space-y-3">
          {missionHistory.histories?.map(mission => (
            <MissionHistoryCard key={mission.id} mission={mission.mission} />
          ))}
          {/* 데이터가 없을 때 */}
          {(!missionHistory || missionHistory.histories.length === 0) && (
            <div className="text-ck-gray-700 flex h-32 items-center justify-center">
              <div className="text-center">
                <p className="ck-body-2">미션 이력이 없어요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
