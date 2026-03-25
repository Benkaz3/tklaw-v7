// src/seo/useSeo.js

import { useContext } from 'react';
import { SeoContext } from './SeoContext';
import { useTranslation } from 'react-i18next';

const useSeo = (pageKey) => {
  const seoData = useContext(SeoContext);
  const { i18n } = useTranslation();
  const language = i18n.language === 'vi' ? 'Vi' : 'En';
  const key = `${pageKey}${language}`;
  
  const defaultMetadata = {
    Title: language === 'vi' 
      ? 'Văn Phòng Luật Sư TK & Liên Danh - Giải Pháp Pháp Lý Tại TP HCM' 
      : 'TK & Associates Law Office - Superior Legal Solutions in HCMC',
    Description: language === 'vi' 
      ? 'Khám phá dịch vụ pháp lý tại Văn Phòng Luật Sư TK & Liên Danh, chuyên về luật doanh nghiệp, lao động, gia đình và bất động sản.' 
      : 'Explore expert legal services at TK & Associates, specializing in corporate, employment, family, and real estate law. Contact us for a free consultation.',
    Keywords: language === 'vi' 
      ? [
          'Văn Phòng Luật Sư TK & Liên Danh',
          'Dịch Vụ Pháp Lý',
          'Luật Doanh Nghiệp',
          'Luật Lao Động',
          'Luật Gia Đình',
          'Luật Bất Động Sản',
          'Tư Vấn Miễn Phí',
          'TP HCM'
        ] 
      : [
          'TK & Associates',
          'Law Office',
          'Corporate Law',
          'Employment Law',
          'Family Law',
          'Real Estate Law',
          'Legal Solutions',
          'Free Consultation',
          'Ho Chi Minh City'
        ],
    ogTitle: language === 'vi' 
      ? 'Văn Phòng Luật Sư TK & Liên Danh - Giải Pháp Pháp Lý Ưu Việt Tại TP HCM' 
      : 'TK & Associates Law Office - Superior Legal Solutions in HCMC',
    ogDescription: language === 'vi' 
      ? 'Khám phá dịch vụ pháp lý tại Văn Phòng Luật Sư TK & Liên Danh, chuyên về luật doanh nghiệp, lao động, gia đình và bất động sản.' 
      : 'Explore expert legal services at TK & Associates, specializing in corporate, employment, family, and real estate law. Contact us for a free consultation.',
    ogImage: language === 'vi' 
      ? 'https://res.cloudinary.com/djjhbosrm/image/upload/v1737170448/export_2_tgleml.png' 
      : 'https://res.cloudinary.com/djjhbosrm/image/upload/v1737170018/export_1_qa3g4i.png',
    ogUrl: language === 'vi' 
      ? 'https://www.tklaw.vn/' 
      : 'https://www.tklaw.vn/en',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterCreator: '@TKLawVN',
    twitterTitle: language === 'vi' 
      ? 'Văn Phòng Luật Sư TK & Liên Danh - Giải Pháp Pháp Lý Ưu Việt Tại TP HCM' 
      : 'TK & Associates Law Office - Superior Legal Solutions in HCMC',
    twitterDescription: language === 'vi' 
      ? 'Khám phá dịch vụ pháp lý tại Văn Phòng Luật Sư TK & Liên Danh, chuyên về luật doanh nghiệp, lao động, gia đình và bất động sản.' 
      : 'Explore expert legal services at TK & Associates, specializing in corporate, employment, family, and real estate law. Contact us for a free consultation.',
    twitterImage: language === 'vi' 
      ? 'https://res.cloudinary.com/djjhbosrm/image/upload/v1737170448/export_2_tgleml.png' 
      : 'https://res.cloudinary.com/djjhbosrm/image/upload/v1737170018/export_1_qa3g4i.png',
  };

  // Return metadata or fallback
  return seoData[key] || defaultMetadata;
};

export default useSeo;
