# Interview Presentation & Live Change Guide

This guide prepares you to present your build live during the Upthrust technical review.

---

## 1. How to Walk Through the Implementation

### A. The Live Webpage & Responsive Showcase
1. Open the website on your laptop.
2. Open Chrome DevTools (`F12` or `Ctrl+Shift+I`).
3. Switch to Device Mode and demonstrate responsiveness across the 3 key breakpoints:
   - **375px (Mobile)**: Show the hamburger menu drawer, responsive font scaling, and smooth single-column flow.
   - **768px (Tablet)**: Show balanced layouts and touch-friendly targets.
   - **1440px (Desktop)**: Show the full design with CAD blueprint schematics, floating callouts, and the 3D statue.

### B. Demonstrating the 3D Integration
- Point to the **Classical Bust** in the Hero: Explain that it's rendered in native **Three.js** using `GLTFLoader` with customized directional rim lighting to mimic iridescent highlights, and passive mouse parallax tracking.
- Mention that both 3D canvases use **`IntersectionObserver`** to pause animation loops when scrolled away to preserve mobile battery and ensure a **PageSpeed Performance score of 85+**.

### C. Demonstrating Forms & Conversion Tracking
1. Scroll to the **Contact Section**.
2. Trigger client validation by submitting an empty form to show field error handling.
3. Fill out the fields and submit.
4. Point out the **Reference ID** and the **GTM DataLayer Event Inspector** showing the exact `form_submit` event payload.
5. In a new tab, navigate to:
   ```text
   http://localhost:3000/api/submissions
   ```
   Show the JSON array with the saved lead to prove backend persistence.

### D. Demonstrating the CMS / Content Architecture
- Open `src/content/site-data.ts`.
- Explain: *"All text, testimonials, service deliverables, FAQs, and metadata are completely decoupled from the UI components. A non-developer can edit this file directly, and because our getters in `src/lib/content.ts` are async, we can plug in Sanity, Strapi, or any headless CMS without touching a single React component."*

---

## 2. Common "Live Change" Scenarios & Exact Fixes

During the interview, the interviewer may ask you to make a small live change. Here is how to execute the most common ones in seconds:

### Scenario 1: "Update an FAQ through the CMS"
- **File**: `src/content/site-data.ts`
- **Location**: Look for `faqs: [...]` (around line 170).
- **Action**: Add or edit an FAQ object:
  ```ts
  {
    id: "faq-4",
    question: "Do you offer post-launch support and retainers?",
    answer: "Yes, we provide ongoing design sprints and quarterly brand evolution retainers."
  }
  ```
- **Result**: Save the file. Next.js Fast Refresh will immediately update the accordion on screen.

### Scenario 2: "Change a headline or body copy"
- **File**: `src/content/site-data.ts`
- **Location**: Edit `hero.headlineTop` or `services.items[0].description`.
- **Action**: Change the text and hit save.

### Scenario 3: "Modify a form event or add a field to the GTM payload"
- **File**: `src/components/forms/ContactForm.tsx`
- **Location**: Search for `gtmPayload` (around line 70).
- **Action**: Add an additional property, for example:
  ```ts
  const gtmPayload = {
    event: "form_submit",
    formId: "contact-form",
    submissionId: resData.submissionId,
    service: formData.service,
    clientSource: "direct_web", // <-- added live
    timestamp: new Date().toISOString(),
  };
  ```

### Scenario 4: "Adjust an image or mockup card"
- **File**: `src/content/site-data.ts`
- **Location**: Look for `mockupImage` under `services.items`.
- **Action**: Change `/designs/Service 1.jpg` to another image path.

---

## 3. How to Answer Common Architecture Questions

**Q: Why did you pick Next.js instead of Webflow or plain React?**
> *"Next.js provides Server Components and full HTML pre-rendering, which is critical for technical SEO and Core Web Vitals. It gives us built-in API routes for serverless form handling, automatic font optimization, and clean deployment to Vercel without having to manage separate backend servers."*

**Q: How did you ensure 3D models don't hurt mobile performance?**
> *"We used dynamic imports with `ssr: false`, an instant image fallback so the Largest Contentful Paint (LCP) isn't blocked, `devicePixelRatio` capping on mobile to prevent GPU strain, and `IntersectionObserver` to pause WebGL rendering when the canvas is scrolled out of view."*

**Q: How would this scale to a multi-page client website?**
> *"Because the content layer in `site-data.ts` is fully schema-typed with TypeScript, we can easily swap the local data file for a cloud CMS like Sanity or Contentful. The components are modular and decoupled, making it trivial to create `/services/[slug]`, `/case-studies`, or `/about` pages."*
