# Siddhartha Boarding Secondary School — Website

A Next.js (App Router) + Tailwind CSS website for Siddhartha Boarding Secondary
School, Kawasoti-3, Nawalpur, Nepal. Design direction: "Heritage Crest" —
traditional, crest-forward, navy/maroon/gold palette built from the school's
real logo and campus photography.

## Stack
- Next.js 16 (App Router, Turbopack build)
- React 19
- Tailwind CSS v4
- next/image for optimized images (all local, in `public/images/`)
- next/font for Playfair Display (headings) + Source Sans 3 (body)

## Pages
- `/` — Home
- `/about` — History timeline, mission/values, founder's full message, community
  impact (scholarship/insurance programs), "did you know" trivia, staff
- `/academics` — Detailed per-level curriculum (subjects/focus areas), teaching
  philosophy, assessment system, SEE results, learning-resource facilities
- `/admissions` — Process, eligibility by level, documents checklist,
  scholarships, FAQ accordion, enquiry form
- `/campus-life` — Facilities, transportation, clubs & sports, "Student's
  Voice" media spotlight (4 student profiles)
- `/gallery` — Campus & Leadership, Community & Media, Student's Voice On Air
- `/notices` — Public notice board; renders uploaded PDFs/images inline
- `/admin/login` — Staff CMS login (also linked from the site footer)
- `/admin` — CMS dashboard (protected)
- `/admin/notices` — Publish/delete notices (protected)
- `/contact` — Contact details, office hours, embedded map, enquiry form

Each page uses distinct hero imagery and page-specific content — shared data
(stats, nav) lives in `src/lib/content.js`, but page-level copy and image
selection are written per page so no two pages repeat the same section.

## Local development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Production build
```bash
npm run build
npm run start
```

## Deploying to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel login
vercel          # preview deploy
vercel --prod   # production deploy
```

### Option B — GitHub + Vercel dashboard (recommended for ongoing edits)
1. Push this repo to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the GitHub repo.
3. Framework preset: Next.js (auto-detected).
4. Set environment variables (Project Settings -> Environment Variables):
   see "Notices feature setup" below — required for the Notices page to work.
5. Click Deploy.

Every push to `main` will auto-redeploy.

## Notices CMS setup (required one-time step)

The site has a small CMS at `/admin` where school staff log in and publish
notices (PDFs or images with a title/description). Visitors see them
rendered inline on `/notices` — no forced downloads. Because Vercel's
servers don't have persistent disk storage, uploaded files are stored in
**Vercel Blob** instead of the local filesystem, and the login session is a
secure, signed, httpOnly cookie (not a hardcoded user list — just one shared
staff password).

1. In the Vercel dashboard, open this project -> **Storage** tab -> **Create
   Database** -> **Blob** -> connect it to this project. This automatically
   adds a `BLOB_READ_WRITE_TOKEN` environment variable — no manual copying
   needed.
2. Add one more environment variable yourself: `ADMIN_PASSWORD`, set to a
   password only school staff should know. This is the CMS login password —
   anyone who knows it can sign in and publish/delete notices, so keep it
   private and strong.
3. Redeploy (or just push a commit) so the new environment variables take
   effect.
4. Staff then go to `https://<your-domain>/admin/login` (also linked as
   "Staff Login" in the site footer), sign in with the password, and manage
   notices from the dashboard. Sessions last 7 days; use "Log Out" in the
   CMS header to end one early.

For local development, copy `.env.example` to `.env.local` and fill in the
same two values (pull `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard, or
run `vercel env pull .env.local` after linking the project with `vercel link`).

## Content & images
- Shared data (contact info, nav links, academic ladder detail, facilities,
  stats, student quotes, FAQ, boarding routine) lives in `src/lib/content.js`
  — edit there to update text reused across pages. Page-specific prose lives
  directly in each `src/app/<page>/page.js` file.
- All 17 photos + the logo are in `public/images/`, sourced from the school's
  public Facebook page, two independent Nepali news articles covering the
  school (twin-students story, community insurance program), and the official
  logo supplied directly by the client. **These are web-resolution (compressed)
  images.** For the sharpest possible hero/banner images, ask the school for
  original high-resolution photos and swap the files in `public/images/`
  (keep the same filenames, or update the references in each page).

## Known gaps to fill with the client before/after launch
- Official school email address (currently only phone numbers are shown)
- Exact admission process, required documents, and fee structure
- Current-year SEE results/statistics to replace placeholder figures
- Backend/integration for the enquiry forms on Admissions and Contact pages
  (currently a static form — wire up to an email service, e.g. Resend, or a
  form backend like Formspree, once an email address is available)
- Higher-resolution logo file (vector/SVG) if one exists
- Verify the embedded Google Map pin is accurate
