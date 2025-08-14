'use client';

import { useState, useEffect } from 'react';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetSearchRealtime, useGetSearchSuggestions } from '@/service/campaigns/campaigns-query';

import { useDebounce } from '@/hooks/use-debounce';

import SuggestItem from './suggest-item';

interface CampaignSearchProps {
  onClose?: () => void;
}

/**
 * 캠페인 검색
 */
export default function CampaignSearch({ onClose }: CampaignSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { data: searchRealtimeList } = useGetSearchRealtime();
  console.log(searchRealtimeList);

  // 디바운스 처리 (200ms 지연)
  const debouncedQuery = useDebounce(searchQuery, 400);

  // URL 업데이트 (디바운스된 쿼리 기준)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedQuery.trim()) {
      params.set('q', debouncedQuery.trim());
    } else {
      params.delete('q');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // 현재 URL과 다를 때만 업데이트
    if (window.location.search !== `?${params.toString()}`) {
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedQuery, router]);

  const { data: { suggestions } = { suggestions: [] } } = useGetSearchSuggestions(debouncedQuery);

  // 검색 쿼리 설정
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 키보드 입력 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/campaign/search?keyword=${searchQuery}`);
      onClose?.();
    }
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  // 추천 검색어 입력
  const handleSuggestClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(`/campaign/search?keyword=${suggestion}`);
    onClose?.();
  };

  const handleResetQuery = () => {
    setSearchQuery('');
  };

  // 표시할 목록 결정
  const getDisplayList = () => {
    if (searchQuery.trim()) {
      if (suggestions.length > 0) {
        // 검색어가 있고 결과가 있는 경우
        return { list: suggestions, type: 'suggestions' as const, hasResults: true };
      } else {
        // 검색어는 있는데 결과가 없는 경우
        return { list: [], type: 'suggestions' as const, hasResults: false };
      }
    } else {
      // 검색어가 없는 경우
      return {
        list: searchRealtimeList || [],
        type: 'realtime' as const,
        hasResults: true,
      };
    }
  };

  const { list, type, hasResults } = getDisplayList();

  return (
    <div className="relative w-full">
      {/* 검색 입력창 */}
      <div className="relative">
        <Input
          type="text"
          placeholder="검색어를 입력해주세요..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          autoFocus
          className="focus:border-primary ck-body-1 w-full rounded-lg border-2 px-4 py-4 pr-20 focus:outline-none"
        />

        {/* 검색어 초기화 버튼 */}
        {searchQuery && (
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={handleResetQuery}
            className="hover:bg-ck-gray-300 absolute top-1/2 right-3 -translate-y-1/2 p-1 transition-colors"
          >
            <X className="text-ck-gray-700 h-5 w-5" />
          </Button>
        )}
      </div>

      {/* 검색 결과 목록 */}
      <div className="border-ck-gray-300 absolute top-full right-0 left-0 z-10 mt-2 max-h-80 overflow-y-auto rounded-lg border bg-white shadow-xl">
        {type === 'suggestions' && hasResults ? (
          // 검색어가 있고 결과가 있는 경우
          <div className="py-2">
            {list.map((item, index) => (
              <SuggestItem
                key={`${item}-${index}`}
                label={item}
                searchQuery={debouncedQuery}
                onClick={() => handleSuggestClick(item)}
              />
            ))}
          </div>
        ) : type === 'suggestions' && !hasResults ? (
          // 검색어는 있는데 결과가 없는 경우
          <div className="text-ck-gray-700 px-4 py-6 text-center text-sm">검색 결과가 없어요.</div>
        ) : type === 'realtime' && list.length > 0 ? (
          // 검색어가 없고 실시간 검색어가 있는 경우
          <div className="py-2">
            <div className="ck-body-2-bold border-b border-gray-100 px-4 py-2 text-gray-700">
              실시간 검색어
            </div>
            {list.map((item, index) => (
              <SuggestItem
                key={`${item}-${index}`}
                label={item}
                searchQuery=""
                type="realtime"
                onClick={() => handleSuggestClick(item)}
              />
            ))}
          </div>
        ) : (
          // 검색어가 없고 실시간 검색어도 없는 경우
          <div className="px-4 py-6 text-center text-sm text-gray-500">실시간 검색어가 없어요.</div>
        )}
      </div>
    </div>
  );
}
