import SnsCard from './sns-card';

export default function Sns() {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2">
        <SnsCard type="NAVER_BLOG" isRegistration={true} />
        <SnsCard type="INSTAGRAM" isRegistration={false} />
        <SnsCard type="YOUTUBE" isRegistration={true} />
      </div>
    </>
  );
}
