import {getRequestConfig, type RequestConfig} from "next-intl/server";
import englishMessages from "../messages/en.json";
import {routing, type Locale} from "./routing";

/**
 * next-intl's `AbstractIntlMessages` does not model arrays, but the runtime
 * supports them via `t.raw()` (used for `resume.openForWork`), so the catalogs
 * are cast to the config's own message type.
 */
type Messages = RequestConfig["messages"];

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale: Locale = routing.locales.includes(requested as Locale) ? (requested as Locale) : routing.defaultLocale;

  let messages: Messages;

  try {
    messages = (await import(`../messages/${locale}.json`)).default as Messages;
  } catch (error) {
    // Never fail the render over a missing catalog — degrade to English.
    console.error(`Missing message catalog for "${locale}", falling back to English:`, error);
    messages = englishMessages as unknown as Messages;
  }

  return {locale, messages};
});
