"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useLocale } from 'next-intl';
import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';

type FormData = {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'mastercard' | 'vodafoneCash';
};

export default function Course() {
  const t = useTranslations('course');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      paymentMethod: 'mastercard'
    }
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', data);
      // Reset form after submission
      reset();
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="relative py-16 md:py-24">
        {/* background image */}
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/assets/images/course/course-bg.png"
            alt="Course Preview"
            fill
            className={`object-cover ${locale === 'ar' ? 'scale-x-[-1]' : ''}`}
            priority
          />
        </div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Course Image & Price */}
            <div className="flex flex-col">
                <Image
                    src="/assets/images/course/course-thumbnail.png"
                    alt="Course Preview"
                    width={500}
                    height={300}
                    className={`object-cover relative w-full ${locale === 'ar' ? 'md:right-[-40px]' : 'md:left-[-40px]'}`}
                    priority
                />
                <div className="space-y-4">
                    <p className="text-white text-4xl font-bold">{t('title')}</p>
                    <p className="text-white text-2xl">{t('coursePrice')} <span className="text-secondary text-4xl font-bold">{t('price')}</span></p>
                </div>
            </div>

            {/* Right Column - Checkout Form */}
            <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-[#1E1E1E] mb-8">
                {t('form.title')}
            </h3>
            
            <form 
                ref={formRef} 
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 text-[#193142]!"
            >
                {/* Name Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="block text-sm font-medium text-[#1E1E1E]">
                            {t('form.name')}
                        </label>
                        {errors.name && (
                            <span className="text-xs text-red-600">
                                {t('form.required')}
                            </span>
                        )}
                    </div>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: true })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                            errors.name ? 'border-red-500' : 'border-[#E0E0E0] focus:border-[#4A90E2]'
                        } outline-none transition-colors`}
                        placeholder={t('form.namePlaceholder')}
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="phone" className="block text-sm font-medium text-[#1E1E1E]">
                            {t('form.phone')}
                        </label>
                        {errors.phone && (
                            <span className="text-xs text-red-600">
                                {t('form.required')}
                            </span>
                        )}
                    </div>
                    <input
                        id="phone"
                        type="tel"
                        {...register('phone', { required: true })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                            errors.phone ? 'border-red-500' : 'border-[#E0E0E0] focus:border-[#4A90E2]'
                        } outline-none transition-colors`}
                        placeholder={t('form.phonePlaceholder')}
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="email" className="block text-sm font-medium text-[#1E1E1E]">
                            {t('form.email')}
                        </label>
                        {errors.email && (
                            <span className="text-xs text-red-600">
                                {errors.email.type === 'required' ? t('form.required') : t('form.emailError')}
                            </span>
                        )}
                    </div>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { 
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                            errors.email ? 'border-red-500' : 'border-[#E0E0E0] focus:border-[#4A90E2]'
                        } outline-none transition-colors`}
                        placeholder={t('form.emailPlaceholder')}
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-lg font-medium">{t('form.choosePaymentMethod')}</p>
                        <span className="text-xs text-secondary">{t('form.choosePaymentMethodDescription')}</span>
                    </div>
                    <div className="space-y-3">
                        {/* Mastercard Option */}
                        <div 
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors gap-2 shadow-lg ${
                                paymentMethod === 'mastercard' ? 'bg-green-50 border border-green-200' : 'bg-white hover:bg-gray-50 border border-transparent'
                            }`}
                            onClick={() => setValue('paymentMethod', 'mastercard')}
                        >
                            <Image src="/assets/icons/course/master-card.png" alt="Mastercard" width={48} height={48} />
                            <span className="text-sm font-medium">{t('form.mastercard')}</span>
                        </div>

                        {/* Vodafone Cash Option */}
                        <div 
                            className={`flex items-center px-2 py-4 rounded-lg cursor-pointer transition-colors gap-2 shadow-lg ${
                                paymentMethod === 'vodafoneCash' ? 'bg-green-50 border border-green-200' : 'bg-white hover:bg-gray-50 border border-transparent'
                            }`}
                            onClick={() => setValue('paymentMethod', 'vodafoneCash')}
                        >
                            <Image src="/assets/icons/course/vodafone-cash.png" alt="Vodafone Cash" width={48} height={48} />   
                            <span className="text-sm font-medium">{t('form.vodafoneCash')}</span>
                        </div>
                    </div>
                    <input type="hidden" {...register('paymentMethod')} />
                </div>
                
                {/* Submit Button */}
                <div className='flex flex-col gap-8 shadow-lg p-6 rounded-lg'>
                    <div className="flex justify-between">
                        <p className="text-secondary text-lg font-medium">{t('form.totalCoursePrice')}</p>
                        <p className="text-primary text-lg font-semibold">{t('price')}</p>
                    </div>
                    <button disabled={isSubmitting} className="w-fit mx-auto font-medium transition-all shadow-md hover:shadow-lg cursor-pointer text-center flex flex-center bg-linear-to-t from-primary-hover to-primary text-white hover:from-primary-hover hover:to-primary text-sm md:text-base px-8 py-4 md:px-16 md:py-4 rounded-full">{t('form.submit')}</button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </section>
  );
}