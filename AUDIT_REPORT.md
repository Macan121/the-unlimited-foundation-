# The Unlimited Foundation website audit

Audit date: 13 October 2026  
Production: https://the-unlimited-foundation.vercel.app  
Related site inspected: https://tnfa.vercel.app  
Repository revision: `93089deea1425557857beca1be4cd5d013e4bae5` (`main`)

## Scope, evidence standard, and conclusion

This was a non-destructive engineering, security, accessibility, content, and UX audit. No production data was submitted, no enquiry was sent, and no redesign was implemented. The audit combined repository inspection, live-browser interaction, production HTTP requests, source-to-deployment hash comparison, requested responsive viewport measurements, keyboard interaction, local no-JavaScript/missing-image testing, and static security review.

The central concern is confirmed: the site feels oversized because several independent choices compound, not because of one global scale error. At 1440 × 900 the rendered body text is 17.95 px with a 29.62 px line height, the hero heading is 76 px, the hero is 704 px high, the header is 76 px, section padding is 96 px, and the content shell is 1248 px. The hero and header therefore consume 780 px—87% of the viewport—while the first heading in the next section begins at about y=992 px. At 1280 × 720 and 1366 × 768, the hero ends at y=780 px, so no following content appears above the fold. The 768 px tablet width is disproportionately large: its hero heading is 69.86 px because the mobile type override does not begin until 720 px.

The site is technically lean and structurally sound for its size: it is a static multi-page site, contains no third-party client runtime, has a very small script, uses real links, has one `h1` per tested page, responds correctly on all 11 public routes, and works as content when JavaScript is blocked. The largest practical failures are the unaddressed contact draft, disconnected TNFA relationship, internal/placeholder copy, missing SEO deployment configuration, and weak evidence about the organisation and its programmes.

**Version note:** at the start of the audit, production Home/CSS/JS exactly matched the then-generated `dist` artifacts. During the audit, the shared working tree changed concurrently; these were not audit edits and were preserved. The current uncommitted repository expands the TNFA page around Summit ’27 and rebuilds `dist` with `TUF_TNFA_URL=https://tnfa.vercel.app`, while current production still serves the earlier TNFA page and an empty TNFA URL. CSS and JavaScript remain byte-identical. The responsive measurements and screenshots therefore describe current production; the new uncommitted TNFA copy is reviewed separately as a repository-only change.

**Post-audit remediation note (14 October 2026):** after the audit was completed, the owner supplied the canonical TNFA URL, contact email, and two phone numbers and requested their implementation. The repository now includes a visitor-facing TNFA introduction and direct external link, visible email/telephone links on the contact page and footer, and a default addressed email draft. The local build and generated-route checks pass. This partially resolves `FUNC-01` and `NAV-01` in the repository, but it does not change the production observations or responsive measurements recorded below; production had not been redeployed when this note was added. The first supplied phone number, `+232 88 0563`, should be reconfirmed because it is unusually short.

### Classification used in this report

- **Confirmed defect:** directly reproduced in the browser, HTTP response, generated output, or source.
- **Design judgment:** a measured visual choice that is valid CSS but undermines hierarchy, density, or perceived credibility.
- **Suspected risk:** code or configuration creates a plausible weakness, but exploitability or user impact was not demonstrated.
- **Requires access/content:** cannot be resolved honestly without an approved address, organisational facts, programme details, analytics, or another repository.

Severity reflects user/security impact, not implementation difficulty. Confidence is High when directly reproduced, Medium when inferred from source and standards, and Low only where important runtime evidence was unavailable.

---

## A. Executive assessment — ten most important findings

1. **The desktop composition is materially oversized (High, confirmed/design judgment).** The 76 px hero heading, 23–24 px hero paragraph, 704 px hero, 96 px section padding, 1248 px shell, and 403 × 465 px cards compound into a presentation-slide feel. On both requested laptop heights, the hero alone pushes all following content below the fold. Evidence: [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:14), requested viewport measurements, and screenshots below.

2. **Tablet typography has an avoidable scale jump (Medium, confirmed).** At 768 × 1024 the navigation has already switched to mobile, but the hero still uses the desktop fluid scale: 69.86 px. The small-screen override starts only at 720 px. This is the least balanced representative viewport. Evidence: [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:315), [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:337).

3. **The contact journey cannot deliver an addressed enquiry (High, confirmed).** Production config contains `contactEmail: ""`; valid submissions build `mailto:` with an empty recipient. Users are told to “add the recipient,” but no verified address is published. This is transparent but does not satisfy the goal of contacting the foundation. Evidence: [`script.js`](C:/Users/NICOL/Desktop/TUF/script.js:77), [`tools/site.mjs`](C:/Users/NICOL/Desktop/TUF/tools/site.mjs:103), production config snapshot.

4. **Production TUF and TNFA are textually related but digitally disconnected (High, confirmed).** Production `TUF_TNFA_URL` is empty, so “Visit TNFA Website” is absent. The current uncommitted `dist` does set `https://tnfa.vercel.app`, but it has not reached production. TNFA labels itself “An initiative of TUF” yet its inspected homepage contains no reciprocal TUF link. Evidence: [`script.js`](C:/Users/NICOL/Desktop/TUF/script.js:59), [`CONTENT_DEPENDENCIES.md`](C:/Users/NICOL/Desktop/TUF/CONTENT_DEPENDENCIES.md:5), captured production/TNFA HTML.

5. **Published programme wording conflicts with the current TNFA site (High, requires owner confirmation).** Production TUF repeatedly presents “Leadership Simulation” within “Youth & Leadership”; live TNFA centres the 2027 Youth Leadership Summit and four leadership frontiers. The new repository-only TNFA page now follows Summit ’27, but the TUF homepage still contains Leadership Simulation wording, creating an internal working-tree inconsistency as well. The new copy also includes venue, audience, positioning, and status claims that require owner verification before deployment.

6. **Internal planning language and thin pages reduce credibility (High, confirmed/design judgment).** “Three confirmed initiatives,” “A confirmed project…,” and “confirmed pathway” explain internal verification status rather than visitor value. The About, partner, Smiling Children, and academy pathway pages lack the facts visitors need to decide or trust: organisational status, people, history, programme format, eligibility, dates, cost, safeguarding/contact information, or a concrete next step. The repository correctly refuses to invent these facts, but the public experience remains thin. Evidence: [`tools/site.mjs`](C:/Users/NICOL/Desktop/TUF/tools/site.mjs:73), [`CONTENT_DEPENDENCIES.md`](C:/Users/NICOL/Desktop/TUF/CONTENT_DEPENDENCIES.md:13).

