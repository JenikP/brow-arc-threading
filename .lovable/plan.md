# Mobile Locations Page Fix

Two targeted mobile-only refinements to the Locations page. Desktop/tablet layouts are untouched.

## 1. LocationQuickNav — fit all 5 salons on mobile

Currently each pill is full-size with the salon's long name ("HomeCo. Brandon Park", "Westfield Southland"), so on a 390px viewport only ~1.5 pills are visible and the rest sit off-screen behind the fade.

Changes in `src/components/locations/LocationQuickNav.tsx`:
- Switch the mobile container from horizontal scroll to a **2-column grid** (`grid grid-cols-2 sm:flex sm:flex-wrap`) so all 5 chips are visible at once (with the 5th spanning both columns or sitting alone on the last row).
- Add a short-label field on the chip: use a shortened display name on mobile (e.g. "Brandon Park", "Southland", "Pakenham", "Stud Park", "Warringal") via a small `shortName` lookup map inside the component — no data-model change required.
- Tighten chip styling on mobile: `text-xs`, `px-3 py-2`, `justify-center`, `truncate`, smaller check icon. Desktop pill styling unchanged.
- Remove the right-edge fade gradient and `snap-x` behavior on mobile (no longer needed since nothing scrolls).

Result: all 5 salons readable in a clean 2-column grid on phones; desktop wrap behavior identical to today.

## 2. StylizedLocationMap — hide on mobile

The decorative SVG map is cropped on mobile: the top pin (Warringal) and the active tooltip card both extend outside the visible area, and the bottom drawer adds an extra interaction layer that duplicates what the cards below already do.

Changes in `src/pages/Locations.tsx`:
- Wrap the `<StylizedLocationMap …/>` block in a `hidden sm:block` container so the map only renders from the `sm` breakpoint up (≥640px).
- Replace it on mobile with nothing — the `LocationQuickNav` (now showing all 5) plus the location cards beneath provide the full navigation affordance.

No changes to `StylizedLocationMap.tsx` itself, so desktop/tablet behavior (hover tooltips, smart anchor positions, click-to-select) is preserved exactly.

## Files touched

- `src/components/locations/LocationQuickNav.tsx` — grid layout + short labels on mobile
- `src/pages/Locations.tsx` — wrap map in `hidden sm:block`

No data, store, type, or business-logic changes.
