import { Element } from "deno_dom/deno-dom-wasm-noinit.ts";
import { encode } from "encoding/base64url.ts";

import { Article } from "../types.ts";
import { parseComments } from "./comment.ts";
import {
  cleanString,
  cleanParagraphs,
  getHTMLDocument,
  useElementContent,
  cleanWhiteSpace,
  nodeListEach,
} from "./util.ts";

const parseFooterDateTime = (
  footerElement: Element,
  articleObj: Article
): void => {
  const elementFooterClean = footerElement.querySelector(".col-xs-12.col-sm-7");
  if (elementFooterClean) {
    elementFooterClean.childNodes.forEach((node) => {
      if (node && node.nodeName === "A") {
        node.parentElement?.removeChild(node);
      }
    });
    const footerText = cleanString(elementFooterClean.textContent)
      .replace(/^\s*[\t\r\n]/gm, "")
      .replace(/[\t\r\n]/gm, "")
      .replace(/\s\s+/g, " ");
    const arr = footerText
      .split(" | ")
      .map((s) => cleanString(s.replace(/[ |]/gm, "")));

    if (arr.length === 2) {
      articleObj.date = cleanString(arr[0]).replace("&nbsp;", "");
      articleObj.time = cleanString(arr[1]).replace("&nbsp;", "");

      const dateArr = articleObj.date.split("-").map((x) => parseInt(x, 10));

      if (dateArr.length === 3) {
        articleObj.day = dateArr[0];
        articleObj.month = dateArr[1];
        articleObj.year = 2000 + dateArr[2];
      }
    }
  }
};

export const parseArticle = async (
  body: string,
  url: string
): Promise<Article> => {
  const articleObj: Article = {
    url,
    url_encoded: encode(url),
    links: [],
  };

  if (!body || body.length === 0) {
    return articleObj;
  }
  const doc = await getHTMLDocument(body);

  const elementMain = doc.querySelector(".main_content");
  const elementArticle = elementMain?.querySelector("article.main");

  if (elementArticle) {
    const id = elementArticle.getAttribute("id");
    if (id) {
      articleObj.id = id;
    }

    const elementFooter = elementArticle.querySelector(".art-footer");
    if (elementFooter) {
      const authorText =
        elementFooter.querySelector('a[rel="author"]')?.textContent;
      if (authorText) {
        articleObj.author = cleanString(authorText.replace("@", ""));
      }

      parseFooterDateTime(elementFooter, articleObj);
    }

    const articleImages = elementArticle.querySelectorAll("img");
    nodeListEach(articleImages, (el) => {
      const src = el.getAttribute("src");
      if (!articleObj.imgs) {
        articleObj.imgs = [];
      }
      if (src) {
        articleObj.imgs.push(src);
      }
    });

    const textNode = doc.createElement("div");
    const textHTML = doc.createElement("div");

    [".article-intro", ".article_content"].forEach((selector) => {
      elementArticle
        .querySelector(selector)
        ?.cloneNode(true)
        ._appendTo(textNode);
      elementArticle.querySelector(selector)?._appendTo(textHTML);
    });

    [".puu-social_quote", ".twitter-video", ".instagram-media"].forEach(
      (selector) => {
        textNode.querySelectorAll(selector).forEach((node) => {
          node._remove();
        });
      }
    );

    articleObj.text = cleanParagraphs(textNode.textContent);
    articleObj.html = cleanWhiteSpace(textHTML.innerHTML);

    nodeListEach(textHTML.querySelectorAll("a"), (el, index) => {
      const text = el.textContent;
      const href = el.getAttribute("href") || "#";
      articleObj.links?.push({
        text,
        href,
        index,
      });
    });
  }

  // PARSE TITLE
  useElementContent(doc, 'meta[name="twitter:title"]', (content) => {
    articleObj.title = content;
  });

  // PARSE IMAGE
  useElementContent(doc, 'meta[name="twitter:image"]', (content) => {
    articleObj.img = content;
  });

  // PARSE URL
  useElementContent(doc, 'meta[name="og:url"]', (content) => {
    articleObj.url = content;
  });

  const elementComments = elementMain?.querySelector("section.comments");

  if (elementComments) {
    parseComments(elementComments, articleObj);
  }

  // console.log(doc.body.innerHTML);

  return articleObj;
};
