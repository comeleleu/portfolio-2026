import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache';

export const Medias: CollectionConfig = {
  slug: 'medias',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'medias',
    imageSizes: [
      {
        name: 'thumbnail',
        height: undefined,
        width: 400,
        position: 'centre',
      },
      {
        name: 'card',
        height: undefined,
        width: 768,
        position: 'centre',
      },
      {
        name: 'tablet',
        height: undefined,
        width: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('medias', 'max');
        return doc;
      },
    ],
  },
}