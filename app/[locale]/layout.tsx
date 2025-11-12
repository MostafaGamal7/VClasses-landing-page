import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VClasses",
  description: "VClasses is a platform for learning and teaching",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="scroll-smooth over-flow-x-hidden"
    >
      <body className={`${alexandria.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
