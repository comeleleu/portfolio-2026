import type { CollectionConfig } from 'payload'
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
    LocationField,
    {
      name: 'url',
      type: 'text',
    },
  ],
}
