/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

interface ImageDisplayProps {
  src: string;
  className?: string;
  clickable?: boolean;
  modal?: boolean;
}

export default function ImageDisplay({
  src,
  className,
  clickable,
  modal,
}: ImageDisplayProps) {
  const [opened, setOpened] = useState(false);

  if (clickable) {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img class={className} src={src} />
      </a>
    );
  } else if (modal) {
    return (
      <>
        <div
          class={tw`fixed top-0 left-0 backdrop-filter backdrop-blur-lg bg-gray-100 bg-opacity-80 w-screen h-screen flex justify-center items-center ${
            opened ? "" : "hidden"
          }`}
          onClickCapture={() => {
            setOpened(false);
          }}
        >
          <div>
            <img src={src} class={tw`max-w-screen max-h-screen`} />
          </div>
        </div>
        <img
          class={className}
          src={src}
          onClick={() => {
            setOpened(true);
          }}
        />
      </>
    );
  }

  return <img class={className} src={src} />;
}
