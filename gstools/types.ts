export type ArchiveOverviewEntry = {
  num: number;
  monthStr: string;
  year: number;
  month: number;
  url: string;
};

export type ArchiveEntry = {
  date: string;
  title: string;
  link: string;
  link_encoded: string;
};

export type Link = {
  index?: number;
  text: string;
  href: string;
};

export type Comment = {
  index: number;
  id?: string;
  text?: string;
  html?: string;
  author?: string;
  date?: string;
  time?: string;
  comments?: Comment[];
  redacted?: boolean;
  userBanned?: boolean;
};

export type Article = {
  url: string;
  url_encoded: string;
  id?: string;
  index?: number;
  title?: string;
  img?: string;
  imgs?: string[];
  author?: string;
  date?: string;
  year?: number;
  month?: number;
  day?: number;
  time?: string;
  html?: string;
  text?: string[];
  links?: Link[];
  comments?: Comment[];
};
