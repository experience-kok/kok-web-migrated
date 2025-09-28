'use client';

import { useState } from 'react';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FloatingInput } from '@/components/ui/floating-input';
import { Input } from '@/components/ui/input';

// 카카오맵 검색 결과 타입 정의
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

// MapPicker가 받을 Props 정의
interface Props {
  address: string; // 현재 선택된 주소 값 (부모로부터 받음)
  lat?: number;
  lng?: number;
  onSelect: (data: { address: string; lat: number; lng: number }) => void;
}

/**
 * 위치 정보 선택을 위한 카카오 맵 피커 컴포넌트입니다.
 * Drawer(바텀 시트) 내에서 카카오맵 키워드 검색을 통해 주소를 선택하고,
 * 선택된 주소와 좌표 정보를 부모 컴포넌트로 전달합니다.
 *
 * @param {object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {string} props.address - 현재 선택되어 있는 주소 값으로, 뷰에 표시됩니다.
 * @param {number} [props.lat] - (선택) 현재 선택된 위치의 위도입니다. Drawer가 열릴 때 이 위치를 중심으로 지도를 표시합니다.
 * @param {number} [props.lng] - (선택) 현재 선택된 위치의 경도입니다. Drawer가 열릴 때 이 위치를 중심으로 지도를 표시합니다.
 * @param {(data: { address: string; lat: number; lng: number }) => void} props.onSelect - 사용자가 주소 선택을 완료했을 때 호출되는 콜백 함수입니다. 선택된 주소, 위도, 경도 정보를 인자로 받습니다.
 */
export default function MapPicker({ address, lat, lng, onSelect }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  // 서울시청 기본값, Drawer 열릴 때 부모의 좌표값으로 업데이트
  const [mapCenter, setMapCenter] = useState({ lat: 37.566826, lng: 126.9786567 });

  // 위치 검색 함수
  const searchPlaces = () => {
    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert('카카오맵 서비스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsSearching(true);
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status) => {
      setIsSearching(false);
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data.slice(0, 15)); // 최대 15개 결과만 표시
        if (data.length > 0) {
          setMapCenter({ lat: parseFloat(data[0].y), lng: parseFloat(data[0].x) });
          setSelectedPlace(null); // 새로운 검색 시 선택 초기화
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setSearchResults([]);
        alert('검색 결과가 없습니다.');
      } else {
        setSearchResults([]);
        alert('검색 중 오류가 발생했습니다.');
      }
    });
  };

  // 키보드 Enter 키로 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPlaces();
    }
  };

  // 검색 결과 목록에서 장소 선택
  const handlePlaceSelect = (place: PlaceResult) => {
    setSelectedPlace(place);
    setMapCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
  };

  // '선택 완료' 버튼 클릭 시
  const handleConfirmSelection = () => {
    if (selectedPlace) {
      // onSelect 콜백을 통해 부모 컴포넌트로 데이터 전달
      onSelect({
        address: selectedPlace.road_address_name || selectedPlace.address_name,
        lat: parseFloat(selectedPlace.y),
        lng: parseFloat(selectedPlace.x),
      });
      // 상태 초기화 및 Drawer 닫기
      setIsDrawerOpen(false);
      setSearchKeyword('');
      setSearchResults([]);
      setSelectedPlace(null);
    }
  };

  // Drawer가 열릴 때의 핸들러
  const handleDrawerOpen = (open: boolean) => {
    if (open) {
      // 기존에 선택된 주소값이 있다면 해당 위치를 지도 중심으로 설정
      if (lat && lng) {
        setMapCenter({ lat, lng });
        setSelectedPlace({
          id: 'current',
          place_name: '현재 선택된 위치',
          road_address_name: address,
          address_name: address,
          phone: '',
          place_url: '',
          x: lng.toString(),
          y: lat.toString(),
        });
      }
    }
    setIsDrawerOpen(open);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpen}>
      <DrawerTrigger asChild className="w-full">
        <div className="relative">
          <FloatingInput label="매장 주소 *" value={address} readOnly className="cursor-pointer" />
        </div>
      </DrawerTrigger>

      <DrawerContent className="h-[85dvh]">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle>매장 주소 검색</DrawerTitle>
        </DrawerHeader>

        <div className="flex h-full flex-col overflow-hidden">
          <div className="border-b p-4">
            <div className="flex gap-2">
              <Input
                placeholder="업체명이나 주소를 검색해주세요"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={searchPlaces} disabled={isSearching} size="lg" className="h-12">
                {isSearching ? '검색중' : '검색'}
              </Button>
            </div>
          </div>

          <div className="h-[30%] border-b">
            <Map center={mapCenter} level={3} style={{ width: '100%', height: '100%' }} draggable>
              {selectedPlace && (
                <MapMarker
                  position={{ lat: parseFloat(selectedPlace.y), lng: parseFloat(selectedPlace.x) }}
                  title={selectedPlace.place_name}
                />
              )}
            </Map>
          </div>

          <div className="flex-1 overflow-y-auto">
            {searchResults.length > 0 && (
              <div className="bg-ck-gray-100 sticky top-0 border-b p-3">
                <p className="ck-body-2">검색 결과 ({searchResults.length}개)</p>
                <p className="ck-caption-2 text-gray-600">업체를 선택해주세요.</p>
              </div>
            )}
            {searchResults.map(place => (
              <div
                key={place.id}
                className={`cursor-pointer border-b px-4 py-2 transition-colors hover:bg-gray-100 ${
                  selectedPlace?.id === place.id
                    ? 'border-l-ck-blue-500 border-l-4 bg-blue-100'
                    : ''
                }`}
                onClick={() => handlePlaceSelect(place)}
              >
                <p className="ck-body-1-bold text-gray-900">{place.place_name}</p>
                <p className="ck-body-2 mt-1 text-gray-600">
                  {place.road_address_name || place.address_name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DrawerFooter className="border-t pt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDrawerOpen(false)}
              className="ck-body-1-bold flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedPlace}
              className="ck-body-1-bold flex-1"
            >
              선택 완료
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