7. **SEO fundamentals are incomplete in production (Medium, confirmed).** Every main route has a unique title and description, and `robots.txt` allows crawling, but production has no canonical links, no XML sitemap (`/sitemap.xml` returns 404), no Open Graph/Twitter metadata, and no structured data. The related TNFA site’s OG/Twitter image URLs point to `http://localhost:3000`, which will break social previews. Evidence: [`tools/build.mjs`](C:/Users/NICOL/Desktop/TUF/tools/build.mjs:6), [`tools/site.mjs`](C:/Users/NICOL/Desktop/TUF/tools/site.mjs:125), production HTTP responses.

8. **Accessibility foundations are good, but two semantics/contrast defects are confirmed (Medium).** The global focus color is only 2.67:1 against `#171717`, below the WCAG 2.2 AA 3:1 focus-indicator contrast requirement on dark sections. Project child pages also mark the `/projects/` parent link `aria-current="page"` even though the current URL is a child route. Menus otherwise support keyboard activation, Escape, outside click, and focus return. Evidence: [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:57), [`tools/site.mjs`](C:/Users/NICOL/Desktop/TUF/tools/site.mjs:23).

9. **The performance architecture is lean, but image delivery is not responsive (Medium, confirmed opportunity).** Critical raw assets are modest—HTML 10.9 KB, CSS 25.5 KB, JS 4.9 KB, logo 51.7 KB, hero 155.7 KB—and text compressed to 2.5/5.9/1.7 KB in production. There is no framework hydration or third-party script. However, every viewport downloads the same 1600 px hero and 990 px logo because no `srcset`/`sizes` or modern format is provided. Field LCP/CLS/INP and throttled Lighthouse data were unavailable, so no Core Web Vitals pass is claimed.

10. **Security exposure is low, but response hardening and reliability tests are incomplete (Low–Medium, confirmed/suspected).** HSTS is strong and the app has no authentication, database, server API, upload, or stored personal data. No exposed secret was found in the inspected files. Production lacks CSP, frame protection, `X-Content-Type-Options`, explicit referrer policy, and permissions policy; this is defense-in-depth, not proof of an exploit. Missing-image fallback CSS is partly dead/undefined, legacy redirects return 200 with meta refresh, and automated coverage does not exercise interactions, layout, accessibility, or headers.

---

## B. Why the site feels oversized

### Measured screenshots

Nominal 100% browser view at 1440 × 900:

![TUF homepage at 1440 by 900](C:/Users/NICOL/Desktop/TUF/audit-evidence/live-home-1440x900.png)

At 1280 × 720, the 76 px header plus 704 px hero exceeds the viewport height:

![TUF homepage at 1280 by 720](C:/Users/NICOL/Desktop/TUF/audit-evidence/live-home-1280x720.png)

At 768 × 1024, the navigation is compact but the heading remains nearly 70 px:

![TUF homepage at 768 by 1024](C:/Users/NICOL/Desktop/TUF/audit-evidence/live-home-768x1024.png)

At 390 × 844, the mobile layout is readable, but the 544 px hero and stacked CTAs still dominate most of the first view:

![TUF homepage at 390 by 844](C:/Users/NICOL/Desktop/TUF/audit-evidence/live-home-390x844.png)

### Requested viewport measurements

All values are rendered CSS pixels from the live page. The scrollbar reduced the visual content width by about 15 px on desktop; the configured viewport width itself matched the requested width.

| Viewport | Body / line | Header | Logo | Hero | Hero `h1` | Hero text | Section padding | First project card | Page height |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 360 × 800 | 16.01 / 26.41 | 72 | 152 × 58 | 544 | 44 / 46.2 | 16.8 / 25.2 | 48 top/bottom | 305 × 401 | 6092 |
| 390 × 844 | 16.06 / 26.50 | 72 | 152 × 58 | 544 | 44 / 46.2 | 16.8 / 25.2 | 48 top/bottom | 332 × 415 | 6120 |
| 768 × 1024 | 16.74 / 27.63 | 72 | 176 × 68 | 576 | 69.86 / 73.35 | 20.67 / 31.01 | 80 top/bottom | 332 × 420 | 5078 |
| 1280 × 720 | 17.66 / 29.15 | 76 | 205 × 79 | 704 | 76 / 79.8 | 22.72 / 34.08 | 96 top/bottom | 372 × 448 | 4427 |
| 1366 × 768 | 17.82 / 29.40 | 76 | 216 × 83 | 704 | 76 / 79.8 | 23.06 / 34.60 | 96 top/bottom | 398 × 462 | 4441 |
| 1440 × 900 | 17.95 / 29.62 | 76 | 216 × 83 | 704 | 76 / 79.8 | 23.36 / 35.04 | 96 top/bottom | 403 × 465 | 4444 |
| 1920 × 1080 | 18 / 29.7 | 76 | 216 × 83 | 704 | 76 / 79.8 | 24 / 36 | 96 top/bottom | 403 × 466 | 4445 |

At 1440 × 900, the content shell is 1248 px, the horizontal margin is about 88 px, the project gap is 20 px, each card is about 403 px wide, its image is 205 px high, and its body is 259 px high with 22.4 px padding. These are internally consistent values, but they create a large, low-density composition.

### Root causes and source locations

1. **Fluid body type scales to 18 px with a 1.65 line height.** This yields roughly 29.7 px lines on desktop. The size is accessible in isolation but visually large when combined with the rest of the scale. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:15) and [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:40).

2. **The display scale caps too high and too early.** `--step-hero` reaches 76 px and `--step-3` reaches 50.4 px. The 720 px breakpoint changes mobile values, leaving 721–1040 px to use the desktop fluid formula. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:18) and [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:337).

3. **The hero has a 704 px desktop minimum height.** `clamp(36rem, 64vw, 44rem)` hits its 44 rem ceiling at ordinary laptop widths. At 1280 × 720, the hero plus header is 780 px. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:172).

4. **Hero vertical padding reaches 112 px.** This reinforces the large, centred “slide” composition even after the height is clamped. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:195).

5. **The content shell is 78 rem / 1248 px.** Large cards and long horizontal compositions follow directly from that maximum. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:21) and [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:70).

6. **Sections reach 96 px top and bottom.** The first post-hero heading begins around y=992 px at 1440 × 900; the first section is 739 px high. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:20) and [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:201).

7. **The desktop logo is taller than the header.** At 1440 px it renders about 216 × 83 px inside a 76 px header and starts around y=-4 px. The white background hides the overflow, but the lockup visually fills the header. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:97) and [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:109).

8. **Cards stretch across a wide three-column shell.** Equal row height itself is useful here—the copy lengths are similar and the bottom-aligned links scan well—but the 403 px width, 18 px body text, 23.36 px title, 22.4 px padding, and 205 px image compound. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:215).

