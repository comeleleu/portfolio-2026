import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache';
import { IconField } from '@fields/icon/field';

export const Links: CollectionConfig = {
  slug: 'links',
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
      localized: true,
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'external',
      type: 'checkbox',
      defaultValue: true,
    },
    IconField,
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('links', 'max');
        return doc;
      },
    ],
  },
}
