import { GlobalConfig } from 'payload';
import { RichText } from '@fields/RichText'

export const Sections: GlobalConfig = {
  slug: 'sections',
  label: 'Sections',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'navbar',
          label: 'Navbar',
          fields: [
            {
              name: 'links',
              type: 'relationship',
              relationTo: 'links',
              hasMany: true,
              required: true,
            },
          ],
        },
        {
          name: 'about',
          label: 'About Section',
          fields: [
            {
              name: 'fullname',
              label: 'Full Name',
              type: 'text',
              required: true,
            },
            {
              name: 'jobTitle',
              label: 'Job Title',
              type: 'text',
              required: true,
            },
            RichText({ name: 'description', required: true }),
            {
              name: 'profilePicture',
              label: 'Profile Picture',
              type: 'upload',
              relationTo: 'medias',
              required: true,
            },
          ],
        },
        {
          name: 'experiences',
          label: 'Experiences Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'links',
              type: 'relationship',
              relationTo: 'links',
              hasMany: true,
            },
          ],
        },
        {
          name: 'projects',
          label: 'Projects Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'links',
              type: 'relationship',
              relationTo: 'links',
              hasMany: true,
            },
          ],
        },
      ]
    }
  ],
};
