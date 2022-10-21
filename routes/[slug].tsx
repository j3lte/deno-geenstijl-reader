import { decode } from "encoding/base64url.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import { getArticle, Article } from "@/gstools/mod.ts";
import { Page } from "@/components/Page.tsx";
import { ArticleTable } from "@/components/ArticleTable.tsx";
import { getCookies, setCookie } from "http/cookie.ts";

interface PageData {
  article?: Article;
  hideFirstColumn?: boolean;
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    if (!ctx.params.slug) {
      return ctx.render({});
    }

    const maybeHideSidebarCookie = getCookies(req.headers)["hide_sidebar"];
    let response: Response | null = null;

    try {
      const decoded = decode(ctx.params.slug);
      const str = new TextDecoder().decode(decoded);

      if (str && str.startsWith("https://www.geenstijl.nl")) {
        const article = await getArticle(str);

        response = await ctx.render({
          article,
          hideFirstColumn: maybeHideSidebarCookie === "yes",
        });
      }
    } catch (error) {
      console.error("Error in decoder!", error);
    }

    if (response === null) {
      response = await ctx.render({});
    }

    if (typeof maybeHideSidebarCookie === "undefined") {
      setCookie(response.headers, {
        name: "hide_sidebar",
        value: "no",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
      });
    }

    return response;
  },
};

export default function Greet({ data }: PageProps<PageData>) {
  const { article, hideFirstColumn } = data;
  return (
    <Page
      backLink={article ? `/archives/${article.year}/${article.month}` : null}
    >
      <div
        class={`flex-grow-1 overflow-y-auto overflow-x-hidden relative py-4 px-2 ${
          article ? "" : "flex justify-center items-center "
        }`}
      >
        {!article ? (
          <span>Invalid page or I cannot get the info from Geenstijl...</span>
        ) : (
          <>
            <ArticleTable article={article} hideFirstColumn={hideFirstColumn} />
          </>
        )}
      </div>
    </Page>
  );
}
