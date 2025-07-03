import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wiktor Dawid | Personal Portfolio",
  description:
    "Explore my personal portfolio – a front-end developer with a passion for clean UI, responsive web design, and modern JavaScript frameworks. Discover my projects, skills, and interests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Wiktor Dawid | Portfolio</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