9. **The page uses only three width breakpoints: 1040, 720, and 390 px.** The 1040 navigation change and 720 typography/grid change are not coordinated into a tablet scale. At 390/391 px there is also a small discontinuity because the exact `max-width: 390px` rule forces a 44 px heading and smaller logo. See [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:315), [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:337), and [`styles.css`](C:/Users/NICOL/Desktop/TUF/styles.css:362).

### 100% versus 75% browser zoom

The in-app browser accepted explicit viewport overrides but did not expose a zoom percentage and ignored `Ctrl+-`/`Ctrl+0` for the page: the CSS viewport, device ratio, media queries, and measured styles did not change. Therefore the saved “75%” attempt is byte-identical to the 100% screenshot and is not valid evidence of a zoom comparison.

The browser behaviour the owner experiences is nevertheless explainable. A 1440 × 900 physical browser area at 75% zoom commonly produces approximately a 1920 × 1200 CSS viewport. On this site, desktop typography and hero height are already capped, so no desktop breakpoint changes: the same 76 px heading maps to roughly 57 physical pixels, the 18 px body maps to 13.5 physical pixels, and the 1248 px shell maps to 936 physical pixels. That physical result closely resembles the recommended 100% scale. This is an inference, not a measured browser-zoom result. The fix should reproduce the balanced physical hierarchy with deliberate tokens, not `zoom`, `transform: scale()`, or a universal 25% reduction.

---

## C. Prioritized findings

Effort: XS ≤ half day, S ≈ half–one day, M ≈ one–three days, L ≈ three–five days or dependent on owner content.

