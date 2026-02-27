# Dark Knowledge Site Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform ainroi.com from a light-themed basic layout to a premium dark-themed editorial site, translating the approved `mockup-enhanced.html` into the React/Tailwind codebase.

**Architecture:** The site is a single-page React app (`App.tsx` ~957 lines) with Tailwind CSS. We'll update the CSS foundation first (variables, animations, utilities), then rewrite `App.tsx` to match the approved mockup while preserving all existing functionality (blog fetching, markdown rendering, sharing, Google Analytics, tab navigation). No new dependencies needed — Framer Motion is installed but we'll use CSS + IntersectionObserver for simplicity, matching the mockup approach.

**Tech Stack:** React 19, Vite, Tailwind CSS 4.1, ReactMarkdown, Phosphor Icons, Shadcn/ui

**Reference:** `mockup-enhanced.html` (approved design), `docs/plans/2026-02-27-dark-knowledge-redesign-design.md` (design spec)

---

## Task 1: Update `index.html` — Meta & Fonts

**Files:**
- Modify: `index.html`

**Step 1: Update font imports and meta**

Replace the Google Fonts link to include proper Inter weight range and JetBrains Mono weights:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif&display=swap">
```

Add/update `<meta name="theme-color">` in `<head>`:

```html
<meta name="theme-color" content="#060B18">
```

Add dark background to body to prevent white flash:

```html
<body style="background:#060B18">
```

**Step 2: Verify**

Run: `npm run dev`
Expected: Page loads with dark background, no white flash on load.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: update meta, fonts, and dark body background"
```

---

## Task 2: Create New SVG Logo — `public/icon.svg`

**Files:**
- Modify: `public/icon.svg`

**Step 1: Replace logo SVG**

Replace the current bar-chart logo with the hexagonal network-node design from the mockup. This is the same SVG used in `mockup-enhanced.html` at line 1468-1495, adapted for standalone use:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="42" height="42" fill="none">
  <defs>
    <linearGradient id="grad1" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="50%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="grad2" x1="10" y1="10" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#A78BFA"/>
    </linearGradient>
  </defs>
  <path d="M21 2 L36 9 L40 21 L36 33 L21 40 L6 33 L2 21 L6 9 Z"
        fill="none" stroke="url(#grad1)" stroke-width="1.5" opacity="0.6"/>
  <circle cx="21" cy="14" r="3" fill="url(#grad2)"/>
  <circle cx="14" cy="26" r="2.5" fill="url(#grad2)" opacity="0.8"/>
  <circle cx="28" cy="26" r="2.5" fill="url(#grad2)" opacity="0.8"/>
  <line x1="21" y1="17" x2="14" y2="23.5" stroke="url(#grad2)" stroke-width="1" opacity="0.5"/>
  <line x1="21" y1="17" x2="28" y2="23.5" stroke="url(#grad2)" stroke-width="1" opacity="0.5"/>
  <line x1="14" y1="28.5" x2="28" y2="28.5" stroke="url(#grad2)" stroke-width="1" opacity="0.3"/>
  <circle cx="21" cy="32" r="1.5" fill="#F472B6" opacity="0.6"/>
  <circle cx="10" cy="18" r="1" fill="#06B6D4" opacity="0.5"/>
  <circle cx="32" cy="18" r="1" fill="#06B6D4" opacity="0.5"/>
</svg>
```

**Step 2: Verify**

Open `public/icon.svg` in browser — should show hexagonal network node shape with gradient strokes.

**Step 3: Commit**

```bash
git add public/icon.svg
git commit -m "feat: replace logo with hexagonal network-node SVG"
```

---

## Task 3: Update CSS Foundation — `src/main.css`

**Files:**
- Modify: `src/main.css`

**Step 1: Replace `:root` color variables with dark theme tokens**

Replace the entire `:root` block (lines 35-68) and `.dark` block (lines 73-105) with a single dark-first color system. Key tokens from the design doc:

```css
:root {
  --radius: 0.625rem;

  /* Dark Knowledge color system */
  --bg-primary: #060B18;
  --bg-surface: rgba(17,24,39,0.6);
  --bg-surface-hover: rgba(17,24,39,0.85);
  --bg-elevated: rgba(255,255,255,0.03);
  --border-subtle: rgba(255,255,255,0.06);
  --border-medium: rgba(255,255,255,0.08);
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --text-muted: #6B7280;
  --text-dim: #4B5563;
  --accent-blue: #3B82F6;
  --accent-blue-light: #60A5FA;
  --accent-purple: #8B5CF6;
  --accent-purple-light: #A78BFA;
  --accent-cyan: #06B6D4;
  --accent-pink: #EC4899;
  --accent-pink-light: #F472B6;

  /* Shadcn compatibility */
  --background: #060B18;
  --foreground: #F9FAFB;
  --card: rgba(17,24,39,0.6);
  --card-foreground: #F9FAFB;
  --popover: #111827;
  --popover-foreground: #F9FAFB;
  --primary: #3B82F6;
  --primary-foreground: #F9FAFB;
  --secondary: rgba(255,255,255,0.06);
  --secondary-foreground: #D1D5DB;
  --muted: rgba(255,255,255,0.03);
  --muted-foreground: #6B7280;
  --accent: rgba(99,102,241,0.15);
  --accent-foreground: #E0E7FF;
  --destructive: oklch(0.704 0.191 22.216);
  --border: rgba(255,255,255,0.06);
  --input: rgba(255,255,255,0.08);
  --ring: rgba(99,102,241,0.4);
  /* Chart colors for dark */
  --chart-1: #3B82F6;
  --chart-2: #8B5CF6;
  --chart-3: #06B6D4;
  --chart-4: #EC4899;
  --chart-5: #F472B6;
}
```

Remove the `.dark { ... }` block entirely — we're dark-only now.

**Step 2: Add animation keyframes**

Add inside the `@theme inline` block, after the existing accordion keyframes:

```css
/* Ambient float for background orbs */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

