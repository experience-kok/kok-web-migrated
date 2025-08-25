import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {}

/**
 * 지원자 카드 컴포넌트
 */
export default function ApplicantsCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-ck-gray-300 size-8 rounded-full"></div>

            <div className="ck-body-1 ml-2">김현재</div>
          </div>

          {/* 등록한 sns url만 보여주도록 */}
          <div>
            <ul className="flex">
              <li>
                <Button size="icon" variant={'ghost'}>
                  <Image alt="네이버블로그" src={`/sns/blog.svg`} width={28} height={28} />
                </Button>
              </li>
              <li>
                <Button size="icon" variant={'ghost'}>
                  <Image alt="인스타그램" src={`/sns/instagram.svg`} width={28} height={28} />
                </Button>
              </li>
              <li>
                <Button size="icon" variant={'ghost'}>
                  <Image alt="유튜브" src={`/sns/youtube.svg`} width={28} height={28} />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
