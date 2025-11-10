'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
// Define form schema with Zod



export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  type ContactFormData = z.infer<typeof contactFormSchema>;

  const contactFormSchema = z.object({
  name: z.string().min(2, { message: t('form.nameError') }),
  email: z.string().email({ message: t('form.emailError') }).max(255, { message: t('form.emailError') }),
  message: z.string().min(10, { message: t('form.messageError') }),
  phone: z.string().min(10, { message: t('form.phoneError') }),
});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);
      
      // Show success message
      alert(t('successMessage'));
      
      // Reset form
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('errorMessage'));
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
        {/* background */}
        <div className="absolute inset-0 z-[-1]">
            <Image
                src="/assets/images/contact/contact-bg.png"
                alt="contact-bg"
                fill
                className="object-cover"
            />
        </div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            {t('title')}
          </h2>
          <p className="text-lg text-secondary/80">
            {t('description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                <div className="col-span-2 md:col-span-1 w-full">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`w-full px-4 py-3 rounded-lg border text-gray-700 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent `}
                    placeholder={t('form.namePlaceholder')}
                    />
                    {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="col-span-2 md:col-span-1 w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder={t('form.emailPlaceholder')}
                    />
                    {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                    </p>
                    )}
                </div>

              {/* Phone Field */}
              <div className="col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.phone')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder={ t('form.phonePlaceholder')}
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className={`w-full px-4 py-3 rounded-lg border resize-none max-h-40 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder={t('form.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-fit flex items-center gap-2 bg-primary hover:bg-primary text-white font-medium py-3 px-12 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
                <span className={`${locale === "en" ? "rotate-180" : ""}`}>
                <Image src="/assets/icons/contact/arrow-right.png" alt="send" width={24} height={24} /></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}