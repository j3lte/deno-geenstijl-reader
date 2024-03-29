import { UnknownPageProps } from "$fresh/server.ts";
import { Page } from "@/components/Page.tsx";

export default function NotFound({ url }: UnknownPageProps) {
  return (
    <Page>
      <div
        class={`flex-grow-1 overflow-y-hidden overflow-x-hidden flex flex-col justify-center items-center`}
      >
        <img
          src="/images/icons-vector.svg"
          class={`w-48 mb-5 motion-safe:animate-bounce`}
        />
        <div class={``}>Woops, this page doesn't exist: {url.pathname}</div>
      </div>
    </Page>
  );
}
