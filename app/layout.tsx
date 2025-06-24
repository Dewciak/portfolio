import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wiktor Dawid Portfolio",
  description: "Welcome to my very own personal portfolio website.",
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
