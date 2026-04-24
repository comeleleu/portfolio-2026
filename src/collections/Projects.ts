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
    {
      name: 'currentProject',
      type: 'checkbox',
      label: 'Current Project',
      defaultValue: false,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      admin: {
        condition: (data, siblingData) => !siblingData.currentProject,
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
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