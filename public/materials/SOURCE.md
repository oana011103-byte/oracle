# Reading collage materials

All four materials were supplied by the user in this chat on2026-11-06. WebP conversion preserves the original artwork; no illustration has been generated or redrawn.

- `ascii-paper.webp`: `codex-clipboard-bc2a52be-7899-45d5-beb1-c82165d82ab0.png`, proportional600px-wide WebP.
- `dotted-oval.webp`: `codex-clipboard-492a73a9-eece-4141-8271-da8c7c5c2265.png`, proportional600px-wide WebP.
- `ornament-sheet.webp`: `codex-clipboard-80ab2b8d-69b3-4ef9-9f2d-923244da14cd.jpg`, proportional960px-wide WebP. Only the lower-right dotted ribbon region appears through a CSS sprite window or native export source rectangle; the other motifs, text and watermark are outside the displayed region.
- `grain-lily.webp`: `codex-clipboard-4f18b0d0-4d9b-4c47-9866-5347ba89845c.png`, proportional700px-wide WebP.

Result-page layers are noninteractive and hidden from assistive technologies. Multiply blending, monochrome colour and soft perimeter masks integrate the rectangular source photographs into the grey pink paper. Keep central reading text free of high-contrast decoration. The ribbon is a paragraph separator, not a framed panel. Native PNG export draws the same materials and ribbon crop.

The ribbon uses the code-native `paper-ink` SVG colour/alpha filter to display the source ink as warm grey while making its white paper transparent. The filter is clipped back to SourceGraphic alpha to avoid opaque filter-region edges. No replacement artwork is drawn. Export uses multiply compositing for the ribbon; surrounding photo layers use feathered composition canvases to match the page's soft masks.
