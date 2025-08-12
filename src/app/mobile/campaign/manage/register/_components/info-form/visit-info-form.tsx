import { useState } from 'react';

import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CampaignCreateForm } from '@/schemas/campaign.schemas';

interface Props {
  register: UseFormRegister<CampaignCreateForm>;
  errors: FieldErrors<CampaignCreateForm>;
  setValue: UseFormSetValue<CampaignCreateForm>;
  watch?: UseFormWatch<CampaignCreateForm>;
}

interface PlaceResult {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  x: string; // longitude
  y: string; // latitude
}

/**
 * 캠페인 등록 페이지 방문 정보 등록 컴포넌트
 */
export default function VisitInfoForm({ register, errors, setValue }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5126, lng: 127.1025 }); // 서울시청 기본값

  // 위치 검색 함수
  const searchPlaces = () => {
    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    // 카카오 sdk 로드 실패시
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert('카카오맵 서비스를 불러올 수 없습니다.');
      return;
    }

    setIsSearching(true);
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data: PlaceResult[], status: string) => {
      setIsSearching(false);

      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data.slice(0, 15));
        if (data.length > 0) {
          setMapCenter({
            lat: parseFloat(data[0].y),
            lng: parseFloat(data[0].x),
          });
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        setSearchResults([]);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
        setSearchResults([]);
      }
    });
  };

  const handlePlaceSelect = (place: PlaceResult) => {
    setSelectedPlace(place);
    console.log(place);
    // 선택된 장소로 맵 중앙 이동
    setMapCenter({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    });
  };

  const handleConfirmSelection = () => {
    console.log(selectedPlace, setValue);
    if (selectedPlace && setValue) {
      console.log(selectedPlace);
      setValue('businessAddress', selectedPlace.road_address_name || selectedPlace.address_name);
      setValue('lat', parseFloat(selectedPlace.y)); // 위도
      setValue('lng', parseFloat(selectedPlace.x)); // 경도
    }

    setIsDialogOpen(false);
    setSearchKeyword('');
    setSearchResults([]);
    setSelectedPlace(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPlaces();
    }
  };

  return (
    <div className="space-y-3">
      {/* 공식 홈페이지 주소 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">공식 홈페이지 주소</div>
        <Input {...register('homepage')} placeholder="https://chkok.kr" />
        {errors.homepage && (
          <p className="text-ck-red-500 ck-caption-1">{errors.homepage.message}</p>
        )}
      </div>

      {/* 연락처 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          연락처 <span className="text-ck-red-500">*</span>
        </div>
        <Input {...register('contactPhone')} placeholder="010-1234-1234" />
        {errors.contactPhone && (
          <p className="text-ck-red-500 ck-caption-1">{errors.contactPhone.message}</p>
        )}
      </div>

      {/* 방문 및 예약안내 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          방문 및 예약안내 <span className="text-ck-red-500">*</span>
        </div>
        <Textarea
          {...register('visitAndReservationInfo')}
          placeholder={`[인플루언서 방문가능시간] 평일 12:00~14:00 사이
[영업시간] 화~일 10:00 ~ 22:00

방문 최소 2일 전 예약 필수 / 당일 예약 불가`}
          className="min-h-[200px]"
        />
        {errors.visitAndReservationInfo && (
          <p className="text-ck-red-500 ck-caption-1">{errors.visitAndReservationInfo.message}</p>
        )}
      </div>

      {/* 위치 정보 */}
      <div className="space-y-2">
        <div className="ck-body-2-bold mb-1">
          위치 정보 <span className="text-ck-red-500">*</span>
        </div>
        <Input {...register('businessAddress')} placeholder="주소가 여기에 표시됩니다" readOnly />
        {errors.businessAddress && (
          <p className="text-ck-red-500 ck-caption-1">{errors.businessAddress.message}</p>
        )}
        <Input {...register('businessDetailAddress')} placeholder="OOO빌딩 2층 205호" />
        {errors.businessDetailAddress && (
          <p className="text-ck-red-500 ck-caption-1">{errors.businessDetailAddress.message}</p>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="ck-body-2 w-full">
              위치 검색
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[90dvw] max-w-none gap-0 p-0">
            <DialogHeader className="h-fit border-b p-4">
              <DialogTitle>위치 검색</DialogTitle>
            </DialogHeader>

            <div className="flex h-[60dvh] flex-col">
              {/* 검색 영역 */}
              <div className="border-b p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="업체명이나 주소를 검색하세요"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={searchPlaces} disabled={isSearching} className="ck-body-2">
                    {isSearching ? '검색' : '검색'}
                  </Button>
                </div>
              </div>

              {/* 지도 영역 */}
              <div className="flex-1">
                <Map
                  center={mapCenter}
                  level={3}
                  style={{ width: '100%', height: '100%' }}
                  draggable={true}
                >
                  {/* 선택된 장소의 마커만 표시 */}
                  {selectedPlace && (
                    <MapMarker
                      position={{
                        lat: parseFloat(selectedPlace.y),
                        lng: parseFloat(selectedPlace.x),
                      }}
                      title={selectedPlace.place_name}
                      image={{
                        src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                        size: { width: 40, height: 40 },
                        options: { offset: { x: 20, y: 40 } },
                      }}
                    />
                  )}
                </Map>
              </div>

              {/* 검색 결과 목록 */}
              <div className="max-h-60 flex-1 overflow-y-auto border-t bg-white">
                {searchResults.length > 0 && (
                  <>
                    <div className="bg-ck-gray-200 border-b p-3">
                      <div className="ck-body-2">검색 결과 ({searchResults.length}개)</div>
                      <div className="text-ck-gray-700 ck-caption-1">업체를 선택해주세요</div>
                    </div>

                    <div className="space-y-1">
                      {searchResults.map(place => (
                        <div
                          key={place.id}
                          className={`cursor-pointer border-b p-3 last:border-b-0 hover:bg-gray-50 ${
                            selectedPlace?.id === place.id
                              ? 'bg-ck-blue-100 border-ck-blue-200'
                              : ''
                          }`}
                          onClick={() => handlePlaceSelect(place)}
                        >
                          <div className="text-ck-gray-900 ck-body-2-bold">{place.place_name}</div>
                          <div className="text-ck-gray-800 ck-caption-2 mt-1">
                            {place.road_address_name || place.address_name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <DialogFooter>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="ck-body-1-bold text-ck-gray-700 bg-ck-gray-200 h-[53px] flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleConfirmSelection}
                    disabled={!selectedPlace}
                    className="ck-body-1-bold h-[53px] flex-1"
                  >
                    선택 완료
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 위치 상세 정보 */}
      <div className="space-y-2"></div>
    </div>
  );
}
