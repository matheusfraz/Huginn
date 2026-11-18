export type Book = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export type SearchResponse = {
  numFound: number;
  docs: Book[];
};
