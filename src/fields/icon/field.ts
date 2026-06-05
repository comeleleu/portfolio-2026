import type { Field } from 'payload';

/**
 * A custom Payload CMS field configuration for FontAwesome icons.
 * 
 * Uses a custom client component {@link IconComponent} in the admin UI
 * to allow search-as-you-type selection of FontAwesome icons from solid, regular, and brand sets.
 */
export const IconField: Field = {
  name: 'icon',
  type: 'text',
  admin: {
    components: {
      Field: '@fields/icon/component#IconComponent',
    },
  }
}