| ID / category | Affected route or component | Finding and evidence | Impact | Severity / confidence | Recommended fix | Effort | Acceptance criteria |
|---|---|---|---|---|---|---:|---|
| VIS-01 Visual scale | Home hero, all sections/cards | At 1440 × 900: body 17.95/29.62, `h1` 76, hero 704, header 76, section padding 96, shell 1248, cards ~403 × 465. Hero + header uses 780 px. | Site feels confrontational and pushes context below the fold. | High / High | Adopt the sizing specification in section D; tune tokens by breakpoint, not global scaling. | M | At 1280 × 720 and 1366 × 768, at least 80–120 px of the following section is visible; desktop home `h1` ≤64 px; body ≤17 px; no text becomes smaller than 16 px. |
| VIS-02 Responsive | 721–1040 px | At 768 px, hero `h1` is 69.86 px while mobile navigation is active. Typography changes only at 720 px. | Tablet feels more oversized than desktop relative to available space. | High / High | Add a tablet type/spacing range or make the base clamps cap lower before 1040 px. | S | At 768 × 1024, hero `h1` is 48–52 px, hero ≤540 px, and CTAs/headline do not crowd the image. |
| VIS-03 Header | Shared header/logo | Desktop logo renders ~216 × 83 in a 76 px header and overflows vertically. | Header feels crowded; fallback/missing image can visibly break the lockup. | Medium / High | Use a cropped/vector logo asset and constrain displayed height; target 148–168 px width with ≤60 px height. | S | Logo is fully contained with ≥6 px vertical breathing room at every viewport and remains crisp at 200% enlargement. |
| FUNC-01 Contact | `/contact/`, `prepareEmailDraft` | Production `contactEmail` is empty. The generated `mailto:` has no recipient and the site publishes no verified address. | A visitor cannot reliably contact TUF. | High / High | Configure an approved address or approved server form. Keep the draft-only disclosure until a server flow exists. Add a visible/copyable address and “Copy message” fallback. | S + owner | A valid local/staging test creates an addressed draft; a visitor without a mail handler can copy the recipient, subject, and message; no test sends a real enquiry. |
| FORM-02 Forms/UX | Contact fields | Project and Academy programme fields are always visible, even for General, Volunteering, or Partnership. There is no `maxlength`, draft-length warning, or copy fallback. | Extra cognitive load; very long `mailto:` URLs may fail in some clients; typed content may be stranded. | Medium / High | Reveal project only for Programme/Partnership where relevant; reveal Academy programme only when TUF Tech Academy is selected; set practical length guidance and provide copy fallback. | S–M | Field visibility follows enquiry type, state is preserved when toggled, errors are announced, and a long-message boundary is tested across supported browsers/mail clients. |
| CONTENT-01 Content | Home, project cards, programme pages | Repeated “confirmed” wording is internal-facing; “A confirmed project…” carries little visitor value. Thin pages mostly say information is unavailable. | Weakens credibility and comprehension. | High / High | Use visitor-centred replacement copy below; obtain missing programme/organisation facts before expanding claims. | M–L + owner | No public copy uses “confirmed” merely as planning status; each project page answers purpose, audience, available next step, and who to contact without unsupported claims. |
| NAV-01 IA / TNFA | `/projects/tnfa/`, `tnfa.vercel.app` | Production TUF omits the external link; TNFA has no reciprocal TUF link. Repository `dist` now configures the TNFA URL but is not deployed. Production/Home wording says Leadership Simulation while live TNFA and the new repository detail page focus on Summit ’27. | Visitors cannot move between related brands and may receive inconsistent programme information. | High / High for links; Medium for content meaning | Verify the canonical TNFA URL, deploy it deliberately, add a reciprocal TUF link on TNFA, and reconcile every TUF/TNFA programme reference with the owner. | S + cross-repo | Both sites link to each other over HTTPS, label the relationship consistently, and pass link checks; Home/detail/external programme names agree. |
| NAV-02 User journey | Partnership/volunteering | Partner page is a thin CTA; volunteering exists only as a contact-select option and has no discoverable explanation. | Visitors cannot evaluate fit before contacting TUF. | Medium / High | Add owner-approved participation information. Introduce “Get involved” navigation only when volunteer/partner content exists; do not create an empty route. | M–L + owner | Header/footer expose volunteering or partnership only when the destination explains who it is for, expectations, process, and next step. |
| A11Y-01 Focus contrast | Dark hero/partner areas | Focus outline `#0759b7` against `#171717` is 2.67:1; WCAG 2.2 focus appearance requires 3:1 against adjacent colors. | Keyboard focus can be hard to locate. | Medium / High | Use a light focus ring on dark contexts (for example white/cream plus a dark offset layer) while retaining the blue ring on light backgrounds. | XS | Every focus indicator is ≥3:1 against adjacent colors, visible without hover, and verified across hero, dark partner section, buttons, and links. |
| A11Y-02 ARIA/current state | All project child pages | `/projects/` is marked `aria-current="page"` on child URLs such as `/projects/tech-academy/women/`. Breadcrumb current page is correct. | Screen readers receive inaccurate current-page information. | Medium / High | Use exact-route `aria-current="page"`; if visually marking the section parent, use a separate class or carefully chosen `aria-current="location"`. | XS | Exactly one navigation link represents the actual current page; parent visual state does not announce a false current page. |
| A11Y-03 Menu state | Mobile menu | Escape closes the outer mobile `<details>` and returns focus, but an opened nested Projects `<details>` remains open internally and reappears open next time. | Minor state surprise, especially for keyboard users. | Low / High | Close nested details when the outer menu closes; update the visible/accessible toggle label to “Close navigation” while open. | XS | Escape and outside click close both levels; reopening starts in a predictable state; focus returns to the toggle. |
| PERF-01 Images | Shared logo, hero, project imagery | Images have dimensions and correct lazy/eager intent, but no `srcset`/`sizes`; mobile downloads 1600 px hero and 990 px logo. Published image assets are JPEG only. | Avoidable bytes on slow/mobile connections; logo may look soft. | Medium / High | Generate width variants and AVIF/WebP with JPEG fallback; keep the actual hero eager/high priority and offscreen images lazy; use SVG or optimized transparent raster for the logo. | M | At 390 px, selected hero source is near display need (not 1600 px); LCP image remains high priority; offscreen images are deferred; visual crop is approved at all viewports. |
| PERF-02 Metrics | Production | No field RUM or supported lab Web Vitals capture was available. No LCP/CLS/INP score is asserted. | Performance decisions cannot be validated against the requested targets. | Medium / High | Add repeatable Lighthouse/WebPageTest lab runs and, if privacy-approved, field Web Vitals/RUM. Treat lab interaction proxies as non-field INP. | S | Document mobile throttling, cache state, device, runs/median; target lab LCP ≤2.5 s and CLS ≤0.1; assess field p75 INP ≤200 ms when data exists. |
| SEO-01 Indexing | All routes/build | `/sitemap.xml` returns 404; robots has no Sitemap line; canonical links are absent because `TUF_SITE_URL` is empty. | Search engines receive weaker consolidation/discovery signals. | Medium / High | Set verified `TUF_SITE_URL` during production build; fail production build if it is absent. | XS | Every canonical is absolute and correct, sitemap lists all intended 200 routes, robots points to it, and staging is not accidentally canonicalized/indexed as production. |
| SEO-02 Social/schema | All TUF routes; TNFA | TUF has no OG/Twitter cards or JSON-LD. TNFA points OG/Twitter images to localhost. | Broken/weak link previews and missed organisation context. | Medium / High | Add verified absolute social image metadata and minimal Organization/WebSite schema using only approved facts; fix TNFA metadata in its own repo. | S–M | Social validators fetch a 200 image over HTTPS; no localhost URLs; schema validates and contains no invented legal/contact facts. |
| SEC-01 Headers | Vercel deployment | HSTS exists; CSP, frame protection, nosniff, explicit referrer policy, and permissions policy are absent. The site is static with no authenticated action, so observed impact is limited. | Reduced defense in depth; framing/brand abuse and future feature risk. | Low–Medium / High | Add tested Vercel headers. Move/escape inline config so a restrictive CSP can work. Use `frame-ancestors` rather than relying only on legacy X-Frame-Options. | S | Header tests confirm HSTS, nosniff, referrer policy, permissions policy, and enforced CSP with no console violations or broken menus/images. |
| SEC-02 Build-time injection | Inline config in generated HTML | `JSON.stringify` output is placed directly in an inline `<script>` without escaping `<`/`</script>`. Values are deployer-controlled, not public input, so exploitation requires CI/env compromise or unsafe configuration. | Low-probability build-time injection prerequisite. | Low / Medium | Serialize config with HTML-safe escaping or expose validated values through safe attributes/external JSON; keep HTTPS URL allow-listing. | XS | A build test with `<`, `</script>`, U+2028, and U+2029 in env values cannot break out of the intended data context. |
| REL-01 Missing-image resilience | Shared images/logo | Error JS hides failed images, but `[data-image-container]` is unused and `--warm-deep` is undefined. With JS blocked, broken image alt text can distort the fixed header; with JS, some figures can collapse. | Degraded network states look broken and may remove useful image alternatives. | Medium / High | Use stable aspect-ratio wrappers everywhere, define fallback tokens, avoid hiding meaningful alt text without an equivalent, and test both JS/no-JS failures. | S | Blocking all images preserves header/section geometry, readable branding text, and meaningful alternatives with no horizontal overflow. |
| SEO-03 Redirects | Legacy `.html` routes | Legacy pages return HTTP 200 and use meta refresh instead of HTTP 301/308. | Duplicate/soft-redirect indexing and slower navigation. | Low / High | Configure Vercel permanent redirects; keep fallback HTML only if another host needs it. | XS | Legacy URLs return 308/301 with one hop to canonical routes. |
| MAINT-01 CSS/tests | Shared CSS/checks | `.site-nav`/`.nav-shell`, reveal styles, and image-container styles are unused; `--warm-deep` is undefined. Current check verifies generated links/metadata but not interactions, headers, accessibility, layout, or source/dist parity. | Increases regression risk and obscures the active design system. | Medium / High | Remove dead CSS after coverage; add unit/static checks plus a small browser smoke suite at key breakpoints. | M | CI covers build parity, 11 routes, menus/Escape/focus, form dependencies, header semantics, no horizontal overflow, sitemap/canonical/headers, and key screenshots. |
| MAINT-02 Generated-output drift | `dist/about/index.html` | Audit-start checks passed. After concurrent working-tree changes, the final check fails: the generated About desktop project menu lost “All Projects”/group wrappers even though `tools/site.mjs` still contains them. Vercel deploys `dist` directly. | A partial/manual `dist` edit could ship broken navigation and source no longer explains production output. | High / High (repository-only) | Treat `dist` as generated-only; rebuild from source in CI and fail if `git diff --exit-code dist` is non-empty. Review/preserve the concurrent owner changes before regeneration. | S | A clean build restores identical menus on all pages; `node tools/check.mjs` passes; CI proves source-to-dist parity and no hand-edited generated file is deployed. |

### What is not a confirmed vulnerability

- `Access-Control-Allow-Origin: *` on static public files is not, by itself, an exploitable CORS issue.
- Missing security headers are defense-in-depth gaps, not evidence that the site has been compromised.
- There is no declared package dependency, authentication, database, server API, upload, or donation workflow in this repository; dependency CVEs, CSRF, RLS, authorization bypass, rate limiting, and upload validation are not applicable to the current implementation.
- No secret value was found in the inspected repository. Only empty public configuration names are present in `.env.example`.

---

## D. Proposed sizing specification

