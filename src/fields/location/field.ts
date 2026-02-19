import type { Field } from 'payload';
import { LocationComponent } from './component';

export const LocationField: Field = {
  name: 'location',
  type: 'text',
  admin: {
    components: {
      Field: LocationComponent,
    },
  }
}