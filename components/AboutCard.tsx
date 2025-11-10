import Image from "next/image";
import { useTranslations } from "next-intl";
interface AboutCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  circleColor: string;
  shadowColor: string;
  isActive?: boolean;
}

function AboutCard({
  title,
  description,
  icon,
  bgColor,
  circleColor,
  shadowColor,
  isActive = false,
}: AboutCardProps) {
  const t = useTranslations("about");
  return (
    <div
      className={`flex flex-col justify-between rounded-[40px] mx-2 ${bgColor}  shadow-inner ${shadowColor} relative transition-all duration-500 ease-in-out ${
        isActive
          ? // Mobile: full size, Desktop: full size (same for all)
            "min-h-[330px] sm:min-h-[500px] p-6 sm:p-8 scale-100 sm:scale-100 z-10 sm:z-10 shadow-xl sm:shadow-xl opacity-100 sm:opacity-100"
          : // Mobile: smaller size, Desktop: same size as active
            "min-h-[280px] sm:min-h-[500px] p-5 sm:p-8 scale-[0.88] sm:scale-100 z-0 sm:z-10 opacity-80 sm:opacity-100 shadow-sm sm:shadow-xl"
      }`}
    >
      <div className="flex flex-col flex-1">
        <h3
          className={`text-white mb-8 ${
            isActive ? "text-xl md:text-2xl" : "text-lg md:text-2xl"
          }`}
        >
          {t(title)}
        </h3>
        <p
          className={`text-white leading-8 opacity-95 ${
            isActive ? "text-sm md:text-base" : "text-xs md:text-base"
          }`}
        >
          {t(description)}
        </p>
      </div>
      {/* small circle above the  */}
      <div
        className={`absolute top-1/2 left-1/2 transform translate-x-18 -translate-y-1/2 w-12 h-12 ${circleColor} rounded-full`}
      ></div>
      <div
        className={`flex items-end justify-center relative ${
          isActive ? "mt-8" : "mt-6 md:mt-8"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-start">
          <Image
            src={`/assets/icons/about/${icon}.png`}
            alt={title}
            width={220}
            height={220}
            className={`object-contain drop-shadow-lg transition-all duration-500 ${
              isActive
                ? "w-[200px] h-[200px] md:w-[220px] md:h-[220px]"
                : "w-[170px] h-[170px] md:w-[220px] md:h-[220px]"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
