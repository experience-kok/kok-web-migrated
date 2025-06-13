import { Text } from '@/components/ui/text';

import SnsCard from './sns-card';

export default function Sns() {
  return (
    <>
      <section className="px-6 py-10">
        <Text as="h2" size="xl" weight="bold" className="mb-4">
          등록된 SNS
        </Text>

        <div className="flex flex-col items-center justify-between gap-2">
          <SnsCard type="NAVER_BLOG" isRegistration={true} />
          <SnsCard type="INSTAGRAM" isRegistration={false} />
          <SnsCard type="YOUTUBE" isRegistration={true} />
        </div>
      </section>
    </>
  );
}
