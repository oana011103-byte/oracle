---
name: Oracle
description: Grey-rose paper and graphite lettering for a quiet bilingual I Ching and Tarot ritual.
colors:
  night: "#eeebe7"
  page: "#eeebe7"
  page-ink: "#5e5955"
  page-muted: "#625b55"
  card: "#fffcf6"
  ink: "#5e5955"
  muted: "#625b55"
  line: "#d9cec7"
  soft: "#f5e6e0"
  gold: "#a3948d"
  gold-deep: "#81716a"
  button: "#fffdf6"
  button-hover: "#fffefb"
  button-text: "#625e58"
  field-border: "transparent"
typography:
  display:
    fontFamily: "OracleScript, OracleTitle, cursive"
    fontSize: "88px desktop; 68px compact; 60px short compact"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0"
  headline:
    fontFamily: "OracleSerif, 'Songti SC', STSong, Georgia, serif"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 1.3
  reading-title:
    fontFamily: "OracleSerif, 'Songti SC', STSong, Georgia, serif"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: 1.12
  body:
    fontFamily: "'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  reading-body:
    fontFamily: "'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  control: "18px"
  altar-card: "8px"
  tarot-face: "8px"
  pill: "99px"
spacing:
  tight: "6px"
  related: "8px"
  compact: "12px"
  regular: "14px"
  inset: "20px"
  section: "24px"
  screen: "30px"
components:
  button-primary:
    backgroundColor: "{colors.button}"
    textColor: "{colors.button-text}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.button-text}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  question-field:
    backgroundColor: "#fffdf44d"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "20px"
    width: "100%"
  tarot-face:
    backgroundColor: "#fffdf5c9"
    textColor: "{colors.ink}"
    rounded: "{rounded.tarot-face}"
    padding: "6px"
  language-control:
    backgroundColor: "#f7f1f040"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
  next-step:
    backgroundColor: "#f8ece4"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: Oracle

## Overview

**Creative North Star: "银粉祈愿笺 · Pale Blush Vellum"**

Oracle feels like a personal prayer sheet resting on warm pale-pink paper. Faded rose, floral netting, lace edges and restrained polka dots carry the user-pinned sense of divinity. A quiet orbital arrangement gives the cards presence without competing with the question or reading.

The interface remains a usable bilingual app: warm brown text, clear actions and deliberate transitions sit above pale material layers. English serif italics feel intimate; Chinese Songti stays upright. Detail belongs to paper, cards and ritual objects, while functional controls stay simple.

**Key Characteristics:**
- Silver-rose paper with warm brown text.
- Floral tulle, lace and fine polka dots as material.
- Quiet orbital geometry and slow breathing motion.
- Serif ritual typography paired with clear bilingual controls.

## Colors

The palette is faded rose and silver paper, anchored by warm brown typography. The frontmatter records the final stylesheet values; inherited variable names `night` and `gold` are historical names, not instructions to introduce navy or metallic yellow.

### Primary

- **Ivory:** the `button` and `button-hover` tones identify the principal invitation and its hover state.
- **Deep Rose Ink:** `gold-deep` supplies focused controls, symbols and small ritual emphasis; `gold` supports the quieter accent role.

### Neutral

- **Pale Blush Paper:** `page` is the backdrop; the rendered page layers a pale radial light over a grey-pink diagonal gradient.
- **Vellum:** `card` is the lace paper surface; `soft` distinguishes reversed cards and quiet inset surfaces.
- **Warm Brown Ink:** `ink` and `page-ink` carry readable text. `muted` and `page-muted` carry secondary reading and interface copy.
- **Rose Seam:** `line` and `field-border` define fine borders rather than heavy boxes.

**The Pale Material Rule.** Keep texture and celestial ornament behind dark, readable content; the material supplies atmosphere rather than text contrast.

## Typography

**Display Font:** local `OracleSerif` loads regular and italic Instrument Serif files from `/fonts/`. The authoritative serif stack continues with Songti SC, STSong and Georgia.

