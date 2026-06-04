# Plan: Mall Directions, Live Hours Status, and Homepage FAQ

## 1. `mallDirections` field on every location

**File:** `src/types/location.ts`

- Add optional `mallDirections?: string` to `LocationData`.

**File:** `src/data/locationData.ts`

- Add a `mallDirections` string to all 5 salons, e.g.:
  - Brandon Park — "In front of the Reject Shop, Near the Coles"
  - Southland — "Level 1, Near JB Hi-Fi"
  - Pakenham Marketplace — "Near the Big W"
  - Stud Park — "Kiosk, Behind Boost Juice, and in front of Coles"
  - Warringal — "Near Tk Maxx, behind the Escalators"
  - (Exact copy will be drafted from existing addresses; user can tweak.)

**Display surfaces:**

- `src/components/locations/StylizedLocationMap.tsx` — render under address inside both the desktop tooltip and the mobile overlay card, styled as a subtle bronze kicker line (e.g. `text-[11px] text-bronze italic` with a small `MapPin` icon).
- `src/components/locations/LocationCard.tsx` — render under the address with the same treatment.
- `src/components/Footer.tsx` — no change (footer doesn't list per-salon detail). If user wants it in the footer, we'd need to add a compact "Our Salons" column; flagged as a question below.

## 2. Live Business Hours Status (Open Now / Closed)

**New util:** `src/utils/businessHours.ts`

- Pure function `getOpenStatus(hours: LocationHours, now = new Date()): { isOpen: boolean; label: string; nextChange?: string }`.
- Convert `now` to Australia/Melbourne via `Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', ... })` so it works regardless of viewer locale (handles AEST/AEDT correctly).
- Parse each entry of `LocationHours`. Keys are ranges ("Monday – Wednesday", "Thursday – Friday", "Saturday", "Sunday/Public Holidays"); values like `"9:00 am – 5:30 pm"`. Build a small day→{open,close} map.
- Return `{ isOpen: true, label: "Open Now · until 5:30 pm" }` or `{ isOpen: false, label: "Closed · opens 9:00 am" }`.

**New hook:** `src/hooks/useOpenStatus.ts`

- `useOpenStatus(hours)` runs `getOpenStatus` on mount and re-evaluates every 60s via `setInterval`.

**Display surfaces (badge component inline):**

- `LocationCard.tsx` — replace the current static green dot + "Open 7 Days — Walk-ins Welcome" with a dynamic badge:
  - Open: `bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200` with the soft pulse dot.
  - Closed: `bg-rose-50 text-rose-700 ring-1 ring-rose-200` with a solid red dot.
  - Keep "Walk-ins Welcome" copy when open.
- `StylizedLocationMap.tsx` — add the same compact badge inside the desktop tooltip + mobile overlay card.
- `HomeLocations.tsx` — if it lists locations, add the badge there too (will confirm during exploration).

## 3. Homepage FAQ Accordion

**New component:** `src/components/FAQ.tsx`

- Use existing shadcn `Accordion` from `@/components/ui/accordion` (already in components.json).
- Editorial header matching site style: kicker "— Common Questions —", serif h2 "Things Our Guests *Often Ask*".
- 6 items focused on the requested themes:
  1. Is threading safe for sensitive skin?
  2. How is threading better than waxing?
  3. Do I need an appointment or can I walk in?
  4. How long does an eyebrow threading session take?
  5. Will it hurt? What should first-timers expect?
  6. How often should I come back?
- Each `AccordionItem` styled with `bg-[#faf8f5] border border-stone-200/80 rounded-2xl shadow-soft` (matches existing card aesthetic), bronze chevron, Cormorant question text, Karla body answers.
- Wrap in `<section id="faq" aria-labelledby="faq-heading">` for anchor linking + SEO.

**Wiring:** `src/pages/Index.tsx`

- Lazy-import `FAQ` and place it between `<HomeLocations />` and `<Contact />`.

**SEO bonus:** add `FAQPage` JSON-LD inside `FAQ.tsx` (script tag with the same Q/A content) so Google can surface rich results — consistent with the project's existing JSON-LD work.

**Footer nav:** add a "FAQ" link to `src/components/Footer.tsx` "Explore" column pointing to `#faq`.

## Files touched

```
src/types/location.ts                          (edit)
src/data/locationData.ts                       (edit)
src/components/locations/StylizedLocationMap.tsx (edit)
src/components/locations/LocationCard.tsx      (edit)
src/components/HomeLocations.tsx               (edit if it shows status)
src/components/Footer.tsx                      (edit: FAQ link)
src/utils/businessHours.ts                     (new)
src/hooks/useOpenStatus.ts                     (new)
src/components/FAQ.tsx                         (new)
src/pages/Index.tsx                            (edit: mount FAQ)
```

## Open question

Your message #2 says "display in the map tooltip cards **and the footer lists**" — the current footer doesn't enumerate the 5 salons. Should I (a) add a compact "Our Salons" column to the footer that lists name + mallDirections, or (b) treat "footer lists" as the location cards on the Locations page (which already act as the detailed list)? I'll default to **(b)** unless you say otherwise.