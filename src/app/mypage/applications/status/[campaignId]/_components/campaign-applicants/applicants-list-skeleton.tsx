import { Skeleton } from '@/components/ui/skeleton';

export default function ApplicantsListSkeleton() {
  return (
    <>
      <Skeleton className="ck-body-2 mb-4 h-5 w-24" />

      <div
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[500px] overflow-y-auto"
        style={{
          maxHeight: 'calc(5 * (100px + 12px))',
        }}
      >
        <div className="grid gap-3 pr-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={`applicants-skeleton-${index}`} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
    </>
  );
}
