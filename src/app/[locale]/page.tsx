import {getTranslations} from 'next-intl/server';
import PageLayout from '../../components/PageLayout';

import {getMeals} from '@/services/meals';

type Props = {
  searchParams: Record<string, string>;
};

export default async function Index({searchParams}: Props) {
  const t = await getTranslations('Index');

  const posts = await getMeals();

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>

      <div>
        <p>This meal contains:</p>
        {posts?.nutrients?.map((post) => (
          <div key={post.nutrient}>
            <p>{post.nutrient}</p>
            <p>
              {post.total.toFixed(2)} {post.unit}
            </p>
          </div>
        ))}
      </div>

      {/* <p data-testid="CurrentTimeRelative">{format.relativeTime(now)}</p>      
      <div>
        <Link href={{pathname: '/', query: {test: true}}}>
          Go to home with query param
        </Link>
      </div>
      <ClientRouter />
      <ClientLink href="/">Link on client without provider</ClientLink>
      <MessagesAsPropsCounter />  
      <p data-testid="SearchParams">{JSON.stringify(searchParams, null, 2)}</p> */}
      {/* <p data-testid="HasTitle">{JSON.stringify(t.has('title'))}</p> */}

      {/* <Image alt="" height={77} priority src="/assets/image.jpg" width={128} /> */}
      {/* <AsyncComponent /> */}
      {/* <DropdownMenu /> */}
    </PageLayout>
  );
}
