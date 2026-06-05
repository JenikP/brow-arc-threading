# Responsive Overhaul — Home, Locations, Navbar, Data

## 1. Homepage (`HomeLocations.tsx`, `Index.tsx`)

- Remove `<StylizedLocationMap />` entirely from `HomeLocations` (desktop + mobile — same component on Home).
- Update homepage section heading copy from "Tap a pin on the map…" to a card-only intro ("Call any salon directly, or tap *Directions*.").
- Extend each card to display, inline (before the CTA row):
  - `mallDirections` line with the `Navigation` icon (bronze italic, matching `LocationCard` style).
  - Today's opening hours (computed via the existing `getTodayHoursKey` helper) with the `Clock` icon.
  - Live "Open Now / Closed" pill using `useOpenStatus` (emerald/rose) — same visual as Locations page.
- Keep grid `sm:grid-cols-2 lg:grid-cols-3`, but enforce uniform card heights with `flex flex-col` + `flex-1` content area + `mt-auto` CTA row (already partially in place).

## 2. Locations page — desktop (`Locations.tsx`, `StylizedLocationMap.tsx`, `LocationList.tsx`, `LocationCard.tsx`)

- Scale map down on laptop: cap with `max-w-4xl mx-auto`, change aspect to `lg:aspect-[16/9]` so it does not dominate the fold.
- Pin interaction model:
  - Hover ⇒ shows tooltip (already behaves this way).
  - Click ⇒ calls `onPinSelect(id)`, which sets selection + scrolls to the corresponding location card. Remove the `<a href={directionsUrl}>` fallback branch — pins are always buttons, never redirect. The tooltip's "Directions" link remains the only redirect path.
- Warringal (id 5) tooltip: change `TOOLTIP_POS[5]` from "below center" to anchor on the **right** side of the pin (`left-full ml-3 top-1/2 -translate-y-1/2`). Pakenham keeps left-anchor, Southland keeps right-anchor.
- Uniform card grid in `LocationCard`:
  - Wrap whole card in `flex flex-col h-full`.
  - Give the header block a `min-h-[7rem]` so titles align across rows.
  - Reserve a `min-h-[2.5rem]` slot for `mallDirections` (renders empty spacer when missing) so the "Open Now" badges align horizontally.
  - Push CTA row with `mt-auto`.
- Append the homepage **Contact** form section and **Footer** to the bottom of `Locations.tsx` (lazy-loaded with the existing `Suspense`).

## 3. Tablet (768–1024 px)

- `Navbar.tsx`:
  - Logo: bump `md:w-[280px] lg:w-[300px]` for better legibility.
  - Nav links: `md:text-base` (currently `md:text-sm`).
  - "Call to Book": shrink to `md:px-3 md:py-1.5 md:text-sm` with tighter gap, so it sits as a balanced inline pill instead of dominating the row.
- Map pin stacking: every pin gets `zIndex: 20` by default, the **active/hovered** pin's wrapper gets `zIndex: 50` and its tooltip `z-[60]`. Permanent label badges drop to `z-[5]`. Backdrop pins can no longer bleed over the open card.

## 4. Mobile (<768 px)

- Larger, crisper logo in `Navbar.tsx` (`w-[210px] xs:w-[230px]`, add `drop-shadow-sm`).
- Home: map already removed in step 1 — no extra work.
- `LocationQuickNav` already uses `overflow-x-auto` + `snap-x` on mobile. Verify `flex-nowrap` is applied (`flex-row flex-nowrap whitespace-nowrap`) and bump tap targets to `py-3`.
- Locations map on mobile: convert the existing in-map overlay to a **fixed bottom drawer** when `< sm`:
  - Render via portal (`createPortal` to `document.body`) so it escapes the map container.
  - Position `fixed inset-x-0 bottom-0 z-[70]`, rounded-top, safe-area padding, slide-up animation, swipe-handle pill, close button.
  - Backdrop tap dismisses.
  - Desktop tooltip behavior unchanged.
- Pins: bump hit area to `p-4 -m-4` on `<sm` and ensure label badges don't push out of viewport (truncate / hide non-active labels on mobile when a card is open).

## 5. Data & images

Update `src/data/locationData.ts` hours objects to:

- **Brandon Park** — `Mon – Wed 9:00 am – 5:30 pm`, `Thursday 9:00 am – 7:00 pm`, `Friday 9:00 am – 7:00 pm`, `Saturday 9:00 am – 5:00 pm`, `Sunday/Public Holidays 10:00 am – 5:00 pm`.
- **Southland** — `Mon – Wed 9:00 am – 5:30 pm`, `Thu – Fri 9:00 am – 8:30 pm`, `Sat 9:00 am – 5:00 pm`, `Sun/Public Holidays 10:00 am – 5:00 pm`.
- **Pakenham** — `Mon – Wed 9:00 am – 5:30 pm`, `Thu – Fri 9:00 am – 6:30 pm`, `Sat 9:00 am – 5:00 pm` (treating "5:5pm" as a typo for 5:00 pm), `Sun/Public Holidays 10:00 am – 5:00 pm`.
- **Stud Park** — `Mon – Wed 9:00 am – 5:30 pm`, `Thu – Fri 9:00 am – 6:30 pm`, `Sat 9:00 am – 5:00 pm`, `Sun/Public Holidays 10:00 am – 5:00 pm`.
- **Warringal** — `Monday 9:00 am – 5:30 pm`, `Tuesday 10:00 am – 5:00 pm`, `Wed – Fri 9:00 am – 5:30 pm`, `Saturday 9:00 am – 5:00 pm`, `Sunday Closed`.

`getTodayHoursKey` already matches per-day keys; the `businessHours` parser handles `Closed` (returns isOpen=false). Verify both still work after the Warringal split.

Service images (`src/data/services/`):

- `facialServices.ts` → "Side Burns" already uses `sideburnImg`. Confirm the asset pointer resolves on the published bundle.
- `bodyServices.ts` → wire `full-back.jpg.asset.json` to **Full Back** entry's `image` field (currently missing). Reuse the same asset for **Half Back** unless a separate image is supplied.

> Open question (low risk): if a distinct Half Back photo exists, swap it in later; for now both back entries share `full-back.jpg`.

## Technical notes

- Files edited: `src/components/HomeLocations.tsx`, `src/components/Navbar.tsx`, `src/components/locations/StylizedLocationMap.tsx`, `src/components/locations/LocationCard.tsx`, `src/components/locations/LocationQuickNav.tsx`, `src/pages/Locations.tsx`, `src/data/locationData.ts`, `src/data/services/bodyServices.ts`.
- Drawer uses `react-dom/createPortal` (already available via React 18).
- No changes to `useLocationStore`, `businessHours.ts`, or `useOpenStatus.ts` — global sync logic preserved.
- No new dependencies.
