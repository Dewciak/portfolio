import {routing, type Locale} from "@/i18n/routing";
import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: {locale: string};
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: "meta"});

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.wiktordawid.pl"),
    title: t("title"),
    description: t("description"),
    // Work-mode variant is the SSR default; Navbar swaps it when game mode is on.
    icons: {
      icon: [
        {url: "/favicon-work.svg", type: "image/svg+xml"},
        {url: "/favicon-work-32.png", type: "image/png", sizes: "32x32"},
      ],
      apple: "/apple-touch-icon-work.png",
    },
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        pl: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: locale === "pl" ? "en_US" : "pl_PL",
      url: locale === routing.defaultLocale ? "/" : `/${locale}`,
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({children, params}: LayoutProps) {
  const {locale} = params;

  if (!routing.locales.includes(locale as Locale)) notFound();

  // Opt the whole tree into static rendering for this locale
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
