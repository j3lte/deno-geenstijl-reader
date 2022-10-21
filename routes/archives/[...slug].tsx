import { Handlers, PageProps } from "$fresh/server.ts";
import { getArchive, ArchiveEntry } from "@/gstools/mod.ts";
import { Page } from "@/components/Page.tsx";

export const handler: Handlers<ArchiveEntry[] | null> = {
  async GET(_, ctx) {
    const arr = (ctx.params.slug || "")
      .trim()
      .split("/")
      .map((x) => parseInt(x, 10));

    if (
      !arr ||
      arr.length !== 2 ||
      Number.isNaN(arr[0]) ||
      Number.isNaN(arr[1]) ||
      arr[1] > 12 ||
      arr[1] < 1
    ) {
      return ctx.render(null);
    }

    const archiveEntries = await getArchive(arr[0], arr[1]);

    return ctx.render(archiveEntries);
  },
};

export default function ArchivesPage({
  data,
}: PageProps<ArchiveEntry[] | null>) {
  const hasEntries = data !== null && data.length > 0;

  return (
    <Page backLink={"/"}>
      <div
        class={`flex-grow-1 overflow-y-auto overflow-x-hidden py-4 px-2 divide-y ${
          hasEntries ? "" : "flex justify-center items-center "
        }`}
      >
        {!hasEntries && (
          <span class={``}>
            Invalid archive or I cannot get the info from Geenstijl...
          </span>
        )}
        {hasEntries &&
          data.map((entry) => {
            return (
              <div class={`py-1`}>
                <a
                  href={`/${entry.link_encoded}`}
                  class={`block w-full hover:bg-gray-100 py-2 flex flex-col items-start`}
                >
                  <span class={`mr-2 text-sm pb-1`}>[ {entry.date} ]</span>
                  <span class={`truncate`}>{entry.title}</span>
                </a>
              </div>
            );
          })}
      </div>
    </Page>
  );
}
