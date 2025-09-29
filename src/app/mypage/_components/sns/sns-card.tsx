import { SNSPlatformType } from '@/types/users/models';

import SNSConnectDialog from './sns-connect-dialog';
import SNSRemoveDialog from './sns-remove-dialog';

const SNS_TYPE = {
  YOUTUBE: {
    title: '유튜브 연결하기',
    connectedTitle: '유튜브',
    koreanName: '유튜브',
  },
  INSTAGRAM: {
    title: '인스타그램 연결하기',
    connectedTitle: '인스타그램',
    koreanName: '인스타그램',
  },
  BLOG: {
    title: '블로그 연결하기',
    connectedTitle: '블로그',
    koreanName: '블로그',
  },
} as const;

interface Props {
  platform: {
    platformType: SNSPlatformType;
    isConnected: boolean;
    id?: number;
    accountUrl?: string;
  };
}

/**
 * SNS 카드
 */
export default function SnsCard({ platform }: Props) {
  const { platformType, isConnected, accountUrl } = platform;

  // TIKTOK는 제외하고 처리
  if (platformType === 'TIKTOK') {
    return null;
  }

  const snsInfo = SNS_TYPE[platformType];

  if (!snsInfo) {
    return null; // 지원하지 않는 플랫폼의 경우
  }

  const { title } = snsInfo;

  // 플랫폼별 연결된 상태 스타일
  const getConnectedBackgroundStyle = (type: SNSPlatformType) => {
    if (!isConnected) return 'border-dashed border-gray-300 bg-white';

    switch (type) {
      case 'YOUTUBE':
        return 'bg-red-500';
      case 'BLOG':
        return 'bg-green-500';
      case 'INSTAGRAM':
        return 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500';
      default:
        return 'bg-gray-300';
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    if (isConnected && accountUrl) {
      window.open(accountUrl, '_blank');
    }
  };

  return (
    <>
      <div
        className={`flex h-40 w-full flex-1 items-center justify-between rounded-[12px] px-4 py-3 ${
          isConnected ? 'cursor-pointer' : ''
        } ${getConnectedBackgroundStyle(platformType)} ${!isConnected ? 'border-[1px]' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flex flex-col gap-1">
          {!isConnected && accountUrl === null && (
            <span className={`ck-body-2-bold ck-gray-700`}>{title}</span>
          )}

          {isConnected && accountUrl && (
            <span className={`ck-body-2-bold max-w-[280px] truncate text-white/80`}>
              {accountUrl}
            </span>
          )}
        </div>
        <div onClick={e => e.stopPropagation()}>
          {isConnected && platform.id ? (
            <SNSRemoveDialog snsId={platform.id} />
          ) : (
            <SNSConnectDialog currentPlatform={platformType} />
          )}
        </div>
      </div>
    </>
  );
}
