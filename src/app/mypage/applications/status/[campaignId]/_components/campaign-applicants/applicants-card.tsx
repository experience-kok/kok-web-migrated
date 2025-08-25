import { EllipsisVertical, UserCheck, UserX, FileText, CheckCircle, Edit3 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useURLParams } from '@/hooks/use-url-params';

import { UserApplicationCampaignStatus } from '@/types/campaigns/models';

interface Props {
  status: UserApplicationCampaignStatus;
}

/**
 * 지원자 카드 컴포넌트
 */
export default function ApplicantsCard({ status }: Props) {
  console.log(status);
  // 상태별 드롭다운 메뉴 렌더링
  const renderDropdownItems = () => {
    switch (status) {
      case 'PENDING':
        return (
          <>
            <DropdownMenuItem className="flex items-center gap-2">
              <UserCheck className="size-4 text-green-500" />
              <span>선정하기</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <UserX className="text-ck-red-500 size-4" />
              <span>거절하기</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <FileText className="text-ck-blue-500 size-4" />
              <span>지원자 미션 기록</span>
            </DropdownMenuItem>
          </>
        );
      case 'SELECTED':
        return (
          <>
            <DropdownMenuItem className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>최종확정하기</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Edit3 className="size-4 text-orange-500" />
              <span>수정요청하기</span>
            </DropdownMenuItem>
          </>
        );
      default:
        return (
          <DropdownMenuItem className="flex items-center gap-2">
            <FileText className="text-ck-blue-500 size-4" />
            <span>지원자 미션 기록</span>
          </DropdownMenuItem>
        );
    }
  };

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
            <ul className="flex gap-1">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant={'ghost'}>
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>{renderDropdownItems()}</DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
