import Image from 'next/image';

interface Props {
  profileUrl: string;
  nickname: string;
}

/**
 * 지원자 정보 박스 컴포넌트
 */
export default function ApplicantsInfoBox({ profileUrl, nickname }: Props) {
  return (
    <>
      <div className="flex items-center">
        <Image src={profileUrl} alt={`${nickname}의 프로필 사진`} width={48} height={48} />

        <div className="ck-body-1 ml-2">{nickname}</div>
      </div>
    </>
  );
}
