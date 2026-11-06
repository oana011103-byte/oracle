# Responsive implementation and evidence

Source: public/responsive.css, loaded after the visual theme. Existing imagery, English welcome title, local language preference, full-bleed80%-opacity background and compact borderless tools remain.

## Layout
- Phones: safe-area-aware page padding, fluid question text, bounded fan geometry. On phones below740px tall the daily-sign screen is a compact two-column spread.
- Reading results: two card columns below600px for readable card names; long text flows vertically without clipping.
- Tablets: larger portrait welcome composition and compact landscape content; short landscape card slots and fan sit side by side.
- Desktop: max-width content, intrinsic page heights, bounded card/ritual staging. Large monitors scale welcome type, emblem and corner ornaments proportionately.
- Body is never hidden with overflow-x tricks: card geometry is sized to fit its actual container.

## Interaction
44px minimum targets for controls and history stars. Very narrow screens wrap the seven history stars into two rows. Touch does not depend on hover. Screen navigation moves keyboard focus to its heading, except question entry which focuses the textarea. Safe areas include notch and home-indicator insets.

## Assets
Clean paper image is served as34KB WebP rather than1.6MB PNG. Original PNG retained. This is codec compression, with no new image generation or design change.

## Verification
Chromium normal-motion viewport matrix:320x568,390x844,600x960,768x1024,900x700,1024x768,1280x720,1920x1080,2560x1440,844x390. Tested welcome, daily sign, method selection, question entry, tarot fan, long synthetic result, language switch. No horizontal overflow.
Additional short-window daily layouts at900x700 and844x390 fit viewport height.
Chromium synthesized touch at390x844: four-card tarot, three-card tarot, six coin tosses and time dial all reached results using browser-only synthetic API fixtures. Fixtures are not in shipped source.
Desktop keyboard: Enter activates welcome, focus moves to daily heading, Tab reaches primary reading action.
No JavaScript errors; existing oracle library tests pass. Actual physical phones and native Safari were not available in this run; viewport and touch evidence is browser emulation.
