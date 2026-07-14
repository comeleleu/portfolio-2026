import type { Field } from 'payload';

/**
 * A custom Payload CMS field configuration for locations.
 * 
 * Uses a custom client component {@link LocationComponent} in the admin UI
 * to perform auto-complete location searches using the Photon (Komoot) Geocoding API.
 */
export const LocationField: Field = {
  name: 'location',
  type: 'text',
  localized: true,
  admin: {
    components: {
      Field: '@fields/location/component#LocationComponent',
    },
  }
}