**Body Font:** Avenir Next, PingFang SC, Microsoft YaHei and sans-serif. **Chinese Font:** Songti SC, STSong and serif.

The pairing places intimate serif gestures beside clear controls and reading copy. `public/responsive.css` owns the welcome lettering and adaptation; `public/reading.css`, loaded last, owns the subsequent reading screens.

### Hierarchy

- **Display:** the shared English homepage title uses locally hosted Great Vibes (OracleScript), weight400, as “Find your Answer” in both language modes: a single line on desktop landscape, two lines on mobile and portrait.
- **Headline:** English reading-screen headings use Great Vibes at58px desktop/50px compact; Chinese headings use upright Songti at36px desktop/32px compact. Short screens reduce these to44px/30px.
- **Reading title:** the result uses Cormorant Garamond at48/40px in English, upright Songti at36/30px in Chinese; never the decorative homepage script for long reading titles.
- **Body:** app text uses the body role; reading prose uses the more generous reading-body line height and left alignment.
- **Label:** small medium-weight sans labels use spaced letters. Tracking varies by context: .13em for the daily label, .16em for prompts and steps, .24em for the date.
- **Wordmark:** the top Oracle brand uses the same OracleScript face as the English title;32px desktop and28px compact on the welcome page.

**The Upright Chinese Rule.** Do not synthesize italic Chinese. Chinese mode explicitly removes italics from every element.

## Layout

A separate welcome screen precedes the daily-sign and reading screens. Its latest user-pinned treatment is the supplied faded rose paper background, a dotted filigree corner at upper-left and lower-right, and an enlarged supplied celestial engraving between the English title and a plain click-anywhere entry hint. No previous welcome collage motifs remain.

The reading journey shares the cleaned full-viewport rose paper and fine fibre texture. Its centred main region is1140px wide at most, with borderless44px masthead and a centred Oracle wordmark. Background lace rails and heavy floral overlays are removed.

The daily-sign screen keeps its responsive two-column desktop arrangement and compact phone adaptations, with one physical sign card, a quiet doily and one thin orbital ring. Decorative rear cards and concentric frames are removed. Selection, question, cast and result screens use a640px content measure (600px compact). The latest control-specific refinement removes paper oval backings from 六爻, 塔罗 and 今日提问, leaving their artwork and labels directly on the paper. The question retains its translucent notebook writing surface. Primary, secondary, return, music and language actions share an oval paper treatment.

Results are an open letter: date, question, physical reading objects, title, prose, small step and optional casting explanation. There is no article card, inner frame, corner stamp or inset small-step box. The latest user-supplied collage adds a dotted oval fragment, ASCII paper and grain lily at the page margins, plus a dotted ribbon between prose and small step. These are materials on the paper, not containers. Mobile Tarot results use two columns, while the desktop layout can show all four cards together. Long prose scrolls naturally. Keyboard focus and44px control targets remain.

## Elevation & Depth

Depth comes from the supplied paper and a restrained shadow under physical sign/Tarot cards. Interface containers have no border or shadow. Input focus outlines and physical card edges are functional exceptions; do not restore decorative nested frames.

Navigation fades the main content over420ms, holds the empty paper for140ms, then fades the destination in over760ms using the Web Animations API. The masthead is a separate body child fixed to the viewport, staying fully visible at the same position while pages fade or scroll. This1.32s rhythm is user-pinned for immersion. Layout and scroll resets occur while invisible; native scrollbar space stays stable. Interruption cancels obsolete transitions, including the pause; repeated destination requests resume from the visible opacity. Both outgoing and revealing content are inert, with the destination heading focused after reveal; the question field does not automatically open the phone keyboard. Header navigation remains available. Reduced motion switches immediately. There is no full-screen blur or sliding content.

The focal motion is drawing and revealing the cards: the deck settles over420ms with a short12ms stagger; selected cards travel into their stable slots over620ms, then turn face/back over820ms with240ms start offsets. The label and reversal rows remain fixed; fan and candle overlap through a crossfade. Coin tosses use staggered76px arcs and one settling bounce. After the sixth toss, all three coins converge into a central stack, a fine tilted seal ring appears, and the page fades to interpretation. Tarot closes with one expansion of its candle aura after the final card reveal. The daily sign floats gently over9s. Hidden-page loops pause; abandoned dial timers stop. No dependency is added.

