# Individual Location Landing Pages

Create dedicated SEO-friendly pages for each salon at routes like `/locations/brandon-park`, while keeping the existing `/locations` overview page as the directory.

## Routes (slug per location)
- `/locations/brandon-park` → HomeCo. Brandon Park
- `/locations/southland` → Westfield Southland
- `/locations/pakenham` → Pakenham Marketplace
- `/locations/stud-park` → Stud Park Shopping Centre
- `/locations/warringal` → Warringal Shopping Centre

## Data changes (`src/data/locationData.ts`)
Add to each location entry:
- `slug: string` — URL slug (above)
- `tagline: string` — one-line localized hook (e.g. "Expert brow threading in Wheelers Hill")
- `neighborhood: string` — suburb/area for localized copy ("Wheelers Hill", "Cheltenham", etc.)
- `landmarks: string[]` — 2-3 nearby landmarks / parking hints
- `gallery: string[]` — optional, defaults to `[image]` for now; can be extended later with real salon photos
- `popularServices: string[]` — 3-4 service names to feature on the page

Update `src/types/location.ts` accordingly (new fields optional where appropriate, `slug` required).

## New page: `src/pages/LocationDetail.tsx`
Sections, top to bottom:
1. **Navbar** (existing)
2. **Hero** — large salon photo, salon name as H1, tagline, neighborhood line, prominent "Call Now" `tel:` button + "Get Directions" button. Open/closed status badge (reuse `useOpenStatus`).
3. **Quick info strip** — address, phone, today's hours, mall directions (`mallDirections` + `landmarks`).
4. **Hours table** — full weekly hours from `hours` map.
5. **Popular services at this salon** — small grid of `popularServices` linking back to `/#services`.
6. **Finding us** — `mallDirections`, landmarks, parking hint, "Get Directions" CTA (uses `directionsUrl`).
7. **Sticky mobile call bar** — bottom-fixed "Call {salon}" button on mobile only (page-scoped, not global — respects the memory note that the global MobileCallBar must not return).
8. **Other locations** — compact list of the other 4 salons with links to their detail pages.
9. **Footer** (existing)

All copy localized using `neighborhood` and salon name (e.g. "Brow threading in Wheelers Hill", "Visit us at HomeCo. Brandon Park"). Single H1 per page. Document `<title>` and meta description set per-location via a small effect (in line with current site patterns — no new SEO library).

## Routing (`src/App.tsx`)
Add:
```tsx
<Route path="/locations/:slug" element={<LocationDetail />} />
```
Keep `/locations` as-is.

## Linking updates
- `src/components/locations/LocationCard.tsx` — add a "View salon page →" link to `/locations/{slug}`.
- `src/components/HomeLocations.tsx` — each homepage location card links to its detail page.
- `src/components/locations/LocationQuickNav.tsx` — unchanged (it's an in-page anchor nav on `/locations`).

## Out of scope
- Real new photography (uses existing `image` as gallery placeholder; can be swapped later).
- Staff bios (no data exists yet — would need a separate pass).
- SEO/AI-SEO work and security work (explicitly excluded per user).
- Online booking (phone-only per project memory).

## Files touched
- `src/types/location.ts` (edit)
- `src/data/locationData.ts` (edit — add slug/tagline/neighborhood/landmarks/popularServices)
- `src/pages/LocationDetail.tsx` (new)
- `src/App.tsx` (add route)
- `src/components/locations/LocationCard.tsx` (add link)
- `src/components/HomeLocations.tsx` (add link)
