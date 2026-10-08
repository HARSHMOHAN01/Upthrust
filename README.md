# Upthrust Design — Landing Page Implementation

A responsive, high-performance landing page built for **Upthrust** based on the provided design specifications, 3D assets, and conversion tracking requirements.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/HARSHMOHAN01/Upthrust.git](https://github.com/HARSHMOHAN01/Upthrust.git)
- **Live / Staging URL**: Deployable in 1 click to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) from the `main` branch.

---

## 🛠️ Stack Used & Why

| Technology | Purpose | Why Selected |
| :--- | :--- | :--- |
| **Next.js 15 (App Router)** | Framework | Server-side rendering (SSR) ensures full HTML pre-rendering for SEO, zero layout shift with `next/font`, and fast routing. |
| **TypeScript** | Language | Enforces strict schemas across content models, form data, and 3D canvas props. |
| **Tailwind CSS** | Styling | Rapid tokenized styling matching exact brand specifications across `375px`, `768px`, and `1440px` viewports with zero CSS bloat. |
| **Three.js** | 3D Engine | Native WebGL rendering of the Classical Bust (`Updated statue.glb`) and winding metallic ribbon (`curve line with dark orange.glb`) with custom lighting and mouse parallax. |
| **Lucide React** | Icons | Tree-shaken modern iconography with minimal footprint. |

---

## 📁 Project Structure

```text
├── public/
│   ├── models/            # 3D GLB assets (statue & curve line)
│   └── designs/           # Mockup images & asset references
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/       # POST: Form validation & persistent lead storage
│   │   │   └── submissions/   # GET: Endpoint to review recorded leads
│   │   ├── globals.css        # Brand CSS variables & accessible focus rings
│   │   ├── layout.tsx         # Root layout with fonts, JSON-LD & GTM setup
│   │   ├── not-found.tsx      # Accessible 404 handler
│   │   ├── page.tsx           # Assembled landing page
│   │   ├── robots.ts          # Technical SEO bot directives
│   │   └── sitemap.ts         # Automated dynamic XML sitemap
│   ├── components/
│   │   ├── brand/             # Upthrust vector logos & client partner logos
│   │   ├── faq/               # Accessible animated FAQ accordion
│   │   ├── footer/            # Large brand banner & studio locations
│   │   ├── forms/             # ContactForm with validation & GTM tracker
│   │   ├── hero/              # HeroSection with 3D canvas & callouts
│   │   ├── navigation/        # Responsive header with mobile drawer
│   │   ├── seo/               # Schema.org JSON-LD structured data
│   │   ├── services/          # Interactive capabilities tabs & mockups
│   │   ├── testimonials/      # Verified client quote cards
│   │   ├── three/             # Optimized Three.js WebGL canvases
│   │   └── visuals/           # CAD blueprint overlays & hand-drawn markers
│   ├── content/
│   │   └── site-data.ts       # Decoupled single-source-of-truth CMS content
│   ├── lib/
│   │   ├── content.ts         # Server-side getters for content
│   │   └── utils.ts           # Class merger utility (clsx + twMerge)
│   └── types/
│       └── content.ts         # Strict TypeScript interfaces for all sections
├── next.config.mjs            # Immutable asset caching & package optimizations
├── tailwind.config.ts         # Brand color tokens & custom breakpoints
└── tsconfig.json              # Path aliases (@/*)
```

---

## ✏️ How Content Can Be Edited (CMS / Non-Developer Setup)

To meet the requirement that copy, testimonials, services, and FAQs can be edited without modifying frontend components:
- All site content is defined in **`src/content/site-data.ts`** backed by strict TypeScript types in **`src/types/content.ts`**.
- A non-developer can edit headlines, bullets, FAQs, images, or contact configurations in one place.
- **CMS Extensibility**: The getter functions in `src/lib/content.ts` are asynchronous (`async getSiteData()`), allowing this file-based content layer to be swapped for a headless CMS (Sanity, Strapi, Decap, or Supabase) with zero changes to UI components.

---

## 📝 Form Handling & Google Tag Manager (GTM) Tracking

### 1. Form Validation & Backend Storage
- **Client Validation**: Full Name (min 2 characters), RFC-compliant email regex, service selection, and project brief (min 5 characters).
- **Backend Handler (`/api/contact`)**: Server-side re-validation, ISO timestamping, and storage into `data/submissions.json` (with memory fallback).
- **Demonstration Endpoint (`/api/submissions`)**: A live JSON endpoint allowing you to demonstrate where submitted leads are stored during the interview.

### 2. Required Conversion Event
Upon a successful submission, the form pushes the required `form_submit` event to the GTM `dataLayer`:
```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "form_submit",
  formId: "contact-form",
  submissionId: "lead_17284..._abcde",
  service: "Brand & visual identity",
  timestamp: "2026-10-09T00:00:00.000Z"
});
```
*Note: A live event inspector is embedded on the form success card so the interviewer can verify the event directly on-screen.*

---

## ⚡ Performance & Core Web Vitals (Target: Mobile 85+)

- **First Load JS**: Kept to a lean **~124 kB**.
- **3D Canvas Viewport Throttling**: Both Three.js canvases use `IntersectionObserver` to pause `requestAnimationFrame` render loops when scrolled out of view.
- **Mobile GPU Capping**: Automatically limits `devicePixelRatio` to `1.5` on mobile devices to preserve 60 FPS and battery life.
- **Instant LCP Fallback**: Lightweight visual fallback renders immediately before the 3D `.glb` assets finish loading.
- **Caching**: Configured immutable HTTP caching headers (`max-age=31536000, immutable`) for all 3D models and image assets.

---

## ♿ Accessibility (Target: Lighthouse 90+) & SEO

- **Semantic HTML**: Strict `header`, `nav`, `main`, `section`, `article`, and `footer` landmark hierarchy.
- **Heading Structure**: Strictly **one `<h1>`** (`BOLD DESIGN THAT PERFORMS`), followed by logical `<h2>` and `<h3>` tags.
- **A11y Features**: Accessible "Skip to main content" link, `aria-expanded` attributes on hamburger menu and accordions, explicit `<label for="...">` associations, and visible focus rings (`outline: 2px solid #FF4500`).
- **Structured Data (JSON-LD)**: Pre-renders `ProfessionalService` and `FAQPage` schema into HTML for Google Rich Results.
- **Technical SEO**: Dynamic `sitemap.xml` and `robots.txt` generated automatically via Next.js metadata routes.

---

## 🤖 AI Tools Used During Development
- **Antigravity AI (Google DeepMind)**: Assisted with project scaffolding, design component extraction from image mockups, Three.js WebGL canvas setup, and optimization audits.
- **Review & Refinement**: All generated code was reviewed, typed, validated for semantic accessibility, and verified through production builds (`npm run build`).

---

## ⏳ Known Limitations & Future Improvements
1. **Headless CMS Cloud Sync**: Connect `site-data.ts` to Sanity or Strapi Studio for a visual GUI editor for non-technical editors.
2. **WebGL Shaders**: Add real-time chromatic aberration / oil-slick iridescent post-processing shaders on the statue bust.
3. **Email Notification Webhook**: Wire `/api/contact` to Resend or SendGrid to dispatch immediate confirmation emails to clients.

---

## 💻 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open http://localhost:3000 in your browser

# 4. Production build test
npm run build
```
