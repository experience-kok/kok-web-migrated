import { fetcher } from '@/lib/fetcher';
import { Banner } from '@/models/banner';

export async function getBanners() {
  const response = await fetcher.get<Banner[]>(`/banners`, {
    next: { revalidate: 60 },
  });

  return response;
}
