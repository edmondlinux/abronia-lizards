
export type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

export type SEO = {
  title: string;
  description: string;
  keywords?: string[];
  metaTags: MetaTag[];
};
