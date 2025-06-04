import { fetcher } from '@/lib/fetcher';
import { Banner } from '@/models/banner';

export async function getBanners() {
  const response = await fetcher.get<Banner[]>(`/banners`);

  return response;
}
