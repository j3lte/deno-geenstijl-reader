import { useState } from "preact/hooks";
import { createPortal, Fragment } from "preact/compat";

interface ImageDisplayProps {
  src: string;
  className?: string;
  clickable?: boolean;
  modal?: boolean;
}

const Modal = ({
  opened,
  setOpened,
  src,
}: {
  opened: boolean;
  setOpened: (state: boolean) => void;
  src: string;
}) => {
  const el = (
    <div
      class={`fixed top-0 left-0 backdrop-filter backdrop-blur-lg bg-gray-100 bg-opacity-80 w-screen h-screen flex justify-center items-center ${
        opened ? "" : "hidden"
      }`}
      onClickCapture={() => {
        setOpened(false);
      }}
    >
      <div>
        <img
          src={src}
          class={`max-w-screen`}
          style={{ maxHeight: `calc(var(--vh, 1vh) * 100)` }}
        />
      </div>
    </div>
  );

  if (window && typeof document !== "undefined") {
    const modals = document.getElementById("modals") as HTMLElement;
    return createPortal(el, modals);
  }

  return el;
};

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
      <Fragment>
        <Modal opened={opened} setOpened={setOpened} src={src} />
        <img
          class={className}
          src={src}
          onClick={() => {
            setOpened(true);
          }}
        />
      </Fragment>
    );
  }

  return <img class={className} src={src} />;
}
