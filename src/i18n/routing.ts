import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'it', 'sr'],
  defaultLocale: 'en',
  localePrefix:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-prefix-never'
      ? 'never'
      : {
          mode: 'as-needed',
          prefixes: {
            it: '/it'
          }
        },
  domains:
    process.env.NEXT_PUBLIC_USE_CASE === 'domains'
      ? [
          {
            domain: 'example.com',
            defaultLocale: 'en',
            locales: ['en', 'it', 'sr']
          },
          {
            domain: 'example.de',
            defaultLocale: 'it',
            locales: ['it']
          }
        ]
      : undefined,
  pathnames: {
    '/': '/',
    '/client': '/client',
    '/about': '/about',
    '/client/redirect': '/client/redirect',
    '/nested': {
      en: '/nested',
      de: '/verschachtelt',
      es: '/anidada',
      ja: '/ネスト'
    },
    '/redirect': '/redirect',
    '/news/[articleId]': {
      en: '/news/[articleId]',
      de: '/neuigkeiten/[articleId]',
      es: '/noticias/[articleId]',
      ja: '/ニュース/[articleId]'
    },
    '/news/just-in': {
      en: '/news/just-in',
      de: '/neuigkeiten/aktuell',
      es: '/noticias/justo-en',
      ja: '/ニュース/現在'
    }
  },
  localeCookie:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-cookie-false'
      ? false
      : {
          // 200 days
          maxAge: 200 * 24 * 60 * 60
        }
});
