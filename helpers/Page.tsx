/** @jsx h */
/** @jsxFrag Fragment */
import { ComponentChildren, Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import Header from "@/helpers/Header.tsx";
import Footer from "@/helpers/Footer.tsx";

export function Page({
  children,
  backLink,
  sidebarSwitch,
}: {
  children: ComponentChildren;
  backLink?: string | null;
  sidebarSwitch?: boolean;
}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossorigin"
        />

        <title>Mini GS Reader</title>
        <meta name="description" content="Mini GS Reader" />
        <meta property="og:title" content="Mini GS Reader" />
        <meta property="og:description" content="Mini GS Reader" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/images/icons-256.png"
        />
        <meta name="theme-color" content="#fc32a9" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        class={tw`mx-auto max-w-screen-lg flex flex-col h-screen font-custom`}
        style={{ height: `calc(var(--vh, 1vh) * 100)` }}
      >
        <Header sidebarSwitch={sidebarSwitch} />
        {children}
        <Footer backLink={backLink} />
      </div>
    </>
  );
}
