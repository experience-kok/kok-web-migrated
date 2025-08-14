'use client';

import { Search } from 'lucide-react';

interface SuggestItemProps {
  label: string;
  searchQuery?: string;
  type?: 'suggestion' | 'realtime';
  onClick?: () => void;
}

// 검색어를 강조하는 헬퍼 함수
function highlightSearchTerm(text: string, searchTerm: string) {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <mark
          key={index}
          className="bg-ck-blue-500/30 text-ck-gray-900 ck-body-1-bold rounded px-1"
        >
          {part}
        </mark>
      );
    }
    return part;
  });
}

export default function SuggestItem({ label, searchQuery, type, onClick }: SuggestItemProps) {
  const highlightedLabel = searchQuery ? highlightSearchTerm(label, searchQuery) : label;

  return (
    <div
      className="group hover:bg-primary/5 cursor-pointer border-b border-gray-50 px-4 py-3 transition-all duration-200 last:border-b-0"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex-shrink-0 transition-all duration-200`}>
            <Search className="h-4 w-4" />
          </div>

          <span className="text-ck-gray-900 ck-body-2 line-clamp-1 w-[200px] transition-colors duration-200">
            {highlightedLabel}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {type === 'realtime' && (
            <div className="ml-auto">
              <span className="bg-ck-blue-500/10 text-ck-blue-500 group-hover:bg-ck-blue-500/20 ck-caption-2 inline-flex items-center rounded-full px-2 py-1 transition-colors duration-200">
                인기
              </span>
            </div>
          )}

          {/* 호버 시 화살표 */}
          <div className="ml-auto hidden translate-x-2 transform opacity-0 transition-all duration-200 group-hover:block group-hover:translate-x-0 group-hover:opacity-100">
            <svg
              className="text-ck-gray-600 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
