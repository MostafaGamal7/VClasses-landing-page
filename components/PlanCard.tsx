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
  const periodKey = isYearly ? 'plans.period.yearly' : 'plans.period.monthly';
  const savePercent = Math.round(
    ((plan.pricing.monthly * 12 - plan.pricing.yearly) / (plan.pricing.monthly * 12)) * 100
  );

  return (
    <div
        className={`relative rounded-3xl p-[1.5px] ${
            plan.popular
            ? 'bg-gradient-to-r from-[#B67EFD] via-[#F088D2] to-[#FE5B3E]'
            : ''
        } transition-all duration-300 h-full`}
    >
  <div
    className={`rounded-3xl bg-gray-900 p-6 flex flex-col h-full transition-all duration-300 ${
      isActive ? 'transform scale-105' : 'opacity-90'
    }`}
  >
    <div className="mb-6 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {t(plan.nameKey)}
      </h3>
    </div>

    <div className="mb-8 text-center">
      <div className="flex items-end gap-2 mb-1">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          {plan.pricing.currency}
          {price}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm mb-1">
          /{t(periodKey).toLowerCase()}
        </span>
      </div>
      {isYearly && (
        <p className="text-sm text-[#B67EFD]">{t('plans.percent', { percent: savePercent })}</p>
      )}
    </div>

    <ul className="space-y-3 mb-8 flex-1 text-center">
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
              feature.available
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {t(feature.textKey)}
          </span>
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
        plan.buttonVariant === 'primary'
          ? 'bg-gradient-to-r from-[#B67EFD] via-[#F088D2] to-[#FE5B3E] text-white hover:opacity-90'
          : plan.buttonVariant === 'secondary'
          ? 'bg-secondary text-white hover:bg-secondary/90'
          : 'border-2 border-[#B67EFD] text-[#B67EFD] hover:bg-[#B67EFD]/10'
      }`}
    >
      {t(plan.buttonTextKey)}
    </button>
  </div>
</div>

  );
};

export default PlanCard;
