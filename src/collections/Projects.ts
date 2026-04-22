import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache';
import { RichText } from '@fields/RichText'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'context',
      type: 'select',
      options: [
        { label: 'Personnal', value: 'Personnal' },
        { label: 'Professional', value: 'Professional' },
        { label: 'Hackathon', value: 'Hackathon' },
        { label: 'Open Source', value: 'Open Source' },
      ],
      required: true,
    },
    RichText({ name: 'description', required: true }),
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'links',
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('projects', 'max');
        return doc;
      },
    ],
  },
}