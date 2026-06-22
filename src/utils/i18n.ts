export type Lang = 'bg' | 'en';

export const translations = {
  bg: {
    nav: {
      home: 'Начало',
      about: 'DreamDent',
      services: 'Услуги',
      implantology: 'Имплантология',
      aesthetic: 'Естетична стоматология',
      periodontology: 'Пародонтология',
      facial: 'Лицева естетика',
      aligners: 'Алайнери',
      other: 'Други',
      team: 'Екип',
      cases: 'Клинични случаи',
      tourism: 'Дентален туризъм',
      patient: 'За пациента',
      news: 'Новини',
      contact: 'Контакти',
    },
    hero: {
      cta: 'Запишете час',
      learnMore: 'Научете повече',
    },
    contact: {
      title: 'Свържете се с нас',
      subtitle: 'Запишете час или задайте вашия въпрос',
      name: 'Вашето имe',
      email: 'Имейл адрес',
      phone: 'Телефон',
      message: 'Съобщение',
      send: 'Изпратете',
      sending: 'Изпращане...',
      success: 'Вашето съобщение беше изпратено успешно! Ще се свържем с Вас скоро.',
      error: 'Възникна грешка. Моля опитайте отново.',
      address: 'Адрес',
      hours: 'Работно време',
      phone_label: 'Телефон',
      email_label: 'Имейл',
    },
    services: {
      title: 'Нашите услуги',
      subtitle: 'Комплексна дентална помощ с фокус върху естетиката и функцията',
      learnMore: 'Научете повече',
    },
    team: {
      title: 'Нашият екип',
      subtitle: 'Опитни специалисти, посветени на вашето здраве',
    },
    testimonials: {
      title: 'Какво казват нашите пациенти',
      subtitle: 'Над 158 отзива с оценка 4.9/5',
    },
    cases: {
      title: 'Клинични случаи',
      subtitle: 'Реални резултати от нашата практика',
      before: 'Преди',
      after: 'След',
    },
    tourism: {
      title: 'Дентален туризъм',
      subtitle: 'Комбинирайте лечение с почивка в България',
    },
    footer: {
      rights: 'Всички права запазени',
      tagline: 'Център по имплантология и естетична стоматология',
    },
    working_hours: {
      monday: 'Понеделник',
      tuesday: 'Вторник',
      wednesday: 'Сряда',
      thursday: 'Четвъртък',
      friday: 'Петък',
      saturday: 'Събота',
      sunday: 'Неделя',
      closed: 'Почивен ден',
    },
    booking: {
      title: 'Запишете час',
      subtitle: 'Свържете се с нас за консултация',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'DreamDent',
      services: 'Services',
      implantology: 'Implantology',
      aesthetic: 'Aesthetic Dentistry',
      periodontology: 'Periodontology',
      facial: 'Facial Aesthetics',
      aligners: 'Aligners',
      other: 'Other',
      team: 'Team',
      cases: 'Clinical Cases',
      tourism: 'Dental Tourism',
      patient: 'For Patients',
      news: 'News',
      contact: 'Contact',
    },
    hero: {
      cta: 'Book Appointment',
      learnMore: 'Learn More',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Book an appointment or ask your question',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      success: 'Your message has been sent successfully! We will contact you soon.',
      error: 'An error occurred. Please try again.',
      address: 'Address',
      hours: 'Working Hours',
      phone_label: 'Phone',
      email_label: 'Email',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive dental care focused on aesthetics and function',
      learnMore: 'Learn More',
    },
    team: {
      title: 'Our Team',
      subtitle: 'Experienced specialists dedicated to your health',
    },
    testimonials: {
      title: 'What Our Patients Say',
      subtitle: 'Over 158 reviews with a 4.9/5 rating',
    },
    cases: {
      title: 'Clinical Cases',
      subtitle: 'Real results from our practice',
      before: 'Before',
      after: 'After',
    },
    tourism: {
      title: 'Dental Tourism',
      subtitle: 'Combine treatment with a holiday in Bulgaria',
    },
    footer: {
      rights: 'All rights reserved',
      tagline: 'Center of Implantology and Aesthetic Dentistry',
    },
    working_hours: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
    },
    booking: {
      title: 'Book Appointment',
      subtitle: 'Contact us for a consultation',
    },
  },
} as const;

export function getLang(url: URL): Lang {
  return url.pathname.startsWith('/en') ? 'en' : 'bg';
}

export function t(lang: Lang) {
  return translations[lang];
}

export function localePath(lang: Lang, path: string): string {
  if (lang === 'en') return `/en${path}`;
  return path;
}

export const servicesSlugs = {
  bg: {
    implantology: '/услуги/имплантология',
    aesthetic: '/услуги/естетична-стоматология',
    periodontology: '/услуги/пародонтология',
    facial: '/услуги/лицева-естетика',
    aligners: '/услуги/алайнери',
    other: '/услуги/други',
  },
  en: {
    implantology: '/en/services/implantology',
    aesthetic: '/en/services/aesthetic-dentistry',
    periodontology: '/en/services/periodontology',
    facial: '/en/services/facial-aesthetics',
    aligners: '/en/services/aligners',
    other: '/en/services/other',
  },
};
