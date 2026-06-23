import { config, fields, collection, singleton } from '@keystatic/core';

// import.meta.env.DEV is replaced at build time by Vite/Astro:
// false in production builds → isProd = true → GitHub storage
// true in local dev → isProd = false → local storage
const isProd = !import.meta.env.DEV;

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: 'wowow-create',
          name: 'dreamdent-website',
        },
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'DreamDent Admin' },
  },

  singletons: {
    siteSettings: singleton({
      label: 'Настройки на сайта',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        logo: fields.image({
          label: 'Лого (качи PNG/SVG с прозрачен фон)',
          description: 'Появява се в хедъра и фуутъра. Препоръчителен размер: 200×60px, PNG с прозрачен фон.',
          directory: 'public/images/settings',
          publicPath: '/images/settings/',
        }),
        phone: fields.text({ label: 'Телефон', defaultValue: '0887 513 752' }),
        email: fields.text({ label: 'Имейл', defaultValue: 'info@dreamdent.eu' }),
        address: fields.text({ label: 'Адрес', defaultValue: 'гр. Плевен, бул. „Русе" №17, ет. 1, каб. 2' }),
        addressEn: fields.text({ label: 'Address (EN)', defaultValue: 'Pleven, Blvd "Ruse" 17, floor 1, office 2' }),
        mondayHours: fields.text({ label: 'Понеделник', defaultValue: '12:30 – 18:30' }),
        tuesdayHours: fields.text({ label: 'Вторник', defaultValue: '8:30 – 13:30' }),
        wednesdayHours: fields.text({ label: 'Сряда', defaultValue: '8:30 – 13:30' }),
        thursdayHours: fields.text({ label: 'Четвъртък', defaultValue: '12:30 – 18:30' }),
        fridayHours: fields.text({ label: 'Петък', defaultValue: '8:30 – 13:30' }),
        facebookUrl: fields.url({ label: 'Facebook URL' }),
        instagramUrl: fields.url({ label: 'Instagram URL' }),
      },
    }),

    homepage: singleton({
      label: 'Начална страница',
      path: 'src/content/homepage',
      schema: {
        heroTitle: fields.text({ label: 'Hero заглавие (BG)', defaultValue: 'Център по имплантология и естетична стоматология' }),
        heroTitleEn: fields.text({ label: 'Hero title (EN)', defaultValue: 'Center of Implantology and Aesthetic Dentistry' }),
        heroSubtitle: fields.text({ label: 'Hero подзаглавие (BG)', defaultValue: 'Вашата усмивка е нашият приоритет' }),
        heroSubtitleEn: fields.text({ label: 'Hero subtitle (EN)', defaultValue: 'Your smile is our priority' }),
        aboutText: fields.text({ label: 'За нас (BG)', multiline: true, defaultValue: 'Ние сме екип от единомислещи хора, отдадени на работата си в името на пациента.' }),
        aboutTextEn: fields.text({ label: 'About text (EN)', multiline: true }),
        statsImplants: fields.text({ label: 'Брой импланти', defaultValue: '2000+' }),
        statsYears: fields.text({ label: 'Години опит', defaultValue: '20+' }),
        statsPatients: fields.text({ label: 'Доволни пациенти', defaultValue: '5000+' }),
      },
    }),
  },

  collections: {
    posts: collection({
      label: 'Блог / Новини',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заглавие (BG)' } }),
        titleEn: fields.text({ label: 'Title (EN)' }),
        date: fields.date({ label: 'Дата', defaultValue: { kind: 'today' } }),
        excerpt: fields.text({ label: 'Кратко описание (BG)', multiline: true }),
        excerptEn: fields.text({ label: 'Short description (EN)', multiline: true }),
        coverImage: fields.image({
          label: 'Снимка',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({ label: 'Съдържание (BG)' }),
        contentEn: fields.markdoc({ label: 'Content (EN)' }),
      },
    }),

    clinicalCases: collection({
      label: 'Клинични случаи',
      slugField: 'title',
      path: 'src/content/clinical-cases/*',
      schema: {
        title: fields.slug({ name: { label: 'Заглавие (BG)' } }),
        titleEn: fields.text({ label: 'Title (EN)' }),
        service: fields.select({
          label: 'Услуга',
          options: [
            { label: 'Имплантология', value: 'implantology' },
            { label: 'Естетична стоматология', value: 'aesthetic' },
            { label: 'Пародонтология', value: 'periodontology' },
            { label: 'Лицева естетика', value: 'facial' },
            { label: 'Алайнери', value: 'aligners' },
          ],
          defaultValue: 'implantology',
        }),
        beforeImage: fields.image({
          label: 'Снимка ПРЕДИ',
          directory: 'public/images/cases',
          publicPath: '/images/cases/',
        }),
        afterImage: fields.image({
          label: 'Снимка СЛЕД',
          directory: 'public/images/cases',
          publicPath: '/images/cases/',
        }),
        description: fields.text({ label: 'Описание (BG)', multiline: true }),
        descriptionEn: fields.text({ label: 'Description (EN)', multiline: true }),
      },
    }),

    team: collection({
      label: 'Екип',
      slugField: 'name',
      path: 'src/content/team/*',
      schema: {
        name: fields.slug({ name: { label: 'Ime' } }),
        role: fields.text({ label: 'Роля (BG)', defaultValue: 'Дентален лекар' }),
        roleEn: fields.text({ label: 'Role (EN)', defaultValue: 'Dental Doctor' }),
        photo: fields.image({
          label: 'Снимка',
          directory: 'public/images/team',
          publicPath: '/images/team/',
        }),
        bio: fields.text({ label: 'Биография (BG)', multiline: true }),
        bioEn: fields.text({ label: 'Biography (EN)', multiline: true }),
        specializations: fields.array(
          fields.text({ label: 'Специализация' }),
          { label: 'Специализации (BG)', itemLabel: (p) => p.value }
        ),
        specializationsEn: fields.array(
          fields.text({ label: 'Specialization (EN)' }),
          { label: 'Specializations (EN)', itemLabel: (p) => p.value }
        ),
        order: fields.integer({ label: 'Ред на показване', defaultValue: 1 }),
      },
    }),

    testimonials: collection({
      label: 'Отзиви',
      slugField: 'author',
      path: 'src/content/testimonials/*',
      schema: {
        author: fields.slug({ name: { label: 'Автор' } }),
        text: fields.text({ label: 'Отзив (BG)', multiline: true }),
        textEn: fields.text({ label: 'Review (EN)', multiline: true }),
        rating: fields.integer({ label: 'Оценка (1-5)', defaultValue: 5 }),
      },
    }),
  },
});
