interface Props {
  keywordString?: string;
}

/**
 * '제목 키워드', '본문 키워드'를 태그 목록으로 보여주는 컴포넌트입니다.
 */
export default function MissionKeywords({ keywordString }: Props) {
  const getKeywordsArray = (keywords: string | undefined) => {
    if (!keywords) return [];
    return keywords
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);
  };

  const keywordsArray = getKeywordsArray(keywordString);

  if (keywordsArray.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {keywordsArray.map((keyword, index) => (
        <span
          key={index}
          className="bg-ck-blue-50 text-ck-blue-800 bg-ck-blue-100 inline-block rounded-md px-2 py-1 text-xs"
        >
          #{keyword}
        </span>
      ))}
    </div>
  );
}
