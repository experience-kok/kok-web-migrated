'use client';

import { useState, useEffect } from 'react';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useGetSearchSuggestions } from '@/service/campaigns/campaigns-query';

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

  // 디바운스 처리 (200ms 지연)
  const debouncedQuery = useDebounce(searchQuery, 200);

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

  const handleSuggestClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(`/campaign/search?keyword=${suggestion}`);
    onClose?.();
  };

  const handleResetQuery = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      {/* 검색 입력창 */}
      <div className="relative">
        <input
          type="text"
          placeholder="검색어를 입력해주세요..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          autoFocus
          className="focus:border-primary w-full rounded-lg border-2 border-gray-300 px-4 py-4 pr-20 text-lg focus:outline-none"
        />

        {/* 검색어 초기화 버튼 */}
        {searchQuery && (
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={handleResetQuery}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        )}
      </div>

      {/* 검색 결과 목록 */}
      {(searchQuery.trim() || suggestions.length > 0) && (
        <div className="absolute top-full right-0 left-0 z-10 mt-2 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
          {suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((suggest, index) => (
                <SuggestItem
                  key={`${suggest}-${index}`}
                  label={suggest}
                  searchQuery={debouncedQuery} // 검색어 전달
                  onClick={() => handleSuggestClick(suggest)}
                />
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">검색 결과가 없어요.</div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              검색어를 입력해주세요.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
