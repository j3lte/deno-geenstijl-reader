import { encode } from "encoding/base64url.ts";
import { ArchiveEntry, ArchiveOverviewEntry } from "../types.ts";
import { getHTMLDocument, nodeListEach } from "./util.ts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const parseArchives = async (
  body: string
): Promise<ArchiveOverviewEntry[]> => {
  if (!body || body.length === 0) {
    return [];
  }
  const doc = await getHTMLDocument(body);

  const links = doc.querySelectorAll("nav ul.nav-list a");
  const linkArr: ArchiveOverviewEntry[] = [];

  nodeListEach(links, (el) => {
    const href = el.getAttribute("href") as string;
    const tuple = href
      ?.replace("/archieven/maandelijks", "")
      .split("/")
      .reduce<number[]>((arr, c) => {
        if (c && c.length) {
          arr.push(parseInt(c, 10));
        }
        return arr;
      }, []);

    const num = +new Date(tuple[0], tuple[1]);
    const monthStr = months[tuple[1] - 1];

    linkArr.push({
      num,
      monthStr,
      year: tuple[0],
      month: tuple[1],
      url: `https://www.geenstijl.nl${href}`,
    });
  });

  return linkArr;
};

export const parseArchive = async (body: string): Promise<ArchiveEntry[]> => {
  if (!body || body.length === 0) {
    return [];
  }

  const doc = await getHTMLDocument(body);
  const entries: ArchiveEntry[] = [];

  const list = doc.querySelectorAll(".main_content .archive-list li");

  nodeListEach(list, (el) => {
    const split = el.textContent.trim().split("|");
    if (split.length === 2) {
      const date = split[0].trim();
      const title = split[1].trim();
      const $a = el.querySelector("a");
      if ($a) {
        const link = $a.getAttribute("href") as string;
        const link_encoded = encode(link);
        entries.push({
          date,
          title,
          link,
          link_encoded,
        });
      }
    }
  });

  return entries;
};