/* Gradient text pan */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Entry animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse ring for live indicators */
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* Blinking cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

**Step 3: Add utility classes in `@layer utilities`**

Append to the existing utilities layer:

```css
/* Scroll-triggered reveal animations */
.reveal-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up.revealed {
  opacity: 1;
  transform: translateY(0);
}
.reveal-scale {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-scale.revealed {
  opacity: 1;
  transform: scale(1);
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 40%, #F472B6 70%, #06B6D4 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 8s ease infinite;
}

/* Glassmorphism surface */
.glass-surface {
  background: rgba(17,24,39,0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.05);
}
```

**Step 4: Update the body base styles**

In `@layer base`, update the body rule:

```css
body {
  @apply bg-background text-foreground;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Step 5: Verify**

Run: `npm run dev`
Expected: Page background is dark navy (#060B18), text is light. Existing components may look broken — that's expected.

**Step 6: Commit**

```bash
git add src/main.css
git commit -m "feat: dark knowledge CSS foundation — tokens, keyframes, utilities"
```

---

## Task 4: Rewrite `App.tsx` — Layout Shell (Header, Footer, Background)

**Files:**
- Modify: `src/App.tsx`

This is the largest task. We'll rewrite the entire `App.tsx` in one pass, preserving all existing functionality:

- `BlogMeta` interface and data fetching from `/blogs/manifest.json`
- `Project` interface and `projects` array
- Tab switching (Insights, Projects, About Us)
- Blog list → reader view navigation
- Markdown rendering with ReactMarkdown + remark-gfm + rehype-raw
- Share functionality (clipboard, Twitter, LinkedIn)
- Google Analytics tracking
- Category filtering
- Scroll-to-top on view transitions
- Mobile hamburger menu

**Step 1: Plan the component structure**

The rewritten App.tsx should contain these sections (all inline, matching current monolithic pattern):

1. **Imports** — same React, ReactMarkdown, Shadcn imports + add `useRef, useCallback`
2. **Interfaces** — `BlogMeta`, `Project` (unchanged)
3. **Data** — `projects` array (unchanged)
4. **App component** — state, effects, handlers
5. **Return JSX:**
   - Reading progress bar (fixed top)
   - Background glow orbs (3 fixed-position gradient blobs)
   - Sticky header with glassmorphism + new logo SVG inline + nav tabs
   - Page hero section (eyebrow badge, gradient headline, subtitle, typing accent)
   - Stats bar (4 animated counters)
   - Section dividers
   - Insights tab: filter chips + hero card + blog grid
   - Blog reader: back button, article meta, markdown content with dark styling
   - Projects tab: 3-column project card grid
   - About Us tab (preserve existing content)
   - Newsletter CTA section
   - 3-column footer (brand+social, Insights links, Projects links — NO "Company" column, this is a thought-leadership site not a company)
   - Footer bottom bar + disclaimer

**Step 2: Write the complete rewrite**

The full rewrite of `App.tsx` should:

A. **Keep all existing imports**, plus add `useRef, useCallback` from React.

B. **Keep interfaces and projects array** exactly as-is.

C. **Add new state/refs:**
```tsx
const [headerScrolled, setHeaderScrolled] = useState(false)
const [readingProgress, setReadingProgress] = useState(0)
const statsRef = useRef<HTMLDivElement>(null)
const [statsAnimated, setStatsAnimated] = useState(false)
```

D. **Add new effects:**

- Scroll listener for header glassmorphism state
- Scroll listener for reading progress bar (only when viewing a blog post)
- IntersectionObserver for scroll-reveal animations
- IntersectionObserver for animated stat counters
- Mouse tracking on nav tabs for radial glow effect

E. **Replace ALL JSX** with the dark theme layout from `mockup-enhanced.html`, but:
- Use React state/events instead of vanilla JS onclick handlers
- Use ReactMarkdown for blog content (preserve existing markdown rendering logic)
- Use Phosphor icons for social/UI icons
- Keep all existing share functionality
- Keep Google Analytics calls
- Use Tailwind utility classes for styling instead of raw CSS classes where possible
- For complex styles that can't be expressed in Tailwind (gradient borders, pseudo-element animations), use inline `style` props or keep CSS utility classes from main.css

F. **Key mapping from mockup → React:**

| Mockup Element | React Implementation |
|---|---|
| `<header class="header">` | Sticky `<header>` with `headerScrolled` conditional classes |
| `<nav class="nav-tabs">` | Shadcn `Tabs` or custom buttons with `activeTab` state |
| `onclick="showTab('insights')"` | `onClick={() => setActiveTab('insights')}` |
| `onclick="showReader()"` | `onClick={() => { setSelectedBlog(blog); ... }}` (existing pattern) |
| `.counter[data-target]` | `useEffect` with IntersectionObserver + `requestAnimationFrame` counter |
| `.reveal` classes | `useEffect` with IntersectionObserver adding `.revealed` class |
| Filter chips | Existing `selectedCategory` state + filtering logic |
| Blog grid | Existing `blogs.map()` with new card styling |
| Blog reader | Existing `selectedBlog` + `blogContent` + ReactMarkdown |
| Reading progress | New `readingProgress` state driven by scroll listener |
| Mouse tracking glow | `onMouseMove` handler on nav tabs setting CSS custom properties |

G. **Article content styling:** The ReactMarkdown `components` prop should map to dark theme styles:
- `h2`: left border gradient, letter-spacing -0.5px
- `p`: color #C9CDD4, line-height 1.85
- `table`: rounded borders, blue header tint, row hover
- `blockquote`: becomes TL;DR box with cyan accent
- `strong`: color #F9FAFB
- `a`: blue accent with underline transition
- `li`: color #C9CDD4
- First paragraph gets `.drop-cap` styling

**Step 3: Verify**

Run: `npm run dev`
Expected: Full dark theme site loads with:
- Animated background orbs
- Sticky glassmorphism header with new logo
- Hero section with gradient animated text
- Stats bar with animated counters on scroll
- Blog cards in 2-column grid
- Blog reader with reading progress bar
- Projects in 3-column grid
- Newsletter CTA section
- 3-column footer (brand, insights links, projects links — thought-leadership framing, no corporate "Company" section)

**Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: complete dark knowledge redesign of App.tsx"
```

