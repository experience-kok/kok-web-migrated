'use client';

import { useGetSNSPlatforms } from '@/service/users/users-query';

import SnsCard from './sns-card';

export default function Sns() {
  const { data: snsList } = useGetSNSPlatforms();

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2">
        {snsList.platforms.map((platform, index) => (
          <SnsCard platform={platform} key={platform.id || index} />
        ))}
      </div>
    </>
  );
}