This specification preserves TUF’s strong black/orange identity and bold headings while restoring hierarchy at 100% zoom. Values are targets for implementation and visual review, not an instruction to mechanically scale every element.

| Token/component | Current | Mobile ≤479 | Tablet 480–899 | Laptop 900–1439 | Desktop ≥1440 |
|---|---|---:|---:|---:|---:|
| Root | 16 px | 16 | 16 | 16 | 16 |
| Body size | 16.0–18 px fluid | 16 | 16–16.5 | 16.5–17 | 17 max |
| Body line height | 1.65 (26.4–29.7 px) | 1.55–1.6 | 1.55–1.6 | 1.55–1.6 | 1.55–1.6 |
| Home display `h1` | 44 / 69.9 / 76 px | 40–44 | 48–52 | 56–60 | 60–64 max |
| Page `h1` | clamp 44.8–73.6 px | 38–42 | 44–48 | 50–54 | 54–58 |
| `h2` | 33.6–50.4 px | 30–32 | 34–38 | 40–44 | 42–46 max |
| `h3` | 19.2–24 px | 20 | 20–21 | 21–22 | 22 max |
| Lead/hero paragraph | 16.8–24 px | 17 | 18 | 18–20 | 20 max |
| Heading line height | 1.05 | 1.08–1.12 | 1.08–1.1 | 1.05–1.08 | 1.05–1.08 |
| Heading tracking | -0.035 em | -0.02 em | -0.025 em | -0.025 em | -0.025 em |
| Header | 72/76 px | 64–68 | 68 | 72 | 72 |
| Logo | 152–216 px wide; desktop height ~83 | 140–148 wide | 148–156 | 156–168 | 168 max; ≤60 high |
| Content shell | max 1248 px | fluid | fluid | max 1120 | max 1152 |
| Horizontal gutter | 20–64 px fluid | 20 | 28–32 | 32–40 | 40–48 |
| Home hero height | 544 / 576 / 704 px | 480–520 | 500–540 | 560–600 | 600–640 max |
| Hero padding | 80 top, 68 bottom mobile; up to 112 desktop | 56 top / 48 bottom | 56–64 | 72–80 | 80–88 |
| Section padding | 48 / 80 / 96 px | 40–48 | 56–64 | 64–72 | 72–80 max |
| Grid gap | 20 px | 16–20 | 20 | 24 | 24 |
| Project card | 305–403 wide; 401–466 high | full width, auto height | ~320–344 wide | ~344–360 | ~360–368 max |
| Card image | ratio 5:2.55; 155–205 high | retain ~1.9–2:1 | retain | retain; cap by card width | retain; ~180–188 high |
| Card body | 22.4 px padding; 12 px gap | 18–20 / 10–12 | 20 / 12 | 20 / 12 | 20 / 12 |
| Pathway card | min-height 224 px | auto or 176–192 | 192–208 | 192–208 | 192–208 |
| Buttons | 50 px body CTA; nav ~45 rendered | min 48 | min 48 | 46–48 | 46–48 |

Additional composition rules:

- Keep body copy around 55–70 characters per line; the current 37 rem hero text is reasonable once its font drops to 18–20 px.
- Keep equal-height project cards within each row because the three items are peers and the bottom-aligned links scan well. Do not impose global fixed heights; allow the tallest card in each responsive row to set the row.
- At two columns, avoid an isolated half-width third card unless the visual balance is intentional. A full-row feature treatment or left-aligned card is more coherent than a centred orphan.
- Keep the current restrained radii and orange/black palette. The problem is scale and empty space, not a lack of shadows, gradients, or decoration.
- Load only font weights that exist. `font-weight: 850` plus `font-synthesis: none` is unreliable when Manrope is not actually loaded. Prefer a licensed variable Manrope file for headings at supported 700–800 weights, and either system UI or a single subsetted Inter variable file for body copy. Do not add two large font families without measuring the cost.

---

## E. Sitemap and user journeys

### Current public hierarchy

```text
/
├── /about/
├── /projects/
│   ├── /projects/tnfa/
│   ├── /projects/tech-academy/
│   │   ├── /projects/tech-academy/students/
│   │   ├── /projects/tech-academy/women/
│   │   └── /projects/tech-academy/older-adults/
│   └── /projects/smiling-children/
├── /partner/
└── /contact/
```

Legacy 200/meta-refresh files exist at `/projects/tnfa.html`, `/projects/tech-academy.html`, and `/projects/smiling-children.html`. A custom 404 is present and production returned the correct HTTP 404 status for an unknown URL.

### Journey assessment

| Visitor goal | Assessment |
|---|---|
| Understand TUF’s purpose | The home hero and About summary quickly establish an umbrella foundation with three projects. Repeated “confirmed” wording and absent mission/history/legal/people information weaken trust. |
| Explore projects | Strong: cards, Projects landing page, desktop dropdown, mobile nested menu, footer, direct URLs, and breadcrumbs provide multiple routes. |
| Find a Tech Academy pathway | Strong discoverability: all three audiences appear in the menu and academy page. Weak decision support: pathway pages do not explain curriculum, eligibility, format, availability, cost, or outcomes. |
| Understand TNFA under TUF | The hierarchy is stated repeatedly and TNFA says “An initiative of TUF.” The lack of reciprocal links and programme-language mismatch undermine the relationship. |
| Explore partnership | Easy to find, but the page gives no partnership models, selection criteria, process, or value proposition. |
| Explore volunteering | Not discoverable as content; only a contact-form category exists. This is missing content first, navigation second. |
| Contact TUF | The contact page is easy to find and transparent about mail drafts, but the production draft has no recipient and no address/copy fallback. |

### Justified changes

Do not replace the current hierarchy wholesale; it is understandable and proportional to the site.

1. Keep TNFA under `/projects/tnfa/`, then add the verified external TNFA link and reciprocal link. Do not move TNFA to a top-level sibling that implies separation from TUF.
2. Keep the three Tech Academy child routes only if the owner can supply distinct, useful content. Until then, consolidate their current information into clearly linked sections on `/projects/tech-academy/` and preserve old URLs with real redirects. Three near-identical thin pages create unnecessary clicks without helping a decision.
3. Expand `/partner/` into an approved “Get involved” destination only when volunteering information exists. At that point, a justified structure is `/get-involved/` with Partnership and Volunteering sections or child routes. Until then, do not add another empty page.
4. Replace legacy meta refresh files with Vercel 301/308 redirects.

---

## Content and credibility recommendations

### Supported replacement wording

These options use only facts already published in TUF materials. They deliberately avoid statistics, partners, dates, outcomes, or legal claims.

