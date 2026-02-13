import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import { Projects } from '@collections/Projects'
import { Tags } from '@collections/Tags'


export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Projects,
    Tags,
  ],

  secret: process.env.PAYLOAD_SECRET || '',
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  
  sharp,
})