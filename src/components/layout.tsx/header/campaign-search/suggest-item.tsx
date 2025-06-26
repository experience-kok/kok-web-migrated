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
        <mark key={index} className="bg-primary/30 text-foreground rounded px-1 font-medium">
          {part}
        </mark>
      );
    }
    return part;
  });
}

export default function SuggestItem({ label, searchQuery, type, onClick }: SuggestItemProps) {
  const highlightedLabel = searchQuery ? highlightSearchTerm(label, searchQuery) : label;
  console.log(type);

  return (
    <div
      className="group hover:bg-primary/5 cursor-pointer border-b border-gray-50 px-4 py-3 transition-all duration-200 last:border-b-0"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex-shrink-0 transition-all duration-200`}>
            <Search className="h-5 w-5" />
          </div>

          <span className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
            {highlightedLabel}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {type === 'realtime' && (
            <div className="ml-auto">
              <span className="bg-primary/10 text-primary group-hover:bg-primary/20 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-colors duration-200">
                인기
              </span>
            </div>
          )}

          {/* 호버 시 화살표 */}
          <div className="ml-auto translate-x-2 transform opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            <svg
              className="h-4 w-4 text-gray-400"
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
