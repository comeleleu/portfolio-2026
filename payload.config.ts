import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { Companies } from '@collections/Companies'
import { Experiences } from '@collections/Experiences'
import { Links } from '@collections/Links'
import { Medias } from '@/collections/Medias'
import { Projects } from '@collections/Projects'
import { Schools } from '@/collections/Schools'
import { Studies } from '@/collections/Studies'
import { Tags } from '@collections/Tags'
import { Sections } from '@globals/Sections'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.warn('⚠️ ATTENTION: BLOB_READ_WRITE_TOKEN est manquant. Le stockage Vercel Blob sera désactivé.');
} else {
  console.warn('⚠️ ATTENTION: BLOB_READ_WRITE_TOKEN: ' + process.env.BLOB_READ_WRITE_TOKEN);
}

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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),

  plugins: [
    vercelBlobStorage({
      collections: {
        medias: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const token = process.env.BLOB_READ_WRITE_TOKEN || '';
            const match = token.match(/^vercel_blob_rw_([a-z0-9]+)_[a-zA-Z0-9]+$/i);
            if (match && match[1]) {
              return `https://${match[1]}.public.blob.vercel-storage.com/${prefix ? `${prefix}/` : ''}${filename}`;
            }
            return `/api/medias/file/${filename}`;
          },
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],

  sharp,
})