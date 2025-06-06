export type Discount = {
  amount: number;
  percentage: number;
};

import { SEO } from './seo.types';

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  seo?: SEO;
};
