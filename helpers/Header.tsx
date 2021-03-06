/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import SidebarSwitch from "@/islands/SidebarSwitch.tsx";

export default function Header({ sidebarSwitch }: { sidebarSwitch?: boolean }) {
  return (
    <div
      class={tw`h-20 flex flex-none flex-col justify-center items-center grow-0 bg-gradient-to-b from-[#fc32a9] to-white relative`}
    >
      <span>
        <a class={tw`font-bold text-xl`} href="/">
          Home
        </a>
      </span>
      <span class={tw`absolute top-3 right-3 text-xs italic`}>
        Mini{" "}
        <a
          class={tw`font-bold`}
          href="https://www.geenstijl.nl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Geenstijl
        </a>{" "}
        reader, built in{" "}
        <a
          class={tw`font-bold`}
          href="https://fresh.deno.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fresh
        </a>
      </span>
      {Boolean(sidebarSwitch) && <SidebarSwitch />}
    </div>
  );
}
