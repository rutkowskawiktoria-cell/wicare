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
- **Local area landing pages** `/omraader/[slug]` — one per northern-suburb town for local SEO ("[service] + [town]" queries). Data in `src/lib/areas.ts` (9 towns: hellerup, charlottenlund, klampenborg, gentofte, holte, hoersholm, rungsted, vedbaek, skodsborg), each with **unique bilingual (da/en) copy** to avoid thin/duplicate content. Route `src/app/omraader/[slug]/page.tsx` (generateStaticParams + per-town DA metadata + LocalBusiness/Service/Breadcrumb schema) renders client component `src/components/AreaLanding.tsx`. Linked as town chips in `Footer.tsx`; included in `sitemap.ts`. To add a town: append to `areas.ts` (slug + name + postal + nearby + da/en copy) — everything else is automatic. After adding, submit new URLs in Search Console.
- **Contact form** `src/components/sections/ContactForm.tsx` — Web3Forms; set `WEB3FORMS_KEY` (owner's free key) to enable direct submissions, else falls back to Gmail compose. Has honeypot spam trap.
- **Analytics**: GTM `GTM-TXV53GK8` + GA4 `G-T2ZVMZK3M8`, gated behind **Consent Mode v2** (consent banner `ConsentBanner.tsx`, denied until opt-in). `src/lib/track.ts` pushes `cta_click` / `generate_lead`.
- **Schema**: LocalBusiness (layout) + Service + FAQPage + BreadcrumbList.
- **Photos**: `public/services/*.webp` (+ `-detail`), `hero-bg.webp`, `careers.webp`, `van.webp`. Source PNGs (real uniform photos) live in `/Users/at/Documents/Claude/WiCare/*.png`. Re-encode to WebP with PIL (quality ~60 hero / ~62 cards). Hero is a high-priority `<img>` (LCP), preloaded in `layout.tsx`.

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
