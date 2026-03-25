# Visual Evaluation Criteria

Use this guide when evaluating each slide screenshot. For every slide, complete Tier 2 checks first, then score Tier 3.

## Tier 2 — Layout Integrity (pass/fail)

Check each item. Record `true` for issues found, `false` for no issues.

| Check | What to look for |
|-------|-----------------|
| `overflow` | Any content extends beyond the visible viewport. Text, images, or components are clipped at edges. Scrollbars visible. |
| `overlapping` | Elements overlap each other unintentionally. Text on top of other text. Cards stacking instead of side-by-side. |
| `blank` | The slide is empty or mostly empty when it should have content. Component failed to render. |
| `image_broken` | Image placeholder icon visible. Alt text showing instead of image. Image area is empty/gray. |
| `chart_empty` | Chart canvas is blank (white or transparent rectangle where a chart should be). Usually means Chart.js failed to load. |
| `text_truncated` | Text is cut off mid-word or mid-sentence. Ellipsis where there shouldn't be. Important content hidden. |
| `interactive_visible` | For flip cards, expandable cards: the front face content is visible (icons, titles, subtitles). Set to `false` if the component appears empty or unstyled. |

**Note:** `interactive_visible` is `true` when content IS visible (good). All other checks are `true` when an issue IS found (bad).

## Tier 3 — Aesthetic Quality (1-5 per category)

Score each category independently. Use the rubric below.

### Spacing (1-5)
- **1:** Content jammed against edges or other elements. No breathing room. Padding missing entirely.
- **2:** Noticeably cramped. Some padding exists but feels tight.
- **3:** Adequate spacing. Nothing feels broken but not generous.
- **4:** Good spacing. Content has comfortable room. Visual hierarchy aided by whitespace.
- **5:** Excellent. Balanced and deliberate use of space. Presentation-quality.

### Typography (1-5)
- **1:** Text unreadable. Wrong font rendered. Sizes way off (headings smaller than body).
- **2:** Readable but hierarchy unclear. Heading sizes too similar to body.
- **3:** Correct hierarchy. Headings > subheadings > body. Readable at normal distance.
- **4:** Good typography. Font weights and sizes create clear visual flow.
- **5:** Beautiful. Type choices enhance the theme. Perfect weight contrast.

### Color (1-5)
- **1:** Colors clash. Text invisible against background. Accent colors fight each other.
- **2:** Low contrast issues. Some text hard to read. Colors feel random.
- **3:** Theme-consistent. All colors come from the chosen palette. Readable.
- **4:** Good use of accent colors. Highlights draw attention correctly.
- **5:** Vibrant and harmonious. Colors enhance content meaning. Professional.

### Alignment (1-5)
- **1:** Elements visibly off-center. Jagged left edges. Cards different sizes.
- **2:** Mostly aligned but noticeable inconsistencies.
- **3:** Centered and aligned. No obvious misalignment.
- **4:** Clean alignment. Grid structure visible. Consistent gaps.
- **5:** Pixel-perfect. Every element precisely placed. Professional quality.

### Overall Impression (1-5)
- **1:** Looks broken. Would not present this.
- **2:** Looks amateurish. Functional but unpolished.
- **3:** Looks acceptable. Could present if needed.
- **4:** Looks good. Would confidently present this.
- **5:** Looks polished. Indistinguishable from a professional designer's work.

## Scoring Notes

- Score what you SEE, not what you know the code does.
- Compare against other slides in the same deck for consistency.
- A chart slide with blank canvas gets `chart_empty: true` AND `overall: 1`.
- Title slides and statement slides should score high on spacing (they're intentionally minimal).
- Flip cards and expandable cards show front face only in screenshots — that's correct.
