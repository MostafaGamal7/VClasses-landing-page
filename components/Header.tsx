"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const bannerText = useTranslations("banner");

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLanguageMenuOpen(false);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ];

  return (
    <header className="w-full">
      {/* Promotional Banner */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 text-white py-2 px-4 flex items-center justify-center gap-2 text-sm md:text-base">
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-center">{bannerText("message")}</span>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Image
                src="/assets/images/logo.png"
                alt="VClasses Logo"
                width={150}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <Link
                href="/"
                className={`text-gray-900 hover:text-orange-500 transition-colors ${
                  pathname === "/"
                    ? "font-semibold underline decoration-orange-500 underline-offset-4"
                    : ""
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className="text-gray-900 hover:text-orange-500 transition-colors"
              >
                {t("about")}
              </Link>
              <Link
                href="/reviews"
                className="text-gray-900 hover:text-orange-500 transition-colors"
              >
                {t("reviews")}
              </Link>
              <Link
                href="/plans"
                className="text-gray-900 hover:text-orange-500 transition-colors"
              >
                {t("plans")}
              </Link>
            </div>

            {/* Language Selector and CTA */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                  aria-label="Select language"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="hidden sm:inline text-sm font-medium">
                    {languages.find((lang) => lang.code === locale)?.name ||
                      "English"}
                  </span>
                </button>

                {/* Language Dropdown */}
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => switchLocale(lang.code)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                            locale === lang.code
                              ? "bg-orange-50 text-orange-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Separator - Desktop Only */}
              <div className="hidden md:block w-px h-6 bg-gray-300" />

              {/* CTA Button */}
              <button className="bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg text-sm md:text-base">
                {t("tryItNow")}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 flex flex-col gap-3">
            <Link
              href="/"
              className={`text-gray-900 hover:text-orange-500 transition-colors ${
                pathname === "/" ? "font-semibold text-orange-500" : ""
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href="/about"
              className="text-gray-900 hover:text-orange-500 transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/reviews"
              className="text-gray-900 hover:text-orange-500 transition-colors"
            >
              {t("reviews")}
            </Link>
            <Link
              href="/plans"
              className="text-gray-900 hover:text-orange-500 transition-colors"
            >
              {t("plans")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile language menu */}
      {isLanguageMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsLanguageMenuOpen(false)}
        />
      )}
    </header>
  );
}
