import type { Field } from 'payload';

export const LocationField: Field = {
  name: 'location',
  type: 'text',
  admin: {
    components: {
      Field: '@fields/location/component#LocationComponent',
    },
  }
}