| Current | Recommended |
|---|---|
| “TUF brings together three confirmed initiatives in youth leadership, technology learning, and support for children.” | “TUF brings together initiatives in youth leadership, technology learning and support for children.” |
| “Three initiatives, clearly connected.” | “Three projects, one foundation.” |
| “A confirmed project of The Unlimited Foundation.” | “The Smiling Children Project sits within The Unlimited Foundation. Detailed public programme information is coming soon.” |
| “The technology project of The Unlimited Foundation, organised across three confirmed programme pathways.” | “TUF Tech Academy offers three pathways: Students in Tech, Women in Tech and Older Adults in Tech.” |
| “A confirmed academy pathway for women.” | “The TUF Tech Academy pathway for women.” |
| “Leadership Simulation presented within Youth & Leadership.” | If still accurate after owner review: “TNFA’s Youth & Leadership programme includes Leadership Simulation.” If not current, remove it and link to TNFA’s current programme page. |
| “No learning areas, delivery format, eligibility rules, dates, fees, or participation outcomes are currently published.” | “For current details on learning areas, eligibility, format and dates, contact TUF.” |

### Facts required from the owner

- Official contact address and preferred enquiry process.
- Legal/registration status, operating location, leadership/governance names, history, mission, vision, and safeguarding/privacy information where applicable.
- For each programme: purpose, intended audience, eligibility, delivery format/location, availability, dates, fees if any, application/contact process, and what participants can honestly expect.
- Current TNFA information: whether Leadership Simulation remains an active programme, how it relates to Summit ’27, and the canonical external URL.
- Partnership and volunteering criteria, process, expectations, and response time.
- Approved photography, consent/provenance, and whether existing illustrative images are licensed/generated.

The current illustrative labels are honest and should remain until authentic approved photography is available. Do not present generated or illustrative images as documentary evidence. When real images are introduced, record consent, licence, crop credit, and meaningful alt text.

---

## Performance assessment

### What was measured

Production assets were requested over HTTPS with compression enabled from the audit host. This was an unthrottled synthetic transfer check, not a mobile Lighthouse run and not real-user data.

| Resource | Raw bytes | Compressed transfer observed |
|---|---:|---:|
| Home HTML | 10,926 | 2,516 |
| CSS | 25,494 | 5,911 |
| JavaScript | 4,937 | 1,743 |
| Header logo JPEG | 51,741 | 51,741 |
| Hero JPEG | 155,662 | 155,662 |
| Foundation intro JPEG | 95,924 | 95,924 |
| Three project JPEGs | 61,860–74,660 each | same as raw |
| TNFA logo JPEG | 53,767 | 53,767 |

The likely initial critical payload is roughly 218 KB before protocol overhead (compressed HTML/CSS/JS plus eager logo and hero), which is reasonable. The hero is preloaded and `fetchpriority="high"`; it is the likely LCP candidate and should remain eager. Offscreen content images use `loading="lazy"`. All images have width/height attributes, which reduces intrinsic-size layout shift. No web font is requested, so there is no web-font layout shift—but Manrope/Inter appearance is not guaranteed.

### What was not measured

The browser surface did not expose navigation timing, PerformanceObserver, network throttling, or a supported Lighthouse runner. No production RUM access was supplied. Accordingly:

- No LCP, CLS, INP, Lighthouse score, long-task count, or cache-warm/cold median is claimed.
- Simple menu clicks are not evidence that field INP passes.
- The layout appears stable from explicit image dimensions, but that is not a measured CLS value.

Recommended verification should use mobile and desktop Lighthouse/WebPageTest with documented hardware, throttling, cache state, and at least three runs, followed by privacy-approved field p75 data when traffic permits. Targets remain LCP ≤2.5 s, CLS ≤0.1, and field INP ≤200 ms.

---

## Accessibility assessment

### Confirmed strengths

- Semantic `header`, labelled `nav`, `main`, `footer`, breadcrumb navigation, and a skip link are present.
- Tested pages expose one `h1`; heading order is coherent.
- All generated images have `alt` and intrinsic dimensions; decorative page-hero images use empty alt text.
- Contact controls are wrapped by visible labels; native `required`/email validation focuses the first invalid field. The status message is `role="status" aria-live="polite"`.
- Desktop Projects menu exposes `aria-expanded`/`aria-controls`; click, Escape, outside click, and focus return were reproduced successfully.
- Mobile navigation uses native `<details>/<summary>`; touch target is 46 × 46 px; Escape and outside click close the outer menu and return focus.
- Reduced-motion CSS disables animation/transition durations and forces reveal content visible. The test browser matched reduced motion during viewport measurements.
- Static palette pairs tested: orange-dark/white 6.14:1, orange-dark/orange-soft 5.50:1, muted/white 6.74:1, muted/warm 6.31:1, footer muted/dark 7.62:1, footer links/dark 10.18:1, hero orange/dark 8.45:1.

### Confirmed issues and limitations

- Focus blue/dark is 2.67:1 (A11Y-01).
- Parent Projects link announces a false `aria-current="page"` on child routes (A11Y-02).
- Nested mobile Projects state remains open after the outer menu closes (A11Y-03).
- The exact 200% text-only/browser zoom flow could not be controlled in the in-app browser. Requested narrow layouts at nominal zoom had no horizontal overflow, but full WCAG 1.4.10/1.4.4 certification is not claimed.
- With all images blocked and scripts blocked locally, critical text remained available, but broken image alternatives distorted the fixed header under an extreme narrow effective CSS viewport. Source inspection confirms incomplete fallback wiring.
- No axe-core/Accessibility Insights scan was available. Manual interaction, accessibility-tree inspection, source review, contrast calculations, and responsive measurements do not constitute a declaration of full WCAG 2.2 AA compliance.

---

## Security, privacy, and reliability assessment

### Architecture and applicability

The repository is a static site. It has no authentication, user accounts, server endpoint, database, cookies, analytics, browser storage, upload, donation, or payment flow. The contact form constructs a local `mailto:` URL; the website does not transmit or store the entered data. Consequently, server authorization, RLS/database permissions, CSRF, API abuse controls/rate limits, file-upload validation, and payment security are not applicable to the current implementation.

No secret was found in inspected tracked files. `.env.example` contains only empty names. The deployed public config also has empty TNFA/contact values. Query parameters are mapped through fixed allow-lists before being assigned to select values. The optional external TNFA URL is parsed, restricted to HTTPS, opened with `_blank`, and protected by `noopener noreferrer`.

### Production headers observed

- Present: HTTPS, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, ETag, Vercel CDN caching.
- Missing: CSP, `frame-ancestors`/X-Frame-Options, `X-Content-Type-Options`, explicit `Referrer-Policy`, `Permissions-Policy`.
- `Access-Control-Allow-Origin: *` was present on public static responses. No sensitive credentialed API was found, so this is not treated as a vulnerability.
- HTML and unhashed assets use `Cache-Control: public, max-age=0, must-revalidate`; CDN responses were HIT after cache population. Long immutable caching should only be introduced with fingerprinted filenames.
- Unknown routes return a custom 404 with HTTP 404 and no stack trace.
- No source map was published for the small unminified script.

