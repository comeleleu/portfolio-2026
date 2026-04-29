import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { Pool } from 'pg'
import { Companies } from '@collections/Companies'
import { Experiences } from '@collections/Experiences'
import { Links } from '@collections/Links'
import { Medias } from '@/collections/Medias'
import { Projects } from '@collections/Projects'
import { Schools } from '@/collections/Schools'
import { Studies } from '@/collections/Studies'
import { Tags } from '@collections/Tags'
import { Sections } from '@globals/Sections'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Companies,
    Experiences,
    Links,
    Medias,
    Projects,
    Schools,
    Studies,
    Tags,
  ],

  globals: [
    Sections,
  ],


  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({ pool }),

  sharp,
})