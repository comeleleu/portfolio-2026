# Portfolio 2026

A modern portfolio website and Content Management System (CMS) built with Next.js (App Router), Payload CMS v3, Tailwind CSS v4, Supabase (PostgreSQL), and Vercel Blob Storage.

Created by [@comeleleu](https://github.com/comeleleu) and live at [comeleleu.dev](https://comeleleu.dev).

---

## 🚀 Key Features & Particularities

This project is not just a static portfolio, it is fully dynamic and manageable via an integrated headless CMS.

- **Payload CMS v3 Integration**: Manage all website content dynamically through the admin dashboard (`/admin`).
- **Tailwind CSS v4**: Built with the latest generation of Tailwind CSS using CSS-first configuration.
- **Structured Database Schema**: Includes dedicated relational schemas for experiences, projects, academic history, skills tags, and company listings.
- **Custom Location Autocomplete**: The `LocationField` uses a custom React component that calls the **Photon (Komoot) Geocoding API** for real-time location lookup, with automated state/province formatting for North America.

---

## 🛠 Tech Stack

| Technology        | Version / Tooling           | Purpose                                         |
| :---------------- | :-------------------------- | :---------------------------------------------- |
| **Framework**     | Next.js 16.2.4 (App Router) | React framework & server-side rendering         |
| **CMS Platform**  | Payload CMS 3.84.1          | Headless CMS and database management layer      |
| **Database**      | PostgreSQL via Supabase     | Relational data storage                         |
| **Media Storage** | Vercel Blob Storage         | Cloud storage for uploaded medias / resume PDFs |
| **Styling**       | Tailwind CSS v4             | Utility-first CSS framework                     |
| **UI Components** | Sharp                       | Image optimization                              |
| **Icons**         | FontAwesome SVG             | Vector icons for social links & items           |

---

## ☁️ Hosting & Infrastructure

The project is designed to be hosted on **Vercel** with **Supabase** for database services and **Vercel Blob Storage** for media uploads.

### Required Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```ini
### GENERAL
FAVICON_URL=https://...

### PAYLOAD
PAYLOAD_SECRET=your_super_secret_payload_key

### DB
# Use the Supabase transaction/session pooler connection string
DATABASE_URL=postgres://postgres.[project]:[password]@[region].pooler.supabase.com:6543/postgres?supa=base-pooler.x

### VERCEL BLOB
# Token from your Vercel project's Blob Storage tab
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

---

## 💻 Useful Commands

Below are the commands defined in the `package.json` to start development and build the application:

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Build the application for production
npm run build

# Start the built production server locally
npm run start

# Run ESLint validation
npm run lint

# Regenerate Payload CMS import map
npm run generate:importmap
```

---

## 🗄️ Database Import / Export (Supabase)

To backup the database or transfer data between your environments (e.g., from `production` to `preprod` / `staging`), the project includes `prod_data.sql` and `preprod_data.sql` data-only dumps.

> [!WARNING]
> Dumping or restoring data directly changes the database content. Always verify your connection string/URL before running these operations!

### 📥 1. Exporting / Dumping Data from Supabase

To dump only the table data out of a specific environment into an SQL file, use the **Supabase CLI**:

```bash
# Dump data using your database
supabase link --project-ref [production-id]
supabase db dump --data-only > prod_data.sql
```

### 📥 2. Adjusting the exported SQL File:

To allow safe loading of the data in any order without failing on foreign key constraints, you must edit the exported `.sql` file:

1. **Prepend this helper setting** to the very beginning of the file to bypass constraint checks:
   ```sql
   SET session_replication_role = replica;
   ```
2. **Add a TRUNCATE statement** (including `RESTART IDENTITY CASCADE`) before the insert commands to wipe the existing data clean before reload:
   ```sql
   TRUNCATE TABLE
       "public"."links",
       "public"."companies",
       "public"."experiences",
       "public"."tags",
       "public"."experiences_rels",
       "public"."projects",
       "public"."schools",
       "public"."studies",
       "public"."payload_migrations",
       "public"."payload_preferences",
       "public"."payload_preferences_rels",
       "public"."projects_rels",
       "public"."sections",
       "public"."sections_rels",
       "public"."studies_rels"
   RESTART IDENTITY CASCADE;
   ```
3. **Append this reset command** at the very end of the file:
   ```sql
   RESET ALL;
   ```
4. **Remove environment-specific table data & insertions**: Delete all statements attempting to create tables, insert records, or set sequences for `"public"."users"`, `"public"."users_sessions"`, and `"public"."medias"` (e.g., `INSERT INTO "public"."users" ...`, `INSERT INTO "public"."users_sessions" ...`, `INSERT INTO "public"."medias" ...`, and their corresponding sequence sets). This prevents copying or overwriting environment-specific admin accounts, active sessions, and referencing Vercel Blob files that do not exist in the target environment.

### 📤 3. Importing / Restoring Data to Supabase

To load production data into preprod, use the **Supabase CLI**:

```bash
supabase link --project-ref [preproduction-id]
supabase db query --linked < preprod_data.sql
```
