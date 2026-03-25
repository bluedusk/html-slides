# Quick Start

Copy a prompt. Paste into Claude Code. Get a presentation.

---

## Start from an idea

You have a topic in mind. That's enough.

```
Create a presentation about how our team uses microservices
```

```
Create a presentation about the benefits of remote work
```

```
Create a 15-slide presentation introducing machine learning to non-engineers
```

---

## Start from your notes

You have text, bullet points, or an outline. Paste it in.

```
Create a presentation from this:

- Welcome & introductions
- The problem: our deploy pipeline takes 45 minutes
- Root cause analysis: 3 bottlenecks we found
- The fix: parallel builds + smarter caching
- Results: deploy time dropped to 8 minutes
- What's next: auto-rollback and canary deploys
```

```
Create a presentation based on the following meeting notes:

We discussed the Q2 roadmap. Three priorities were agreed:
1. Migrate auth service to OAuth 2.1 (Jane, by April)
2. Launch self-serve analytics dashboard (Mike, by May)
3. Reduce p95 latency below 200ms (Sara, by June)
Budget approved for two additional hires. Next review: May 15.
```

---

## Start from a file

You have an existing file — PowerPoint, PDF, HTML, Markdown, a doc, anything. Just point to it.

```
Create a presentation based on ./product-roadmap.pptx
```

```
Turn ./design-doc.md into a slide deck
```

```
Convert ./quarterly-report.pdf into a presentation
```

```
Create slides from ./architecture.html
```

```
Read ./meeting-transcript.txt and turn it into a 10-slide summary presentation
```

---

## Start from a reference

You have something to draw inspiration from — a URL, a video, a screenshot, another presentation.

```
Create a presentation about our product. Use this page as reference: https://example.com/product
```

```
Watch ./demo-video.mp4 and create a presentation summarizing what it covers
```

```
Look at ./competitor-deck.pdf and create a similar style presentation for our product
```

```
Use the screenshot at ./whiteboard-photo.png as the basis for a presentation
```

---

## Pick a visual style

Add a theme name to any prompt above. If you don't, you get Obsidian by default.

```
Create a presentation about API design using the Excalidraw theme
```

```
Create a presentation about our startup using the Editorial Light theme
```

| Theme | What it looks like |
|-------|-------------------|
| Obsidian | Dark background, polished, interactive components |
| Excalidraw Light | Hand-drawn look on white, like a whiteboard |
| Excalidraw Dark | Hand-drawn look on dark background |
| Editorial Light | Clean, bright, magazine-like elegance |
| Binary Architect | Hacker-elite, neon on void-black, zero rounded corners |

Want a more artistic, non-technical style? Say "vibe":

```
Create a vibe presentation about sustainable design
```

You'll get to pick from 12 creative visual themes with a live preview.

---

## After it's generated

The output is a single HTML file. Double-click to open in any browser. Use arrow keys to navigate.

Want changes? Just ask:

```
Make slide 3 a comparison layout instead of bullet points
```

```
Add a chart showing monthly growth on slide 5
```

```
Change the theme to Excalidraw Light
```

---

## Share it

```
Deploy my presentation to a live URL
```

```
Export my presentation as a PDF
```

---

## Install

```bash
curl -sSL https://raw.githubusercontent.com/bluedusk/html-slides/main/remote-install.sh | bash
```

Works with Claude Code, Gemini CLI, GitHub Copilot, and OpenAI Codex. See [README](README.md) for details.
