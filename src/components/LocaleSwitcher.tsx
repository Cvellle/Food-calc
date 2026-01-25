'use client';

import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const locales: {code: string; label: string}[] = [
    {code: 'en', label: 'EN'},
    {code: 'it', label: 'IT'}
  ] as const;

  type TranslationFunction = (
    key: string,
    params?: Record<string, string>
  ) => string;

  const t = useTranslations('LocaleSwitcher') as TranslationFunction;
  const locale = useLocale();

  return (
    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
      <span>{t('switchLocale', {locale})}</span>

      {locales.map(({code, label}) => {
        const active = code === locale;

        return (
          <Link
            key={code}
            href="/"
            locale={code as 'en' | 'it' | 'sr'}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              background: active ? '#333' : '#f5f5f5',
              color: active ? '#fff' : '#000',
              textDecoration: 'none',
              fontWeight: active ? 'bold' : 'normal'
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
