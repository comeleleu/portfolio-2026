import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache';
import { LocationField } from '@fields/location/field';

export const Schools: CollectionConfig = {
  slug: 'schools',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'medias',
      required: false,
    },
    LocationField,
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'links',
      hasMany: false,
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('schools', 'max');
        return doc;
      },
    ],
  },
}
