import type { CollectionConfig } from 'payload'

export const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        {
          label: 'Link',
          value: 'faLink',
        },
        {
          label: 'External link',
          value: 'faArrowUpRightFromSquare',
        },
        {
          label: 'LinkedIn',
          value: 'faSquareLinkedin',
        },
        {
          label: 'GitHub',
          value: 'faGithub',
        },
        {
          label: 'GitLab',
          value: 'faGitlab',
        },
        {
          label: 'Globe',
          value: 'faGlobe',
        },
      ],
      required: false,
    },
  ],
}
