import { PlanData } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PlanCardProps {
  plan: PlanData;
  isYearly: boolean;
  isActive: boolean;
}

const PlanCard = ({ plan, isYearly, isActive }: PlanCardProps) => {
  const t = useTranslations();
  const price = isYearly ? plan.pricing.yearly : plan.pricing.monthly;
  const periodKey = isYearly ? "plans.period.yearly" : "plans.period.monthly";
  const savePercent = Math.round(
    ((plan.pricing.monthly * 12 - plan.pricing.yearly) /
      (plan.pricing.monthly * 12)) *
      100
  );

  return (
    <div
      className={`relative transition-all duration-300 h-full ${
        plan.popular ? "plan-card-wrapper" : "rounded-3xl"
      }`}
    >
      <div
        className={`${
          plan.popular
            ? "plan-card-content "
            : "rounded-3xl backdrop-blur-lg ring-1 ring-white/10 bg-black/10"
        } p-6 flex flex-col h-full transition-all duration-300 ${
          isActive ? "transform scale-105" : "opacity-90"
        }`}
      >
        <div className="mb-6 text-center">
          <h3
            className={`text-2xl font-bold mb-2 text-white`}
          >
            {t(plan.nameKey)}
          </h3>
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-end gap-2 mb-1 justify-center">
            <span
              className={`font-bold ${
                plan.popular
                  ? "text-5xl bg-linear-to-r from-[#B67EFD] via-[#F088D2] to-[#FE5B3E] bg-clip-text text-transparent"
                  : "text-4xl text-gray-900 dark:text-white"
              }`}
            >
              {price} {t(plan.pricing.currency)}
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {t(periodKey)}
          </div>
          {isYearly && (
            <p className="text-sm text-[#B67EFD]">
              {t("plans.percent", { percent: savePercent })}
            </p>
          )}
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <li key={feature.id} className="flex items-center gap-2">
              {feature.available && (
                <Image
                  src="/assets/icons/plans/checkmark.png"
                  alt="check"
                  width={20}
                  height={20}
                />
              )}
              <span
                className={`text-sm ${
                  feature.available ? "text-white/90" : "text-white/50"
                }`}
              >
                {t(feature.textKey)}
              </span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
            plan.buttonVariant === "primary"
              ? "bg-linear-to-r from-[#B67EFD] via-[#F088D2] to-[#FE5B3E] text-white hover:opacity-90 shadow-lg ring-1 ring-white/15"
              : plan.buttonVariant === "secondary"
              ? "bg-secondary text-white hover:bg-secondary/90"
              : "border-2 border-white/50 text-white/80 hover:bg-[#B67EFD]/10"
          }`}
        >
          {t(plan.buttonTextKey)}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