## Shapes

Ivory interface actions now use true elliptical50% radii with paper texture. Choice and suggestion controls share this surface; results and small-step sections remain open. Physical card faces retain8px corners. Circular coins, a light orbital ring and subtle doily carry the ritual geometry.

## Components

### Buttons

Ivory primary controls use14px sans text and no resting shadow. Hover changes the fill gently; press scales to.98. Secondary actions are transparent text controls. Disabled controls remain at half opacity. Visible keyboard focus is retained. No navigation or action arrow is needed.

### Inputs / Fields

The question field is one translucent ivory writing area with16px corners, no resting border and20–24px padding. A focus outline appears only while editing. Prompts are unboxed text suggestions. Dark warm-grey text and placeholder colours remain readable against the textured paper.

### Navigation

A ruled masthead carries the italic Oracle home button and compact music/language controls. Music uses a circular outline and a filled rose pressed state; language uses a pill. Their minimum target stays44px high; music and language controls now use48×44px borderless paper ellipses, with music symbol12px and language label10px. Back navigation uses the same oval paper surface. Navigation is action-led rather than a tab bar.

### Cards / Containers

The keepsake uses lace paper, an inset dotted seam, subdued ornamental corners and centered headings above left-aligned reading copy. The next-step inset is a flat, pale-rose rectangle. Tarot faces preserve a 2:3.2 proportion, fine rose border, serif symbol/name and Chinese subtitle. Reversed cards rotate the face and switch to the soft fill; empty slots use a dashed border. The selected fan card rises 20px on hover or keyboard focus before selection.

### Orbital Ritual

The homepage arrangement combines a floral veil, thin circular halo, silver doily, three overlapping cards and a few outlined celestial stars. It is decorative and hidden from assistive technology; the daily sign is separately readable. The seven-star daily ritual records history through quiet filled and unfilled stars. Preserve the ritual's visual focus without expanding ornament into functional text areas.

## Do's and Don'ts

### Do:
- **Do** keep the grey-pink, lace, polka-dot and divinity commitments together.
- **Do** use the final local font stacks and upright Songti for Chinese.
- **Do** keep music and language controls at least 44px in both dimensions.
- **Do** preserve the 900px layout transition and readable text above decoration.
- **Do** reuse the supplied paper, corner filigree and doily where they belong, without adding extra frames.

### Don't:
- **Don't** restore the superseded midnight-blue and yellow-gold palette.
- **Don't** turn fine paper edges into generic rounded dashboard cards.
- **Don't** use pale decorative rose as the only readable foreground.
- **Don't** add fast ambient motion or ignore reduced-motion preferences.

Latest user refinement: lighter warm pink with no violet cast; ivory rounded buttons. Removed decorative subtitle, masthead label, altar caption, about blurb, repetitive daily detail and footer copy. Ritual status remains available to assistive technology; casting instructions and reading content remain visible.

Homepage title refinement: always English in both UI languages, with lang="en". The title-case display uses self-hosted Latin-subset Great Vibes (OracleScript), weight400, with contextual, common and discretionary ligatures. Compact sizes adapt from60–68px, and other text retains its existing type system.

Welcome paper is rendered once at80% opacity, from the cleaned rose-paper-clean.png asset; keep body and collage grounds flat to avoid duplicate paper layers.

Full-bleed welcome: keep filtered/transformed entrance effects off the welcome ancestor so the single fixed paper surface remains viewport-sized. Corner filigree widths are430px desktop,215px compact layouts and195px below360px.

Welcome layout: title, enlarged engraving and plain entry hint share one centred grid. The hint follows the engraving in normal flow with32/28px desktop/mobile separation, reducing to20px on short phones. The old visible entry button is removed; a native full-screen click surface opens the daily-sign start screen, preserving independent language/music controls and Enter/Space support. Engraving height scales with viewport height. Desktop landscape title is one line with .24em phrase spacing; mobile and portrait keep two lines. Short landscape places art left and title/entry right. Home brand remains centrally in the header; corners stay pushed beyond the viewport edges. See `.impeccable/welcome.md` for current dimensions and validation.

