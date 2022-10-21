import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      fontFamily: {
        custom: ["Open Sans", "sans-serif"],
      },
      maxWidth: {
        "40": "10rem",
      },
    },
  },
} as Options;
