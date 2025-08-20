'use client';

import { useState } from 'react';

import { MapPin, Link as LinkIcon, Clock, Phone, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { GetCampaignLocationInfoResponse } from '@/service/campaigns/types';

interface Props {
  locationData: GetCampaignLocationInfoResponse;
}

/**
 * 캠페인 기본 정보 컴포넌트
 */
export default function CampaignVisitInfo({ locationData }: Props) {
  console.log(locationData);
  const {
    businessAddress,
    businessDetailAddress,
    contactPhone,
    homepage,
    lat,
    lng,
    visitAndReservationInfo,
  } = locationData;
  const [copied, setCopied] = useState(false);
  const address = `${businessAddress} ${businessDetailAddress}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.info('주소를 복사했어요.', {
        position: 'top-center',
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 원래 상태로
    } catch (err) {
      console.error('주소 복사 실패:', err);
    }
  };

  return (
    <section className="px-5 pt-8 pb-5">
      <div className="ck-sub-title-1">방문 정보</div>

      {/* 지도 컨테이너 - overflow-hidden 추가 */}
      <div className="mt-2 w-full overflow-hidden rounded-[12px]">
        <Map center={{ lat, lng }} style={{ width: '100%', height: '240px' }}>
          <MapMarker position={{ lat, lng }}></MapMarker>
        </Map>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <MapPin className="text-ck-gray-700 w-3.5" />
        <div className="ck-body-2">{address}</div>
      </div>

      {/* 주소 복사 버튼 */}
      <Button variant={'outline'} onClick={handleCopyAddress} className="mt-3 w-full">
        {copied ? (
          <>
            <Check className="w-3.5 text-green-600" />
            <span className="ck-caption-1 text-green-600">주소 복사 완료!</span>
          </>
        ) : (
          <>
            <Copy className="text-ck-gray-700 w-3.5" />
            <span className="ck-caption-1 text-ck-gray-700">주소 복사하기</span>
          </>
        )}
      </Button>

      <div className="mt-3 flex flex-col gap-2">
        {contactPhone && (
          <div className="flex items-center gap-2">
            <Phone className="text-ck-gray-700 w-3.5" />
            <a href={`tel:${contactPhone}`} className="ck-body-2 underline">
              {contactPhone}
            </a>
          </div>
        )}

        {homepage && (
          <div className="flex items-center gap-2">
            <LinkIcon className="text-ck-gray-700 w-3.5" />
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="ck-body-2 underline"
            >
              공식 홈페이지 바로가기
            </Link>
          </div>
        )}

        {visitAndReservationInfo && (
          <div className="flex items-center gap-2 whitespace-pre-line">
            <Clock className="text-ck-gray-700 w-3.5" />
            <div className="ck-body-2">{visitAndReservationInfo}</div>
          </div>
        )}
      </div>
    </section>
  );
}
