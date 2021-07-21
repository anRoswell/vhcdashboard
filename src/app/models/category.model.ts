import { ISeo } from './seo.model';

export interface ICategory {
  name: string;
  slug: string;
  description: string;
  seo: ISeo;
  status: boolean;
  id?: number;
  categoryId?: number;
  imageUrl?: string;
}
