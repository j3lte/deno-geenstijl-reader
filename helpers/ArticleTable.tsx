/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Article } from "@/gstools/types.ts";
import ImageDisplay from "@/islands/ImageDisplay.tsx";

interface ArticleTableProps {
  hideFirstColumn?: boolean;
  article: Article;
}

export const ArticleTable = ({
  article,
  hideFirstColumn,
}: ArticleTableProps) => {
  const cellClass = "border border-slate-400 p-2 align-top table-cell";
  const firstCellClass = `${cellClass} text-xs ${
    hideFirstColumn ? "hidden" : ""
  }`;
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
          <div class={tw`${firstCellClass}`}>Text:</div>
          <div class={tw`${contentTextClass} `}>
            {article.text?.map((val) => (
              <span class={tw`block text-base leading-6 mb-2`}>{val}</span>
            ))}
          </div>
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
              <ImageDisplay src={article.img} modal className={tw`max-h-20`} />
            ) : null}
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>Images:</div>
          <div class={tw`${contentCellClass}`}>
            <div class={tw`grid gap-4 grid-cols-3`}>
              {article.imgs?.map((src) => (
                <ImageDisplay
                  src={src}
                  modal
                  className={tw`max-h-40 max-w-40`}
                />
              ))}
            </div>
          </div>
        </div>
        <div class={tw`table-row`}>
          <div class={tw`${firstCellClass}`}>&#9658;</div>
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
