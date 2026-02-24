import type { CollectionConfig } from 'payload'
import { LocationField } from '@fields/location/field';
import { RichText } from '@fields/RichText'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
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
      name: 'selfEmployed',
      type: 'checkbox',
      label: 'Self Employed',
      defaultValue: false,
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'currentWork',
      type: 'checkbox',
      label: 'Current Work',
      defaultValue: false,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        condition: (data, siblingData) => !siblingData.currentWork,
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },
    LocationField,
    {
      name: 'locationType',
      type: 'select',
      options: [
        { label: 'Remote', value: 'Remote' },
        { label: 'On-Site', value: 'On-site' },
        { label: 'Hybrid', value: 'Hybrid' },
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