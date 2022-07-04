/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { asset } from "$fresh/runtime.ts";

interface FooterProps {
  backLink?: string | null;
}

export default function Footer({ backLink }: FooterProps) {
  return (
    <>
      <div
        class={tw`h-20 flex flex-none flex-col justify-center items-center grow-0 bg-gradient-to-t from-[#fc32a9] to-white`}
      >
        {backLink && backLink !== null ? (
          <a class={tw`text-xl`} href={backLink}>
            &#8592; Back
          </a>
        ) : null}
      </div>
      <script src={asset("/client_fixes.js")} />
    </>
  );
}
