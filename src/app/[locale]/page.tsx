import PageLayout from '@/components/PageLayout';

import {getTranslations} from 'next-intl/server';
import ClientIndex from './ClientIndex';

type Props = {
  searchParams: Record<string, string>;
};

export default async function Index({searchParams}: Props) {
  const t = await getTranslations('Index');

  return (
    <PageLayout title={t('title')}>
      <ClientIndex />
    </PageLayout>
  );
}
