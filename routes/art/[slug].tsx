/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { decode } from "encoding/base64url.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import { getArticle, Article } from "../../gstools/mod.ts";
import { Page } from "@/helpers/Page.tsx";

export const handler: Handlers<Article | null> = {
  async GET(_, ctx) {
    if (!ctx.params.slug) {
      return ctx.render(null);
    }

    try {
      const decoded = decode(ctx.params.slug);
      const str = new TextDecoder().decode(decoded);

      if (str && str.startsWith("https://www.geenstijl.nl")) {
        const article = await getArticle(str);

        return ctx.render(article);
      }
    } catch (error) {
      console.error("Error in decoder!", error);
    }

    return ctx.render(null);
  },
};

const DataTable = ({ article }: { article: Article }) => {
  const cellClass =
    "border border-slate-400 p-2 text-base align-top table-cell";
  const firstCellClass = `${cellClass} text-sm`;
  const contentCellClass = `${cellClass} break-all`;
  const contentTextClass = `${cellClass} break-words`;
  return (
    <div
      class={tw`table-auto border-spacing-2 border-collapse border border-slate-400 w-full max-w-full`}
    >
      <div class={tw`table-row-group`}>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Title:</div>
          <div class={tw`${contentCellClass} font-bold`}>{article.title}</div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Date:</div>
          <div class={tw`${contentCellClass}`}>
            {article.date} {article.time}
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Author:</div>
          <div class={tw`${contentCellClass}`}>{article.author}</div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Link:</div>
          <div class={tw`${contentCellClass}`}>
            <a
              href={article.url}
              target="_blank"
              class={tw``}
              rel="noopener noreferrer"
            >
              {article.url}
            </a>
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Text:</div>
          <div class={tw`${contentTextClass} `}>
            {article.text?.map((val) => (
              <span class={tw`block text-base leading-4 mb-2`}>{val}</span>
            ))}
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Links:</div>
          <div class={tw`${contentCellClass}`}>
            {article.links
              ?.filter((l) => l.href && l.href !== "#")
              .map((link) => (
                <span class={tw`block text-sm`}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.href}
                  </a>
                </span>
              ))}
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Data:</div>
          <div class={tw`${contentCellClass} font-bold`}>
            <a
              href={`/api/article/${article.url_encoded}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to open
            </a>
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Social:</div>
          <div class={tw`${contentCellClass}`}>
            {article.img ? (
              <a href={article.img} target="_blank" rel="noopener noreferrer">
                <img class={tw`max-h-20`} src={article.img} />
              </a>
            ) : null}
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Images:</div>
          <div class={tw`${contentCellClass}`}>
            <div class={tw`grid gap-4 grid-cols-3`}>
              {article.imgs?.map((src) => (
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <img class={tw`max-h-40 max-w-40`} src={src} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Comments:</div>
          <div class={tw`${contentTextClass} text-xs divide-y`}>
            {article.comments?.map((c) => {
              const hasComments = c.comments && c.comments.length > 0;
              const sub = c.comments?.map((sub) => (
                <div class={tw`block flex flex-col py-2 pl-3 pr-2 bg-gray-100`}>
                  <div>{sub.text}</div>
                  <div class={tw`pt-1 text-right italic`}>
                    <span class={tw`font-bold`}>{sub.author}</span>
                    {" | "}
                    <span>
                      {sub.date} {sub.time}
                    </span>
                  </div>
                </div>
              ));

              return (
                <div class={tw`block flex p-2 flex-col text-xs`}>
                  <div
                    class={tw`${c.redacted ? "bg-red-100" : ""} ${
                      c.userBanned ? "bg-red-500" : ""
                    }`}
                  >
                    {c.text}
                  </div>
                  <div class={tw`pt-1 text-right italic`}>
                    <span class={tw`font-bold`}>{c.author}</span>
                    {" | "}
                    <span>
                      {c.date} {c.time}
                    </span>
                  </div>
                  {hasComments ? (
                    <div class={tw`flex divide-y flex-col py-3 pl-6`}>
                      {sub}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Greet({ data }: PageProps<Article | null>) {
  return (
    <Page backLink={data !== null ? `/arch/${data.year}-${data.month}` : null}>
      <div
        class={tw`flex-grow-1 overflow-y-auto overflow-x-hidden relative py-4 px-2 ${
          data === null ? "flex justify-center items-center " : ""
        }`}
      >
        {data === null ? (
          <span class={tw``}>
            Invalid page or I cannot get the info from Geenstijl...
          </span>
        ) : (
          <DataTable article={data} />
        )}
      </div>
    </Page>
  );
}
