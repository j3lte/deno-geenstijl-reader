import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      fontFamily: {
        custom: ["Open Sans", "sans-serif"],
      },
    },
  },
};
if (IS_BROWSER) setup(config);
