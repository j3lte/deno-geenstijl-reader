import { getArchives, ArchiveOverviewEntry } from "@/gstools/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "@/components/Page.tsx";

export const handler: Handlers<ArchiveOverviewEntry[]> = {
  async GET(_, ctx) {
    const archives = (await getArchives()).sort((a, b) => b.num - a.num);
    return ctx.render(archives);
  },
};

export default function Home({ data }: PageProps<ArchiveOverviewEntry[]>) {
  return (
    <Page>
      <div class="flex-grow-1 overflow-y-auto overflow-x-hidden py-4 px-2 divide-y">
        {data.map((entry) => {
          return (
            <div class="py-1">
              <a
                href={`/archives/${entry.year}/${entry.month}`}
                class="block w-full hover:bg-gray-100 p-2"
              >
                &#8594; {entry.monthStr} {entry.year}
              </a>
            </div>
          );
        })}
      </div>
    </Page>
  );
}