Responsive implementation now lives in public/responsive.css after the theme. It provides safe-area padding, fluid fan geometry, two-column mobile result cards, compact short-phone daily-sign spreads, tablet/landscape layouts, large-monitor welcome scaling and44px interaction targets. Keep content intrinsically sized; do not restore fixed640px screen heights. See .impeccable/responsive.md for the tested viewport and input matrix.

Welcome entry is now a separate bottom-centred action, mirroring the Oracle wordmark vertically with20px desktop/16px mobile safe-area-aware insets and opacity .5. Star accents use slow independent opacity/scale twinkles and remain still with reduced-motion preferences.

The welcome emblem may carry the implemented thin planetary halo: two ivory SVG half-arcs, -28° tilt and0.85px non-scaling stroke. Preserve its lightness and existing foreground/background arc order.


Welcome paper is softly desaturated with saturate(.68), contrast(1.1), a neutral#eeebe7 ground and a fine140px fibre overlay; retain the faint blush character.

Title material: the Great Vibes “Find your Answer” title on welcome and daily-start screens uses a locally authored96×64 graphite deposit texture clipped inside native glyphs. Soft warm grey pigment and irregular fine paper gaps replace the solid ink fill. Text stays selectable, with solid colour fallback and CanvasText in forced-colour mode. The Oracle wordmark retains its solid fill.

Title line layout: desktop landscape at901px and wider with a fine pointer displays both title spans inline. Portrait and touch-only devices retain the two-line phrase break. Daily-start desktop title scales46–64px to fit its existing column without crowding the altar.

Entry hint refinement: text reads “点击页面任意位置 进入神谕” in Chinese. Hint moves down48px (32px on short landscape) without shifting the heading or engraving, and gently fades between100% and35% opacity over4.8s. Reduced-motion keeps it steadily visible.

Further vertical spacing: welcome heading is raised24px (16px on short compact screens); hint lowers another24px, or16px on short landscape. Relative offsets preserve the central engraving position.

Graphite clipping fix: title ink spans receive .2em vertical painting room with compensating negative margins. Grid/flex parents keep those margins from collapsing, retaining the requested font sizes and composition while revealing full swashes and descenders. The96×64 graphite tile now uses denser, larger irregular deposits with stronger light/dark contrast. Inspected complete desktop/mobile glyph crops and checked responsive entry behavior across ten viewport sizes.

Reading-screen refinement is documented in `.impeccable/reading.md`. Saved PNGs share the same open-paper appearance, with physical reading objects but no outer lace card, border or inset step panel.

The method-selection surface uses three independent rows: title near the top, choices centred, switch near the bottom with an inset. Only the hovered option translates; the title, switch and row geometry stay fixed. Reading-page ambient layers remain stationary, with twinkling limited to the far stars; short-landscape spacing compacts to preserve the entire group. Navigation uses temporary opacity compositor hints and removes them after each transition.

The question screen retains its top heading while the remaining form/suggestion/action group is vertically centred. The editable surface uses restrained notebook ruling and a smaller sans placeholder; typed text keeps its existing serif size. Short phones compact the field and spacing, while short landscape uses a two-column writing layout.

Result alignment refinement: main reading prose and small-step text/label now align centrally, matching the title and card spread. Saved images use the same centred alignment.


Approved refinement: the second page is titled Today’s Oracle in both languages while the welcome keeps Find your Answer. Result sections distinguish position, card name/orientation and centred prose; the small-step sentence has a stronger serif closing role. Daily/result illustrations can open in a native full-screen detail dialog, preserving reversal and restoring focus on close. Native PNG height follows all content at a stable readable type size, with an Oracle footer signature. Quiet landing/paper/ignition sounds share the existing music toggle. See `.impeccable/reading.md` and `HANDOFF.md` for lifecycle and verification.
