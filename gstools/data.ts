import { URLS } from "./consts.ts";
import { htmlFetcher } from "./fetcher/index.ts";
import { parseArchive, parseArchives } from "./parse/archive.ts";
import { parseArticle } from "./parse/article.ts";
import { ArchiveEntry, Article } from "./types.ts";

export const getArchives = async () => {
  try {
    const { data, error } = await htmlFetcher(URLS.archives);
    if (error || !data) {
      throw error || new Error(`Data is empty when fetching ${URLS.archives}`);
    }
    return parseArchives(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArchive = async (
  year: number,
  month: number
): Promise<ArchiveEntry[]> => {
  try {
    const url =
      URLS.archive + year + "/" + (month < 10 ? "0" : "") + month + "/";
    const { data, error } = await htmlFetcher(url);
    if (error || !data) {
      throw error || new Error(`Data is empty when fetching ${url}`);
    }
    return parseArchive(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArticle = async (url: string): Promise<Article> => {
  try {
    const { data, error } = await htmlFetcher(url);
    if (error || !data) {
      throw error || new Error(`Data is empty when fetching ${url}`);
    }
    return parseArticle(data, url);
  } catch (error) {
    console.error(error);
    return {
      url,
    };
  }
};
