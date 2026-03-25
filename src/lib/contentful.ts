import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getEntries(contentType: string, query: Record<string, any> = {}) {
  return client.getEntries({
    content_type: contentType,
    ...query,
  } as any);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getEntry(contentType: string, slug: string, locale: string) {
  const entries = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    locale,
    limit: 1,
  } as any);
  return entries.items[0] ?? null;
}

export default client;
