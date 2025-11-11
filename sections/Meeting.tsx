import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Meeting() {
  const t = useTranslations('meeting');

  return (
    <section className="relative py-12 md:py-16 overflow-hidden" id="meet">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/meeting/meet-bg.png"
          alt="Meeting background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-secondary/80 ">
            {t('description')}
          </p>
        </div>
        {/* Instructor */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 place-items-center">         
          <div className="col-span-1 md:col-span-7 space-y-4 order-2 md:order-1 gap-2">
            <h2 className="text-xl md:text-3xl font-bold text-primary">
              {t('instructor')}
            </h2>
            <p className="text-lg text-secondary/80 ">{t('subtitle')}</p>
            <div className="flex gap-4">
                <p className="flex gap-2 items-center">
                <Image src="/assets/icons/meeting/rating.png" alt="Rating" width={20} height={20} />
              {t('trainerRating')}
            </p>
            <p className="flex gap-2 items-center">
            <Image src="/assets/icons/meeting/reviews.png" alt="Reviews" width={20} height={20} />
              {t('trainerReviews')}
            </p>
            </div>
            <p className="text-lg text-secondary/80 ">
              {t('trainerDescription')}
            </p>
            <p className="text-lg text-secondary/80">{t('trainerFeatures.item1')}</p>
            <p className="text-lg text-secondary/80">{t('trainerFeatures.item2')}</p>
            <p className="text-lg text-secondary/80">{t('trainerFeatures.item3')}</p>
            <p className="text-lg text-secondary/80">{t('trainerFeatures.item4')}</p>
          </div>
          <div className="col-span-1 md:col-span-3 order-1 md:order-2">
            <Image
              src="/assets/images/meeting/meet-hero.png"
              alt="Instructor"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}