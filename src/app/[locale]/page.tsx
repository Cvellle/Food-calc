import PageLayout from '@/components/PageLayout';
import {getTranslations} from 'next-intl/server';
import ClientIndex from './ClientIndex';
import {cookies} from 'next/headers';
import {endpoint} from '../../../config/endpoint';

type Props = {
  searchParams: Promise<Record<string, string>>; // In Next 15, searchParams is also a Promise
};

export default async function Index({searchParams}: Props) {
  const t = await getTranslations('Index');
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({name, value}) => `${name}=${value}`)
    .join('; ');
  console.log(cookieHeader);
  // We await the whole chain so we can handle the result before rendering
  const user = await fetch(`${endpoint}/auth/me`, {
    headers: {
      cookie: cookieHeader,
      'User-Agent': 'NextJS-Server',
      Accept: 'application/json'
    },
    cache: 'no-store'
  })
    .then((res) => {
      // Log this to your terminal to see the status!
      console.log(
        `Server Fetch Status: ${res.status} from ${endpoint}/auth/me`
      );

      if (!res.ok) return null;
      return res.json();
    })
    .catch((err) => {
      console.error('Server Fetch Failed:', err.message);
      return null;
    });

  return (
    <PageLayout title={t('title')}>
      {/* Pass the user data to your Client Component */}
      <ClientIndex />
    </PageLayout>
  );
}
