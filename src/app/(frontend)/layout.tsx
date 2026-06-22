import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { getLocale } from '@utils/getLocale';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import "@app/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Côme Leleu",
  description: "Software engineer specializing in web development",
  icons: {
    icon: process.env.FAVICON_URL || "",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${bricolageGrotesque.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-zinc-900 bg-linear-to-br/oklch from-zinc-950/75 to-zinc-950/90`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
