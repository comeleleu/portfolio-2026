import type { CollectionConfig } from 'payload'
import { RichText } from '@fields/RichText'

export const Studies: CollectionConfig = {
  slug: 'studies',
  admin: {
    useAsTitle: 'degree',
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
      name: 'school',
      type: 'relationship',
      relationTo: 'schools',
      required: true,
    },
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'select',
      options: [
        { label: 'High School', value: "High School" },
        { label: 'Associate', value: "Associate's degree" },
        { label: 'Bachelor', value: "Bachelor's degree" },
      ],
      required: true,
    },
    {
      name: 'field',
      type: 'text',
      label: 'Field of Study',
      required: true,
    },
    {
      name: 'currentStudy',
      type: 'checkbox',
      label: 'Current Studies',
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
        condition: (data, siblingData) => !siblingData.currentStudy,
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
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