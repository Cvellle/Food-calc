import {expect, test as it} from '@playwright/test';
import {getAlternateLinks} from './utils';

it('redirects to a locale prefix correctly', async ({request}) => {
  const response = await request.get('/', {
    maxRedirects: 0,
    headers: {
      'Accept-Language': 'it'
    }
  });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('it/');
});

it('redirects a localized pathname correctly', async ({request}) => {
  const response = await request.get('it/nested/', {maxRedirects: 0});
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('it/verschachtelt/');
});

it('redirects a page with a missing trailing slash', async ({request}) => {
  expect((await request.get('it', {maxRedirects: 0})).headers().location).toBe(
    'it/'
  );
  expect(
    (await request.get('it/client', {maxRedirects: 0})).headers().location
  ).toBe('it/client/');
});

it('renders page content', async ({page}) => {
  await page.goto('/');
  await page.getByRole('heading', {name: 'Home'}).waitFor();

  await page.goto('it/');
  await page.getByRole('heading', {name: 'Start'}).waitFor();
});

it('renders links correctly', async ({page}) => {
  await page.goto('it/');
  await expect(page.getByRole('link', {name: 'Client-Seite'})).toHaveAttribute(
    'href',
    'it/client/'
  );
  await expect(
    page.getByRole('link', {name: 'Verschachtelte Seite'})
  ).toHaveAttribute('href', 'it/verschachtelt/');
});

it('returns alternate links correctly', async ({request}) => {
  async function getLinks(pathname: string) {
    return getAlternateLinks(await request.get(pathname));
  }

  for (const pathname of ['/', '/en', 'it']) {
    expect(await getLinks(pathname)).toEqual(
      expect.arrayContaining([
        '<http://localhost:3000/>; rel="alternate"; hreflang="en"',
        '<http://localhost:3000it/>; rel="alternate"; hreflang="de"',
        '<http://localhost:3000/spain/>; rel="alternate"; hreflang="es"',
        '<http://localhost:3000/ja/>; rel="alternate"; hreflang="ja"',
        '<http://localhost:3000/>; rel="alternate"; hreflang="x-default"'
      ])
    );
  }

  for (const pathname of ['/nested', '/en/nested', 'it/nested']) {
    expect(await getLinks(pathname)).toEqual(
      expect.arrayContaining([
        '<http://localhost:3000/nested/>; rel="alternate"; hreflang="en"',
        '<http://localhost:3000it/verschachtelt/>; rel="alternate"; hreflang="de"',
        '<http://localhost:3000/spain/anidada/>; rel="alternate"; hreflang="es"',
        '<http://localhost:3000/ja/%E3%83%8D%E3%82%B9%E3%83%88/>; rel="alternate"; hreflang="ja"',
        '<http://localhost:3000/nested/>; rel="alternate"; hreflang="x-default"'
      ])
    );
  }
});

it('can handle dynamic params', async ({page}) => {
  await page.goto('/news/3');
  await page.getByRole('heading', {name: 'News article #3'}).waitFor();

  await page.goto('it/neuigkeiten/3');
  await page.getByRole('heading', {name: 'News-Artikel #3'}).waitFor();
});