### Privacy behaviour of the contact form

- The page clearly states that it does not send/store entries and that opening a draft does not send the enquiry.
- Required-field validation was reproduced without transmitting data: Name, Email, and Message were invalid; submit focused Name and announced “Complete the required fields before opening an email draft.”
- A valid production draft was deliberately not opened. Behaviour is confirmed from source: all non-empty fields are URL-encoded into subject/body and assigned to `window.location.href` as `mailto:`.
- If no email handler exists, the source provides no fallback, verified address, copy action, or recovery instruction.
- Fields have no `maxlength`; practical URI limits vary by OS, browser, and email client, so a universal safe maximum was not claimed.

---

## Engineering baseline and maintainability

### Actual implementation

- **Framework/rendering:** no front-end framework. A dependency-free Node ESM generator renders 11 static multi-page HTML routes plus 404 and legacy files. Rendering happens at build time; production does not hydrate.
- **Styling:** one handwritten CSS file with custom properties, fluid `clamp()` type/spacing, CSS Grid/Flexbox, and media queries at 1040, 720, and 390 px.
- **Client code:** one 4.9 KB vanilla JavaScript file for menu enhancement, query prefill, optional links, mailto drafts, current year, image errors, and header scroll shadow.
- **Dependencies:** `package.json` declares no dependencies. A package advisory scan is therefore not applicable to this repository.
- **Integrations:** optional build-time `TUF_SITE_URL`, `TUF_TNFA_URL`, and `TUF_CONTACT_EMAIL`. No analytics, CMS, database, or API.
- **Deployment:** Vercel serves `dist/`; both [`vercel.json`](C:/Users/NICOL/Desktop/TUF/vercel.json:1) and [`.openai/hosting.json`](C:/Users/NICOL/Desktop/TUF/.openai/hosting.json:1) point to the static directory.
- **Shared structure:** one shared header/footer/menu, reusable project-card HTML, common page hero, breadcrumbs on project detail routes, and route data in [`tools/site.mjs`](C:/Users/NICOL/Desktop/TUF/tools/site.mjs:4).

### Production/repository parity

Two snapshots matter:

1. **Audit-start baseline:** production Home/CSS/JS exactly matched the generated `dist` files then present and the checked-in design at `93089de`.
2. **Final verification:** concurrent uncommitted repository changes produced a new TNFA detail page and rebuilt `dist` with `TUF_TNFA_URL=https://tnfa.vercel.app`. Production still serves the earlier output. These changes were not made or reverted by the audit.

| Artifact at final verification | Live bytes | Current working-tree bytes | SHA-256 equal |
|---|---:|---:|---|
| `/` vs `dist/index.html` | 10,926 | 10,949 | **No** (config differs) |
| `/projects/tnfa/` vs `dist/projects/tnfa/index.html` | 7,546 | 9,811 | **No** (content/config differs) |
| `/styles.css` vs `dist/styles.css` | 25,494 | 25,494 | Yes |
| `/script.js` vs `dist/script.js` | 4,937 | 4,937 | Yes |

Production config remains `{tnfaWebsiteUrl:"", contactEmail:""}`. Current working-tree `dist` contains `{tnfaWebsiteUrl:"https://tnfa.vercel.app", contactEmail:""}`. The source route now describes Summit ’27, a Bintumani venue, audience segments, and pre-launch status, while production retains the earlier Leadership Simulation page. Those repository-only factual claims need owner approval and a complete copy review before deliberate deployment. This comparison is still not an immutable deployment-to-git attestation for every asset.

### Existing tests and gaps

At audit start, `node tools/check.mjs` passed: 15 HTML files and 11 routes were checked for internal navigation, local targets, titles/descriptions, duplicate IDs, image alt/dimensions, 404, and content assertions. After concurrent repository edits, the final run fails on `dist/about/index.html` (“TNFA is not first in the desktop Projects menu”); inspection shows that generated file lost the “All Projects” link and `.menu-group` wrappers although source still has them. `npm run check` also could not execute on the audit host because its npm installation path was broken; calling Node directly worked. The npm launcher problem is host-specific, while the final `dist` failure is a real current working-tree regression.

The check does not cover CSS/layout, source-to-dist staleness, browser behaviour, keyboard focus, form logic, accessibility, security headers, HTTP redirect status, or performance. `dist/` is tracked, so parity tests are important.

---

## F. Phased remediation plan

### Phase 1 — broken functionality and security foundations

1. Obtain and configure the approved contact address; add visible/copyable fallback. Keep valid submission tests local/staging and do not send real enquiries.
2. Configure verified production origin and TNFA URL; emit canonical/sitemap and the external TNFA action. Add reciprocal TUF link in the TNFA repository.
3. Reconcile TNFA programme naming/content across both sites.
4. Add tested security headers and safe inline-config serialization.
5. Replace legacy meta refresh pages with real Vercel redirects.

### Phase 2 — visual scale, readability, and navigation

1. Introduce the revised type, spacing, shell, hero, and card tokens.
2. Fix the 721–1040 tablet scale and simplify the 390 px micro-breakpoint.
3. Constrain/crop the header logo; reduce hero height/padding so the next section appears on laptop screens.
4. Reduce the shell/card width and section padding while preserving card equal-height alignment by row.
5. Correct `aria-current`, nested mobile-menu reset, and navigation labels.

### Phase 3 — performance and accessibility

1. Add responsive AVIF/WebP/JPEG image sources and a crisp brand asset; retain priority for the actual LCP image.
2. Make focus indicators pass 3:1 on every background.
3. Implement contact-field dependencies, error association, message guidance, and copy fallback.
4. Repair missing-image wrappers/fallbacks and test no-JS, missing-image, long-title, and font-fallback states.
5. Establish reproducible Lighthouse/WebPageTest plus automated accessibility smoke tests; gather field p75 metrics only with approved telemetry.

### Phase 4 — content and maintainability

1. Replace internal-status copy with the supported visitor-facing wording.
2. Add owner-approved organisational, programme, partnership, volunteering, and contact facts.
3. Consolidate thin academy child pages until distinct content is available, preserving redirects.
4. Add social metadata and minimal structured data using verified facts.
5. Remove dead CSS, define missing tokens, and add build/output/browser regression coverage.

---

## G. Verification matrix

