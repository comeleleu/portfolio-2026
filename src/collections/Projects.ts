import type { CollectionConfig } from 'payload'
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
        { label: 'Personnal', value: 'personnal' },
        { label: 'Professional', value: 'professional' },
        { label: 'Hackathon', value: 'hackathon' },
        { label: 'Open Source', value: 'open-source' },
      ],
      required: true,
    },
    RichText({ name: 'description', required: true }),
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}