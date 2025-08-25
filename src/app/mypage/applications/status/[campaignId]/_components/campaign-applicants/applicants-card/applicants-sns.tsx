import Image from 'next/image';

import { Button } from '@/components/ui/button';

/**
 * 지원자 SNS 정보
 */
export default function ApplicantsSNS() {
  return (
    <>
      {/* 등록한 sns url만 보여주도록 */}
      <div>
        <ul className="flex gap-0.5">
          <li>
            <Button size="icon" variant={'ghost'}>
              <Image alt="네이버블로그" src={`/sns/blog.svg`} width={24} height={24} />
            </Button>
          </li>
          <li>
            <Button size="icon" variant={'ghost'}>
              <Image alt="인스타그램" src={`/sns/instagram.svg`} width={24} height={24} />
            </Button>
          </li>
          <li>
            <Button size="icon" variant={'ghost'}>
              <Image alt="유튜브" src={`/sns/youtube.svg`} width={24} height={24} />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
