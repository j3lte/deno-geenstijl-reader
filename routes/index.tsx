/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { getArchives, ArchiveOverviewEntry } from "../gstools/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";

export const handler: Handlers<ArchiveOverviewEntry[]> = {
  async GET(_, ctx) {
    const archives = (await getArchives()).sort((a, b) => b.num - a.num);
    return ctx.render(archives);
  },
};

export default function Page({ data }: PageProps<ArchiveOverviewEntry[]>) {
  return (
    <div
      class={tw`mx-auto max-w-screen-lg flex flex-col h-screen`}
      style={{ height: `calc(var(--vh, 1vh) * 100)` }}
    >
      <Header />
      <div
        class={tw`flex-grow-1 overflow-y-auto overflow-x-hidden py-4 px-2 divide-y`}
      >
        {data.map((entry) => {
          return (
            <div class={tw`py-1`}>
              <a
                href={`/arch/${entry.year}-${entry.month}`}
                class={tw`block w-full hover:bg-gray-100`}
              >
                &#8594; {entry.monthStr} {entry.year}
              </a>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
