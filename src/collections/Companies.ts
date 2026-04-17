import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'; // Importation de la fonction Next.js
import { LocationField } from '@fields/location/field';

export const Companies: CollectionConfig = {
  slug: 'companies',
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
      name: 'url',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('companies', 'max');
        return doc;
      },
    ],
  },
}
