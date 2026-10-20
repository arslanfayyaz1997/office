# Internlytic Technologies — Interactive 3D Virtual Office

A responsive React + Vite company experience combining an interactive 3D street/office walkthrough with company information, service details, internship information, project-focused content, and an appointment-request form.

## Included in this version

- Responsive landing page for Internlytic Technologies
- 3D street scene with an office exterior, company sign, trees, lights, and a controllable procedural character
- Keyboard movement (WASD / arrow keys), drag-to-look camera, and a touch movement pad
- Office entrance interaction and an expanded 3D lobby/reception/workspace preview
- Six detailed service cards with a modal explaining each service
- About, internship pathway, projects, and contact information sections
- Appointment-request form with request type, preferred date/time, topic, and message
- Appointment form prepares an email draft addressed to `arslanfayyaz1997@gmail.com`; the visitor must send it in their own email app
- Responsive mobile navigation and reduced-motion CSS support
- Branding and content configuration in `src/config/siteConfig.js`

## Run the website

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Controls

- Move: WASD or arrow keys
- Look around: drag the 3D canvas
- Enter the office: approach the entrance and press E, or use the entrance button
- Mobile: use the on-screen movement pad; drag the scene to look around
- Inside: use Exit to Street to return outside

## Appointment form scope

The form validates the required name and email fields, then opens a pre-filled `mailto:` draft. This is a useful front-end request workflow, but it is **not** an automated booking database and does not confirm calendar availability. For true automated bookings, connect a backend such as Supabase and a calendar/email provider, create secure server-side validation, and configure booking notifications. No secret keys belong in the frontend.

## Production notes and honest limitations

The 3D person, building, furniture, and vegetation are procedural Three.js geometry, not photorealistic licensed models. The person has a basic procedural walk cycle; this is not a full motion-captured character. The interior is a 3D lobby/workspace preview rather than a multi-floor navigable office game. For a production-grade realistic result, replace these meshes with optimized, licensed GLB/GLTF models and rigged animation, then test movement/collisions and mobile GPU performance on real devices.

The appointment form has no database persistence. The Instagram URL is a generic profile URL and should be replaced with the official company profile before launch. Confirm the current company service scope, internship availability, and social URLs before publishing.

## Main files

- `src/App.jsx` — page layout, service details, appointment form, modals
- `src/components/World.jsx` — 3D exterior, character, entrance, and interior
- `src/styles.css` — responsive visual styling
- `src/config/siteConfig.js` — company identity, links, service descriptions, and page copy

## Deploy to Vercel

1. Upload/push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.
4. Test desktop and mobile movement, all service cards, appointment email draft, navigation, and contact links before sharing publicly.
