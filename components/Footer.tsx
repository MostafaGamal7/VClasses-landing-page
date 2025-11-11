import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {  footerSocialLinks, footerContactInfo, footerLinks } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#221314] text-white pt-16 pb-8 relative">
      {/* background */}
      <div className="absolute inset-0 z-[-1]">
        <Image 
          src="/assets/images/footer/footer-bg.png" 
          alt="Footer Background" 
          fill 
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image 
                src="/assets/images/footer/footer-logo.png" 
                alt="VClasses Logo" 
                width={200} 
                height={52} 
              />
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {footerSocialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-4 bg-white/5 hover:bg-white/10 rounded-md"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.iconName} 
                    width={24} 
                    height={24} 
                  />
                </a>
              ))}
            </div>
          </div>

          

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3">
              {footerContactInfo.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <Image 
                    src={item.icon} 
                    alt={item.iconName} 
                    width={24} 
                    height={24} 
                  />
                  <a 
                    href={item.href}
                    target="_blank"
                    className="text-white/50 text-sm hover:text-white transition-colors"
                    rel="noopener noreferrer"
                  >
                    <span className="block font-medium text-white/50 hover:text-white transition-colors">{t(`${item.text}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-lg font-semibold mb-4">
                {section.title === 'footer.quickLinks' ? t('quickLinksTitle') : t('legal.title')}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                  <Link 
                    href={link.href} 
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {t(link.text)}
                  </Link>
                </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        

        <p className="text-white/50 text-lg text-center mt-8">
         {t('developed.developed')} <span className="font-bold text-primary">Vclasses</span> {t('developed.rights')} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}