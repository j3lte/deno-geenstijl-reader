/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { ErrorPageProps } from "$fresh/server.ts";
import { Page } from "@/helpers/Page.tsx";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <Page>
      <div
        class={tw`flex-grow-1 overflow-y-hidden overflow-x-hidden flex flex-col justify-center items-center`}
      >
        <img
          src="/images/icons-vector.svg"
          class={tw`w-48 mb-5 motion-safe:animate-bounce`}
        />
        <div class={tw``}>
          Woops,internal server error: {(error as Error).message}
        </div>
      </div>
    </Page>
  );
}
