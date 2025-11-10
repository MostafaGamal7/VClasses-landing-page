import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full flex items-center pt-24 lg:pt-0 min-h-[calc(100vh)]">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/hero-bg.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center lg:mt-24">
          {/* Content */}
          <div className="space-y-8 ">
            <h1 className="text-xs md:text-lg font-bold text-primary leading-tight">
              {t("title")}
            </h1>
            <p
              className="text-secondary font-extrabold leading-[2.2] relative"
              style={{ fontSize: "clamp(1.2rem, 4vw, 2.2rem)" }} // 1rem for mobile, 4vw for tablet, 2.2rem for desktop, 1rem == 16px
            >
              {t("description")}
              <span className="absolute -z-10 bottom-2 left-1/2 transform -translate-x-1/2">
                <Image
                  src="/assets/icons/hero/line.png"
                  alt="Line"
                  width={380}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </span>
            </p>
            <div className="flex flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Link
                href="#video"
                className="flex items-center gap-3 text-secondary"
              >
                <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                  <Image
                    src="/assets/icons/hero/play.png"
                    alt="Play"
                    width={60}
                    height={60}
                    className="ml-1"
                  />
                </div>
                <span className="md:hidden">{t("video-intro.mobile")}</span>
                <span className="hidden md:inline">
                  {t("video-intro.desktop")}
                </span>
              </Link>
              <Button
                href="#work"
                translationKey="hero.cta"
                variant="primary"
                size="lg"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[600px] lg:h-[600px] ">
            <Image
              src="/assets/images/hero-person.png"
              alt="Hero"
              fill
              className="object-contain lg:object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
