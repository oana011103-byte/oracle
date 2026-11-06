# Welcome page
Mode: Experience, existing Oracle visual world.

## Composition
The reading path is English title → enlarged celestial engraving → a plain entry hint. These three elements live in one centred grid inside `.welcome-content`. The visible entry button has been removed. Chinese hint: “点击页面任意位置 进入神谕”; English: “Click anywhere to enter Oracle”. A transparent full-screen native click surface navigates to the daily-sign start screen and supports Enter/Space, with its accessible name taken from the visible hint. Header music/language controls remain above the surface and operate independently; blank header space passes through.

The composition fills the viewport with balanced optical padding (80px top/88px bottom desktop;72/80px compact). The title-to-art interval scales24–32px and the art-to-entry interval is32px desktop/28px compact. Short phones reduce these to16/20px. Engraving height follows viewport height:264–400px desktop,260–336px compact and174–220px short compact. At1440×1000 it grows from320px to380px, while title top moves from256px to223px. The short-landscape engraving is220px high. The thin planetary halo follows its size.

Desktop landscape at901px and wider with a fine pointer keeps the title on one line, with .24em phrase gap and glyph padding for the flourishes. Mobile and portrait retain “Find your” / “Answer”. Short landscape uses the engraving in the left column and title/entry grouped on the right. Preserve the native focus order.

## Lettering
Locally hosted OFL Great Vibes (OracleScript),400 weight. Title is always English in both UI languages. Warm grey graphite texture is clipped to selectable native title spans; preserve solid text fallback and CanvasText in forced-colour mode. The top Oracle wordmark uses the same face with a solid fill. No travelling title light.

## Header and materials
Centred32px desktop/28px compact Oracle wordmark; small borderless utilities on the right with44px targets. Supplied dotted corner motifs remain upper-left/lower-right, beyond viewport edges and low opacity. One cleaned rose paper background,80% opacity over#eeebe7, with saturate(.68), contrast(1.1) and fine fibres. Sparse elongated four-point stars twinkle independently; reduced-motion makes them static. Central engraving retains the -28° ivory halo with rear/front arcs and0.85px non-scaling strokes.

## Full-bleed invariant
Welcome ancestor keeps animation:none,filter:none,transform:none so the fixed paper remains viewport-sized. No outer margins, panel border, duplicate card or screenshot watermark. Preserve original supplied assets and their CSS crop/blend.

## Validation
Rendered and checked normal-motion layout at320×568,375×667,390×844,768×1024,1024×768,1280×720,1440×1000,2560×1440,844×390 and932×430. Both language modes preserve expected line counts, title/button bounds and no page overflow. Full-page clicks on background, artwork and header blank space navigate; home return, language/music isolation and keyboard Enter/Space pass. Inspected desktop, phone portrait and phone landscape screenshots; layout detector returns no findings. Browser automation is Chromium, not physical-device testing.

Entry hint refinement: text reads “点击页面任意位置 进入神谕” in Chinese. Hint moves down48px (32px on short landscape) without shifting the heading or engraving, and gently fades between100% and35% opacity over4.8s. Reduced-motion keeps it steadily visible.

Further vertical spacing: welcome heading is raised24px (16px on short compact screens); hint lowers another24px, or16px on short landscape. Relative offsets preserve the central engraving position.

Welcome heading size increased10px at every breakpoint:88px desktop,68px compact,74px short desktop,60px short compact and66px short landscape; very-wide scale88–106px. Existing line layout and offsets remain.

Graphite clipping fix: title ink spans receive .2em vertical painting room with compensating negative margins. Grid/flex parents keep those margins from collapsing, retaining the requested font sizes and composition while revealing full swashes and descenders. The96×64 graphite tile now uses denser, larger irregular deposits with stronger light/dark contrast. Inspected complete desktop/mobile glyph crops and checked responsive entry behavior across ten viewport sizes.

Central emblem: user reverted the breathing refinement. Keep the original static engraving at.5 opacity, with static rear/front halo opacity.5/.9. No emblem scale or ink/ring breathing animations. Existing star twinkles and entry-hint breathing remain.
