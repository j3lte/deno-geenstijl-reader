export default function Header() {
  return (
    <div
      class={`h-20 flex flex-none flex-col justify-center items-center bg-gradient-to-b from-[#fc32a9] to-white relative`}
    >
      <span>
        <a class={`font-bold text-xl`} href="/">
          Home
        </a>
      </span>
      <span class={`absolute top-3 right-3 text-xs italic`}>
        Mini{" "}
        <a
          class={`font-bold`}
          href="https://www.geenstijl.nl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Geenstijl
        </a>{" "}
        reader, built in{" "}
        <a
          class={`font-bold`}
          href="https://fresh.deno.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fresh
        </a>
      </span>
    </div>
  );
}
