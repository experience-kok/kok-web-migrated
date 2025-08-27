import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { SNSPlatformType } from '@/types/users/models';

// SNS 플랫폼 정보 타입
interface SNSPlatform {
  platformType: SNSPlatformType;
  snsUrl: string;
}

interface Props {
  snsAccounts: SNSPlatform[]; // 지원자의 SNS 계정 목록
}

// SNS 타입별 아이콘과 라벨 매핑
const SNS_INFO = {
  BLOG: {
    icon: '/sns/blog.svg',
    alt: '네이버블로그',
  },
  INSTAGRAM: {
    icon: '/sns/instagram.svg',
    alt: '인스타그램',
  },
  YOUTUBE: {
    icon: '/sns/youtube.svg',
    alt: '유튜브',
  },
  // TIKTOK: {
  //   icon: '/sns/tiktok.svg',
  //   alt: '틱톡',
  // },
} as const;

/**
 * 지원자 SNS 정보
 */
export default function ApplicantsSNS({ snsAccounts }: Props) {
  // SNS 링크 클릭 핸들러
  const handleSNSClick = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  // 모든 SNS 플랫폼 목록 (SNS_INFO에 정의된 키만 사용)
  const allPlatforms = Object.keys(SNS_INFO) as Array<keyof typeof SNS_INFO>;

  return (
    <>
      <div>
        <ul className="flex gap-0.5">
          {allPlatforms.map(platformType => {
            const snsInfo = SNS_INFO[platformType];
            const registeredSNS = snsAccounts.find(
              sns => sns.platformType === (platformType as unknown as SNSPlatformType),
            );
            const hasUrl =
              registeredSNS && registeredSNS.snsUrl && registeredSNS.snsUrl.trim() !== '';

            return (
              <li key={platformType}>
                <Button
                  size="icon"
                  variant={'ghost'}
                  onClick={() => handleSNSClick(registeredSNS?.snsUrl || '')}
                  title={hasUrl ? `${snsInfo.alt} 페이지로 이동` : `${snsInfo.alt} (등록되지 않음)`}
                  disabled={!hasUrl}
                  className={!hasUrl ? 'cursor-not-allowed' : ''}
                >
                  <Image
                    alt={snsInfo.alt}
                    src={snsInfo.icon}
                    width={24}
                    height={24}
                    className={!hasUrl ? 'opacity-40 grayscale' : ''}
                  />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
