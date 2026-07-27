import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en"],
  defaultLocale: "pl",
  // Polish is served from "/" (no prefix), English from "/en"
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
