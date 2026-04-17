import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache';

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('tags', 'max');
        return doc;
      },
    ],
  },
}
