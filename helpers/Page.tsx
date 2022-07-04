/** @jsx h */
/** @jsxFrag Fragment */
import { ComponentChildren, Fragment, h } from "preact";
import { tw } from "@twind";
import Header from "@/helpers/Header.tsx";
import Footer from "@/helpers/Footer.tsx";

export function Page({
  children,
  backLink,
}: {
  children: ComponentChildren;
  backLink?: string | null;
}) {
  return (
    <>
      <div
        class={tw`mx-auto max-w-screen-lg flex flex-col h-screen`}
        style={{ height: `calc(var(--vh, 1vh) * 100)` }}
      >
        <Header />
        {children}
        <Footer backLink={backLink} />
      </div>
    </>
  );
}