| Area/test | Status | Result/evidence | Limitation or follow-up |
|---|---|---|---|
| Repository architecture/config | Completed | Static Node generator, vanilla CSS/JS, no dependencies, Vercel `dist` identified. | TNFA repository not supplied. |
| Public route inventory | Completed | 11 primary routes returned HTTP 200; unknown route returned 404. | Does not discover unlinked private/staging routes. |
| Internal build check | Completed twice | Audit-start check passed 15 HTML files/11 routes. Final current-working-tree check fails on the About desktop Projects menu after concurrent `dist` changes. | npm launcher broken on host; direct Node used. Do not overwrite the owner’s concurrent changes without review. |
| Live vs repository parity | Completed twice | Audit-start Home/CSS/JS matched. Final CSS/JS still match, but Home and TNFA HTML differ after concurrent uncommitted repository changes. | Repository-only TNFA content/config was not deployed or included in live screenshots; preserve/review owner changes. |
| Responsive layouts | Completed | Measured/captured 360×800, 390×844, 768×1024, 1280×720, 1366×768, 1440×900, 1920×1080. No horizontal overflow at these nominal viewport tests. | Exact OS/browser matrix limited to in-app Chromium surface. |
| 100% vs 75% browser zoom | Untested directly | Zoom keyboard commands caused no CSS viewport/style change; invalid “75%” screenshot excluded. | Use Chrome/Edge DevTools on owner’s machine and record CSS viewport at both zoom levels. |
| 200% resize/reflow | Partial | CSS/narrow viewport and `min-width` reviewed; requested nominal mobile widths did not overflow. | Exact controllable 200% page/text zoom unavailable; WCAG conformance not claimed. |
| Desktop dropdown | Completed | Click opens; `aria-expanded` updates; Escape closes/returns focus; outside click closes. | Hover path source-reviewed, not separately instrumented. |
| Mobile navigation | Completed | Native details opens; Escape/outside click closes/returns focus. | Nested Projects remains open internally after outer close (A11Y-03). |
| Back/forward/reload/direct URL | Completed | Home → About, Back, Forward, Reload retained correct routes; direct academy/contact URLs worked. | One browser engine. |
| Contact query prefill | Completed | Programme, TUF Tech Academy, Women in Tech populated from allow-listed query values. | Unknown query values were source-reviewed, not fuzzed at volume. |
| Contact validation | Completed without transmission | Empty Name/Email/Message detected; Name focused; live status updated. | Valid `mailto:` activation and OS email handler deliberately not invoked. |
| Contact no-handler/long message | Untested externally | No source fallback or maxlength exists. | Requires local/staging OS/mail-client matrix; do not send. |
| JavaScript blocked | Completed locally | Critical navigation/text/actions remained in HTML; no hydration dependency. | Optional configured TNFA link/current year/image-error enhancement absent without JS. |
| Images blocked | Partial locally | Critical text remained; visual fallback/header degraded. | Extreme effective CSS viewport in the local browser makes screenshot stress evidence, not a requested 390 px baseline. |
| Keyboard/AX semantics | Completed manually | Landmarks, names, labels, heading tree, menus, focus return inspected. | No axe/Accessibility Insights tool available; no full WCAG declaration. |
| Color contrast | Completed for static palette | Body, muted, CTA, footer pairs pass; dark-context focus ring 2.67:1 fails target. | Image-background text needs final per-crop visual sampling after imagery changes. |
| Reduced motion | Completed by source/runtime | Browser reported reduced motion; CSS disables motion and forces reveal content visible. | Non-reduced animation observed visually but not profiled frame-by-frame. |
| Performance payload | Completed | Raw/compressed critical asset sizes and image dimensions inventoried. | No throttled lab Web Vitals or field RUM; no scores claimed. |
| LCP priority | Completed by source | Hero preloaded, eager, `fetchpriority=high`; offscreen images lazy. | Actual LCP element/timing not captured. |
| Security/static data flow | Completed | No auth/API/db/storage/upload; allow-listed query values; HTTPS-only external URL; no current secret found. | Git history secret scanning and CI/Vercel account settings not accessed. |
| Production headers | Completed | HSTS present; CSP/frame/nosniff/referrer/permissions headers absent. | Header absence is not proof of exploitation. |
| TNFA relationship | Partial | Public home inspected; no reciprocal TUF URL; TUF external slot absent; public programme wording differs. | TNFA repository, analytics, and owner intent not supplied. |
| SEO | Completed | Titles/descriptions exist; robots 200; sitemap 404; no canonical/OG/Twitter/JSON-LD. | Search Console and index coverage not accessed. |
| Analytics/field metrics | Not available | No analytics/RUM integration in repository. | Requires approved account/data access and privacy decision. |
| Authentication/database/CSRF/uploads/payments | Not applicable | No such implementation exists in this repository. | Re-audit if a server form, account, donation, or CMS is introduced. |

---

## Concrete implementation backlog

Each item is intentionally small enough for an isolated review.

1. **Deployment configuration PR/change:** set and validate `TUF_SITE_URL`, `TUF_CONTACT_EMAIL`, and `TUF_TNFA_URL`; add a production-build guard and environment documentation.
2. **Contact reliability PR:** visible address, copy-recipient/copy-message fallback, dependent project/programme fields, length guidance, and local tests.
3. **Scale-token PR:** revise body/type/spacing/shell variables only; capture baseline visual diffs at all seven requested viewports.
4. **Hero/header PR:** reduce hero height/padding, constrain/crop logo, verify next-section visibility on 1280×720 and 1366×768.
5. **Cards/grid PR:** narrow shell/cards, preserve per-row equal height, resolve two-column orphan, test long titles/copy.
6. **Navigation/accessibility PR:** correct `aria-current`, close nested mobile details, update toggle label, implement dark-context focus style, add keyboard tests.
7. **Image-delivery PR:** responsive sources, modern formats, stable fallback wrappers, LCP priority verification, missing-image tests.
8. **SEO/redirect PR:** canonical/sitemap/robots, OG/Twitter metadata, verified social image, minimal schema, HTTP permanent redirects.
9. **Security-header PR:** CSP-compatible config delivery plus frame, nosniff, referrer, and permissions policies; production header assertions.
10. **Content PR:** remove internal “confirmed” phrasing and apply only owner-approved organisation/programme/participation facts; reconcile TNFA across repositories.
11. **Thin-page IA PR (conditional):** consolidate academy pathways until each has distinct useful content; keep permanent redirects and update navigation.
12. **Maintenance/test PR:** remove dead CSS, define/remove `--warm-deep`, add source/dist parity, route, form, menu, overflow, and accessibility smoke tests.

The correct first implementation move is not a redesign. It is to fix the broken contact/TNFA configuration and then land the scale-token/hero changes behind screenshot review. That sequence addresses trust and usability while keeping TUF’s identity intact.
