# WiCare ApS — Project Memory (read this first)

Purpose of this file: give any future session full context immediately, so it does **not** re-explore the codebase from scratch (saves time and tokens). Update it when something durable changes.

## What this is
Marketing website for **WiCare ApS** — VIP home & lifestyle services (Home Cleaning, Private Dining & Catering, Property & Garden Care) in the **northern suburbs of Copenhagen**. Live: **https://wicare.vip**. Primary market is **Danish**.

## Stack & hosting
- **Next.js 15** (App Router), **static export** (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`).
- Tailwind CSS v3. Fonts via **next/font** (Playfair Display serif, Inter sans).
- Repo working copy: `/Users/at/Documents/WiCare/WiCare_latest` (sandbox: `/sessions/*/mnt/WiCare_latest`).
- GitHub: `rutkowskawiktoria-cell/wicare`, deploy branch `main`. The git remote already holds a push token — **never print it** (pipe pushes through `sed -E 's/ghp_[A-Za-z0-9]+/ghp_***/g'`). Recommend the owner use a fine-grained PAT and rotate periodically.
- **Deploy pipeline**: push `main` → GitHub Actions "Deploy to GitHub Pages" builds `out/` → Pages → **Cloudflare** (proxied, Copenhagen edge). Propagation is slow (the "updating_pages" step can take 2–8 min; deploys sometimes queue).

## Build / test workflow (important)
- `npm run build` needs internet to fetch Google Fonts at build (next/font). **It succeeds on GitHub Actions but FAILS in the sandbox** (no access to fonts.googleapis.com) — that failure is expected and only means the font fetch, not a code error.
- For local validation use **`npx tsc --noEmit`** (fast, no network) and `npx --yes esbuild@0.23.0 <file> --outfile=/tmp/o.js` for per-file syntax.
- Verify live via the Chrome MCP: fetch same-origin and inspect. Note **Tailwind emits colors as `rgb(r g b / a)` channels**, not hex — search for e.g. `27 43 74` (navy) not `#1B2B4A`.

## Brand (navy + steel-blue — matches the uniforms/van/logo)
Tokens in `tailwind.config.js`:
- primary `#1B2B4A` (navy, sampled from polos) · secondary `#26406B` · accent `#6BA8CE` (steel blue) · accent-dark `#2E6A93` (text on light, AA) · accent-deep `#4E8FBE` · light `#F1F4F8`.
- Also hard-coded in `src/app/globals.css` (body text, focus outline, scrollbar), `layout.tsx` viewport `themeColor`, `Logo.tsx` crest gradient.
- **Logo** = the "WiCare" wordmark (white/navy "Wi" + steel-blue "Care", `#6BA8CE` on dark / `#3E7CA6` on light) in Navbar + Footer. Crest dropped from nav; `Logo.tsx` crest still used on `/card`.
- Assets regenerated in navy/blue: `public/favicon.svg`, `apple-touch-icon.png`, `logo.png`, `og-image.png`.

### Do NOT reintroduce
- **Critida / olive oil / Partners** — removed entirely.
- **Emerald/brass** palette (`#12302A` / `#C9A96A`) — replaced by navy/steel-blue.
- **Bright WhatsApp green** `#25D366` — use frosted-glass (hero) or emerald/secondary (floating/card).
- Stark **black** button text — use `text-primary`.

## i18n
- Bilingual EN/DK, **client-side**, in `src/lib/i18n/LanguageContext.tsx`. Default rendered (crawlable) locale is **Danish** (`initialLocale || 'da'`) because the market is Danish; non-DK visitors switch to English client-side (browser lang + ipapi.co). `<html lang="da">`.
- Copy in `src/lib/i18n/translations.ts` (`const en` / `const da: typeof en` — keep shapes identical).
- Meta titles/descriptions are Danish + local keywords (per page, incl. `services/[slug]/page.tsx` `daMeta` map).
- Full localized `/da` + `/en` routes with hreflang are **not** built (this is the "Danish-default interim"). That's the proper next SEO step if needed.

## Pages & features
- Routes: `/`, `/services/[the-home|the-table|the-estate]`, `/omraader/[slug]` (local area landing pages), `/blog` + `/blog/[slug]`, `/careers`, `/faq`, `/card`, `/privacy`, `/terms`. Service display names: Home Cleaning / Private Dining & Catering / Property & Garden Care (slugs stay `the-home/table/estate`).
- **Booking anchors (printed-card QR — do NOT change):** the printed business-card QR points to `https://wicare.vip/#booking`, so **`id="booking"` is on the HERO section** (`Hero.tsx`) — a `/#booking` load lands at the TOP of the site (hero has Call + WhatsApp above the fold). The bottom "Klar til at Komme i Gang?" CTA (`Booking.tsx`) uses **`id="book"`**, and all on-site "Book Now" links (`Navbar`, `Footer`, `FloatingActions`, translations `footer.links`) point to **`/#book`**. Never move `#booking` back to the bottom section — the printed cards would then land at the page bottom.
- **Hero headline (live, Sept 2026):** title renders on three lines — `VIP` / `Home & Lifestyle` (DA `Hjem & Livsstil`) / `Services` — via `\n` in `hero.title` + `whitespace-pre-line` on the `<h1>`; the motto (`hero.motto`: "Discretion. Precision. Trust." / "Diskretion. Præcision. Tillid.") is its own key, rendered bold before `hero.subtitle`.
- **Local area landing pages** `/omraader/[slug]` — one per northern-suburb town for local SEO ("[service] + [town]" queries). Data in `src/lib/areas.ts` (9 towns: hellerup, charlottenlund, klampenborg, gentofte, holte, hoersholm, rungsted, vedbaek, skodsborg), each with **unique bilingual (da/en) copy** to avoid thin/duplicate content. Route `src/app/omraader/[slug]/page.tsx` (generateStaticParams + per-town DA metadata + LocalBusiness/Service/Breadcrumb schema) renders client component `src/components/AreaLanding.tsx`. Linked as town chips in `Footer.tsx`; included in `sitemap.ts`. To add a town: append to `areas.ts` (slug + name + postal + nearby + da/en copy) — everything else is automatic. After adding, submit new URLs in Search Console.
- **Erhvervsrengøring (commercial cleaning) angle** — added Sept 2026 after Search Console showed `erhvervsrengøring <town>` is the biggest NON-brand query (Holte 169, Skodsborg 81 impressions). Copy lives in `areaBusiness` (a separate export in `areas.ts`, unique per town, da/en) and renders as its own section in `AreaLanding.tsx`. Area page titles are now `Rengøring & Erhvervsrengøring i <town>`, with `erhvervsrengøring/kontorrengøring/privat rengøring` keywords and an `Erhvervsrengøring & kontorrengøring` entry in the LocalBusiness `makesOffer` schema.
- **Contact form** `src/components/sections/ContactForm.tsx` — Web3Forms; set `WEB3FORMS_KEY` (owner's free key) to enable direct submissions, else falls back to Gmail compose. Has honeypot spam trap.
- **Analytics**: GTM `GTM-TXV53GK8` + GA4 `G-T2ZVMZK3M8`, gated behind **Consent Mode v2** (consent banner `ConsentBanner.tsx`, denied until opt-in). `src/lib/track.ts` pushes `cta_click` / `generate_lead`.
- **Schema**: LocalBusiness (layout) + Service + FAQPage + BreadcrumbList.
- **Photos**: `public/services/*.webp` (+ `-detail`), `hero-bg.webp` (+ `-sm` mobile variant), `careers.webp`, `van.webp`. Source PNGs/JPGs (real photos) live in `/Users/at/Documents/Claude/WiCare/`. Re-encode to WebP with PIL (quality ~60 hero / ~62 cards) — see `scripts/optimize-images.py` STANDARD list. Hero is a high-priority `<img>` (LCP), preloaded in `layout.tsx`.
- **the-table gallery**: the Private Dining page detail gallery (`detailImgMap['the-table']` in `ServiceDetail.tsx`) uses 4 real event photos — `dining-event` (candlelit table), `dining-spread` (catering setup), `dining-seafood` (shrimp close-up), `dining-team` (chefs) — rendered as a 2×2 object-cover grid. Sources archived as `dining-*.jpg` in the photo dir. (Old `dining-detail.webp` left in place but unreferenced.)

## SEO / infra status
- Sitemap `/sitemap.xml` (auto from `sitemap.ts`), robots via `robots.ts`. Search Console verified (`sc-domain:wicare.vip`), sitemap submitted & read OK; ~7 pages indexed early on.
- **Cloudflare**: proxied, SSL **Full**, Bot Fight Mode **OFF** (don't turn on — challenges Googlebot), static assets cached ~31 days, zstd. **HSTS is now ON** (max-age 6 months, includeSubDomains, preload). Email Obfuscation is ON (adds a small render-blocking `email-decode.js`; owner can turn off in Scrape Shield). **Security headers** added via Cloudflare Response Header Transform Rule "Security headers" (all requests): `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), camera=(), microphone=()`. A strict CSP is intentionally NOT set (would break GTM/GA/consent banner/ipapi/fonts).
- **Owner-only actions that actually drive discovery** (not code): **Google Business Profile** (biggest local lever, not set up yet), collect **reviews**, Danish directory citations (Krak/Degulesider/Proff/Trustpilot). New domain → organic takes weeks–months; **Google Ads** is the only way to get traffic immediately.

## Dev / test workflow (never edit live directly)
- **`main` = live** (deploys to wicare.vip). **`dev` = working branch** — all changes land here first.
- `.github/workflows/ci.yml` runs on every non-main branch + PRs to main: it type-checks and does a full `npm run build` **without deploying**. So a broken change is caught on `dev` and can never reach live by accident.
- `.github/workflows/deploy.yml` triggers **only on push to `main`** — that is the single action that publishes to the live site.
- Flow: make changes on `dev` → CI build-check passes → (preview) → merge/PR `dev → main` to publish. Never commit straight to `main` for feature work.
### Hosting & preview (finalized — "Option 1")
- **Production = GitHub Pages** at wicare.vip, served through **Cloudflare's edge (proxied)** in **Alexander's** Cloudflare account (the account that holds the `wicare.vip` DNS zone). `deploy.yml` (push→main) is the only thing that publishes live.
- **Staging / preview = a Cloudflare Worker named `wicare`** in **Wiktoria's** Cloudflare account (account id `d0df002d…`), connected to this repo. It uses `wrangler.jsonc` (`assets.directory = ./out`) to serve the static export.
  - Build command `npm run build`; production deploy `npx wrangler deploy`; **non-production deploy `npx wrangler versions upload`** (so `dev` makes previews, not prod deploys).
  - `main` → `wicare.rutkowska-wiktoria.workers.dev` (a full staging mirror of live). `dev`/other branches → preview URL `*-wicare.rutkowska-wiktoria.workers.dev`. Preview URLs are enabled.
- **Why not one system:** the `wicare.vip` zone is in Alexander's account but the Worker is in Wiktoria's, and Cloudflare requires the zone + Worker in the same account to attach a custom domain. So the Worker can't serve wicare.vip. Canonical tags on every page point to `https://wicare.vip/...`, so the workers.dev mirror won't cause duplicate-content issues.
- To move prod onto Cloudflare later: recreate the Worker in **Alexander's** account (where the zone is) and attach `wicare.vip` there — no DNS/registrar changes needed.

## Redesign (in progress, Sept 2026) — branch `redesign`, never merged to live yet
- Owner wants a new site built **without touching live**; if approved, it replaces the current one. Brand kept: navy/steel-blue tokens + the WiCare wordmark. Scope: **homepage first**.
- Round 1 (Porcelæn / Kystlys / Concierge — calm, editorial) was rejected as "basic/boring". Owner asked for **extreme graphics**: picked *all* of cinematic scroll, 3D/WebGL, luxury glow & glass, giant kinetic type, as **three bold variants**. Round-1 code is only in git history (commit c888e43…32f70e4).
- Round 2 preview: **https://redesign-wicare.rutkowska-wiktoria.workers.dev/prototypes/homepage/** (`?v=1|2|3|4`, keys 1–4 / ←→, R = replay). `noindex`, not linked, not in sitemap.
  - **1 Cinematic** (`variants/Film.tsx`, `film.css`): GSAP ScrollTrigger + Lenis. Pinned hero flies through the villa's glass wall into the house (interior photo) with letterbox bars and "Diskretion. Præcision. Tillid." rising; condensed Archivo (wdth 62) + Instrument Serif italic; pinned horizontal services pan; velocity-reactive town marquee; words light up on scroll; team photo opens from a keyhole; sticky stacked testimonial cards; giant phone finale over the van.
  - **2 Liquid 3D** (`variants/Liquid.tsx`, `gl/*.ts`, `liquid.css`): Three.js. Hero photo through a fragment shader (cursor liquid lens + ripples + RGB split, water shimmer, melt on scroll, noisy reveal); ~7k particles assemble into the WiCare wordmark while pinned (cursor repels); service photos trail the cursor with bend/RGB split/noise-dissolve between services; glass trust cards over CSS caustics; Syne display.
  - **3 Aurora** (`variants/Aurora.tsx`, `aurora.css`): drifting aurora blobs in brand blues + grain + cursor spotlight; "Omhu" cut out of the villa photo (background-clip text); glass panel with orbiting border light; magnetic CTAs; custom cursor (`motion.tsx` `Cursor`); counters; glass bento with glow + GSAP tilt; outline marquee; pinned "Tillid" word filled with the team photo that opens into the full photo; glass testimonial rail; Fraunces (SOFT/opsz).
  - **4 Signature** (flagship, `variants/Signature.tsx`, `signature.css`, `gl/stage.ts`, `sound.ts`) — owner loves Cinematic and asked for "a version that usually costs $500k"; this is Cinematic, directed: ONE WebGL canvas behind the DOM renders every photo via scissored views tied to DOM elements (`Stage` + `heroView`/`chapterView`/`imageView`/`glassView`). Hero = 2.5D depth parallax (`public/proto/hero-depth.png`, hand-painted) + dolly into the lit glass + noise portal into the interior; pinned chapters I–III with ink-wipe photo transitions; 3D glass "WiCare" (TextGeometry from `public/proto/inter-bold-wicare.json`, an Inter Bold subset made with opentype.js; MeshPhysical transmission + dispersion over `hero-blur.webp`); preloader (counter, once per session, `?intro=1` forces, max 3.2s, skippable); film timecode HUD + chapter rail; illustrative Øresund coast map (SVG, approximate coords in `copy.ts townGeo`); end-credits testimonials; live open/closed status from Copenhagen time (Mon–Fri 08–18 = schema hours); opt-in generative WebAudio ambience. DOM <img>s stay for SEO/fallback and are hidden only when WebGL runs; reduced motion gets a static page.
- Shared: `motion.tsx` (Lenis↔GSAP ticker, React-safe `Chars`/`Words` splitting, `useMagnetic`, `Cursor`, QA hook `window.__gsap/__ST`), `fx.css`, `shared.tsx`/`shared.css` (nav, mobile call bar, contact form = same Web3Forms/Gmail logic, footer), `copy.ts` (DA/EN, no new claims; `fx` block). Variants are `next/dynamic` chunks (Three.js only loads for Liquid). Deps added: `gsap`, `lenis`, `three` (+`@types/three`). Photos in `public/proto/` (villa = `hero.webp` from `hero2.png` — NOTE `hero.png` in the photo folder is a banner with baked-in text, don't use it).
- All variants keep `id="booking"` on the hero (printed-card QR) with Call + WhatsApp above the fold on phones, plus `#services #trust #testimonials #contact #book`; reduced-motion users get static layouts.
- **Local visual QA that works** (in-app browser freezes when Claude's window is hidden): build with real fonts via `NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/tmp/fontmock2.js` (maps Google font requests to `@fontsource` files installed in `/tmp/fonts`), serve `out/` on 127.0.0.1, drive Playwright's `headless_shell` (in `~/.cache/ms-playwright`) with a stub `libXdamage.so.1` on `LD_LIBRARY_PATH` and `--use-angle=swiftshader` for WebGL. Scripts were `/tmp/qa.mjs` + `/tmp/runqa.sh` (recreate if /tmp was wiped).
- Gotchas learned: Next does **not** keep CSS import order between files → shared resets use `:where()`. Never let GSAP and a CSS `transition` animate the same property on the same element (ScrollTrigger refresh re-reads mid-transition values → elements stuck invisible/offset) — animate a wrapper or let GSAP own it. Intro tweens and scroll-scrubbed tweens must target different elements. IntersectionObserver callbacks can batch entries → use the last entry. Don't use `background:` shorthand on `.pf-input` (wipes the select chevron).
- Next step once the owner picks: promote the chosen direction into the real components (`page.tsx`, sections, translations; update the `hero-bg` preload in `layout.tsx`), then extend to service/area pages, via `dev` → CI → `main`. Photos are max 1408px wide (AI-generated sources) — higher-res originals would make the full-bleed zooms sharper.

## Email
- **hello@wicare.vip** is the public contact address, shown site-wide (footer, business card, contact-form Gmail fallback, careers mailto, privacy/terms contact, LocalBusiness schema `email`). It **forwards to wicareaps@gmail.com** via **Cloudflare Email Routing** (in **Alexander's** account, the zone that holds wicare.vip DNS).
- DNS: Cloudflare Email Routing MX (`route1/2/3.mx.cloudflare.net`, pri 4/6/14) + SPF (`v=spf1 include:_spf.mx.cloudflare.net ~all`) + DKIM (`cf2024-1._domainkey`, valid RSA key). The old Namecheap `eforward1-5.registrar-servers.com` MX were removed to let these take over. Routing status = Enabled; catch-all = Disabled (only hello@ forwards).
- **DMARC** (added 2026-07): TXT `_dmarc.wicare.vip` = `v=DMARC1; p=reject; rua=mailto:hello@wicare.vip; fo=1` (started at p=quarantine, tightened to p=reject same month — safe because no legit mail is sent from @wicare.vip). Note: outbound mail is sent from Gmail (wicareaps@gmail.com), not @wicare.vip, so DKIM on cf2024-1 is adequate; only add a Google DKIM selector if "send as hello@wicare.vip" is ever configured. Lookalike domains (wicare.net/.org/.co/.info) are third-party owned — DMARC on .vip does NOT cover them; only defensive registration/monitoring helps.
- Contact form still delivers via **Web3Forms** (keyed, destination set in the Web3Forms dashboard — not hardcoded); no address in code besides the mailto/compose fallbacks which point to hello@wicare.vip.

## Automation
- Scheduled task **`wicare-monthly-audit`** (1st of month, 08:00) at `/Users/at/Documents/Claude/Scheduled/wicare-monthly-audit/SKILL.md` runs the full technical/SEO/legal/UX/CRO audit, fixes what's safe, and saves a dated report to `/Users/at/Documents/Claude/WiCare/`.
- Scheduled task **`wicare-email-forwarding-check`** (1st of month, 08:30) at `/Users/at/Documents/Claude/Scheduled/wicare-email-forwarding-check/SKILL.md` verifies via DNS + live site that Cloudflare Email Routing is intact (MX `route1/2/3.mx.cloudflare.net`, SPF `include:_spf.mx.cloudflare.net`, DKIM `cf2024-1._domainkey`) and that hello@wicare.vip still forwards to wicareaps@gmail.com and shows on the site. Flags drift (missing MX, old `eforward*.registrar-servers.com` reappearing, wrong SPF).
- Reusable scripts live in `scripts/` (e.g. image optimization) — prefer running these over ad-hoc AI steps to save tokens.

## Token-saving conventions
1. **Read this file first** — don't re-scan the whole repo.
2. Validate with `tsc --noEmit`; only run a full `npm run build` when you truly need the `out/` output (and remember it fails in-sandbox on fonts).
3. Reuse `scripts/*` for repetitive work (image resize/WebP, pre-deploy checks).
4. Verify deploys with one scripted fetch, not many screenshots.