---

## Task 5: Visual QA & Polish

**Files:**
- Possibly modify: `src/App.tsx`, `src/main.css`

**Step 1: Run the dev server and visually compare against mockup-enhanced.html**

Open both side by side. Check:
- [ ] Background orb animations are smooth
- [ ] Header glassmorphism appears on scroll
- [ ] Logo SVG with pulsing animation renders
- [ ] Nav tab mouse-tracking glow works
- [ ] Hero gradient text animates
- [ ] Stats counters animate on scroll into view
- [ ] Filter chips have shimmer hover effect
- [ ] Hero card has gradient border glow on hover
- [ ] Blog cards lift on hover with purple glow
- [ ] Reading progress bar shows/hides correctly
- [ ] Article content styling matches (drop cap, tables, TL;DR box)
- [ ] Newsletter CTA glassmorphism renders
- [ ] Footer 3-column layout correct (no "Company" column)
- [ ] Mobile responsive (768px breakpoint)

**Step 2: Fix any discrepancies found**

Adjust styles, spacing, colors as needed.

**Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: visual QA polish for dark knowledge redesign"
```

---

## Task 6: Build & Deploy Verification

**Files:**
- None (verification only)

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors.

**Step 2: Preview production build**

Run: `npm run preview`
Expected: Production build renders identically to dev mode.

**Step 3: Commit any build fixes if needed**

```bash
git add -A
git commit -m "fix: resolve build issues for dark knowledge redesign"
```

---

## Task 7: Create Pull Request

**Step 1: Push branch and create PR**

```bash
git push -u origin dark-knowledge-redesign
gh pr create --title "feat: Dark Knowledge site redesign" --body "## Summary
- Complete visual redesign from light to dark theme
- New hexagonal network-node SVG logo
- Glassmorphism header with backdrop blur
- Animated hero section with gradient text
- Animated stat counters
- Enhanced blog cards with gradient borders and hover effects
- Reading progress bar for blog reader
- Newsletter CTA section
- 3-column footer (thought-leadership framing, no corporate "Company" section)
- Scroll-reveal animations
- Mouse-tracking glow effects on navigation
- Mobile responsive

## Reference
- Design doc: docs/plans/2026-02-27-dark-knowledge-redesign-design.md
- Mockup: mockup-enhanced.html

## Test plan
- [ ] Verify all three tabs render correctly
- [ ] Verify blog list loads from manifest.json
- [ ] Verify blog reader renders markdown correctly
- [ ] Verify sharing functionality works
- [ ] Verify mobile responsive layout
- [ ] Verify animations are smooth (no jank)
- [ ] Verify production build succeeds

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```
