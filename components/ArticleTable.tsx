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
  const cellClass = "border p-2 align-top table-cell";
  const firstCellClass = `${cellClass} text-xs ${
    hideFirstColumn ? "hidden" : ""
  }`;
  const contentCellClass = `${cellClass} break-all`;
  const contentTextClass = `${cellClass} break-words`;
  return (
    <div class={`table-auto border-collapse w-full max-w-full`}>
      <div class={`table-row-group`}>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Title:</div>
          <div class={`${contentTextClass} font-bold`}>{article.title}</div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Text:</div>
          <div class={`${contentTextClass} `}>
            {article.text?.map((val) => (
              <span class={`block text-base leading-6 mb-2`}>{val}</span>
            ))}
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Date:</div>
          <div class={`${contentCellClass}`}>
            {article.date} {article.time}
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Author:</div>
          <div class={`${contentCellClass}`}>{article.author}</div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Link:</div>
          <div class={`${contentCellClass}`}>
            <a
              href={article.url}
              target="_blank"
              class={``}
              rel="noopener noreferrer"
            >
              {article.url}
            </a>
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Links:</div>
          <div class={`${contentCellClass}`}>
            {article.links
              ?.filter((l) => l.href && l.href !== "#")
              .map((link) => (
                <span class={`block text-sm`}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.href}
                  </a>
                </span>
              ))}
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Data:</div>
          <div class={`${contentCellClass} font-bold`}>
            <a
              href={`/api/article/${article.url_encoded}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to open
            </a>
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Social:</div>
          <div class={`${contentCellClass}`}>
            {article.img ? (
              <ImageDisplay src={article.img} modal className={`max-h-20`} />
            ) : null}
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>Images:</div>
          <div class={`${contentCellClass}`}>
            <div class={`grid gap-4 grid-cols-3`}>
              {article.imgs?.map((src) => (
                <ImageDisplay src={src} modal className={`max-h-40 max-w-40`} />
              ))}
            </div>
          </div>
        </div>
        <div class={`table-row`}>
          <div class={`${firstCellClass}`}>&#9658;</div>
          <div class={`${contentTextClass} text-xs divide-y`}>
            {article.comments?.map((c) => {
              const hasComments = c.comments && c.comments.length > 0;
              const sub = c.comments?.map((sub) => (
                <div class={`block flex flex-col py-2 pl-3 pr-2 bg-gray-100`}>
                  <div>{sub.text}</div>
                  <div class={`pt-1 text-right italic`}>
                    <span class={`font-bold`}>{sub.author}</span>
                    {" | "}
                    <span>
                      {sub.date} {sub.time}
                    </span>
                  </div>
                </div>
              ));

              return (
                <div class={`block flex p-2 flex-col text-xs`}>
                  <div
                    class={`${c.redacted ? "bg-red-100" : ""} ${
                      c.userBanned ? "bg-red-500" : ""
                    }`}
                  >
                    {c.text}
                  </div>
                  <div class={`pt-1 text-right italic`}>
                    <span class={`font-bold`}>{c.author}</span>
                    {" | "}
                    <span>
                      {c.date} {c.time}
                    </span>
                  </div>
                  {hasComments ? (
                    <div class={`flex divide-y flex-col py-3 pl-6`}>{sub}</div>
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
