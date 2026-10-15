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
- `/campus-life` — Residential/recreational facilities, boarding daily routine,
  clubs & sports, "Student's Voice" media spotlight (4 student profiles)
- `/gallery` — 5 categories (Campus, Students, Faculty & Staff, Community &
  Media, Achievements), 17 real photos total
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
3. Framework preset: Next.js (auto-detected). No environment variables needed.
4. Click Deploy.

Every push to `main` will auto-redeploy.

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
