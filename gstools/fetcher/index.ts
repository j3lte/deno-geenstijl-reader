import { HEADERS } from "../consts.ts";

export type FetcherOutput = {
  error?: Error;
  data: string;
};

export const htmlFetcher = async (url: string): Promise<FetcherOutput> => {
  try {
    const res = await fetch(url, {
      headers: HEADERS,
    });
    const data = await res.text();
    return {
      data,
    };
  } catch (error) {
    return {
      error,
      data: "",
    };
  }
};
