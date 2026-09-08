import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/providers/motion-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { site } from "@/data/site";
import { da } from "@/lib/i18n/dictionaries";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: da.meta.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: da.meta.description,
    siteName: site.name,
    type: "website",
    locale: "da_DK",
  },
};

export const viewport: Viewport = {
  themeColor: "#070809",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <LocaleProvider>
          <MotionProvider>{children}</MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
