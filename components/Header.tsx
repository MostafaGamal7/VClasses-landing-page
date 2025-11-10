"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";

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
    <header className="w-full fixed top-0 left-0 right-0 z-50 flex flex-col-reverse md:flex-col">
      {/* Promotional Banner */}
      <div className=" text-secondary bg-primary py-2 px-4 flex items-center justify-center gap-2 text-sm md:text-base">
        <span className="text-center">{bannerText("message")}</span>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20 gap-2">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/assets/images/logo.png"
                alt="VClasses Logo"
                width={200}
                height={52}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center xl:gap-4 flex-1 justify-center text-sm xl:text-base">
              <Link
                href="/"
                className={`text-secondary hover:text-orange-500 transition-colors px-2 lg:px-6 py-2 hidden tablet:block ${
                  pathname === "/"
                    ? "font-semibold  decoration-orange-500 border-b border-secondary"
                    : ""
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href="#about"
                className="text-secondary hover:text-orange-500 hover:border-b transition-colors px-2 lg:px-6 py-2 hidden tablet:block"
              >
                {t("about")}
              </Link>
              <Link
                href="#reviews"
                className="text-secondary hover:text-orange-500 hover:border-b transition-colors px-2 lg:px-6 py-2 hidden tablet:block"
              >
                {t("reviews")}
              </Link>
              <Link
                href="#plans"
                className="text-secondary hover:text-orange-500 hover:border-b transition-colors px-2 lg:px-6 py-2 hidden tablet:block"
              >
                {t("plans")}
              </Link>
              {/* Separator */}
              <div className="hidden tablet:block w-px h-6 bg-gray-300" />
              {/* Language Selector and CTA */}
            <div className="flex items-center gap-4">
              

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-2 text-secondary hover:text-gray-900 transition-colors"
                  aria-label="Select language"
                >
                  <Image
                    src="/assets/icons/globe.png"
                    alt="VClasses Logo"
                    width={24}
                    height={24}
                    priority
                  />
                  <span className="text-sm font-medium">
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
              
               
            </div>
            
          </div>
          {/* CTA Button */}
              <Button 
                variant="primary"
                size="md"
                translationKey="header.tryItNow"
              />
        </div>
        </div>
      </nav>
    </header>
  );
}
