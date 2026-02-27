# AInROI "Dark Knowledge" Site Redesign — Design Document

**Date:** Feb 27, 2026
**Authors:** Keith McGrane (with Claude Code)
**Status:** Approved

## Overview

Full redesign of ainroi.com from a light-themed basic layout to a premium dark-themed editorial site. Inspired by Cappfinity.com's depth/gradient system combined with modern editorial patterns (Stripe, Vercel, Linear).

## Tech Stack (existing, no new dependencies)

- React 19 + Vite + Tailwind CSS 4.1
- Framer Motion (installed, currently unused — activate for scroll reveals)
- Recharts + D3 (installed — for future blog visualizations)
- Shadcn/ui components (46 installed)
- Lucide/Phosphor/Heroicons

## Design Decisions

### Color System
- Background: `#060B18` (deep navy-charcoal)
- Surfaces: `rgba(17,24,39,0.6)` with backdrop-blur (glassmorphism)
- Text: `#F9FAFB` headings, `#C9CDD4` body, `#4B5563` muted
- Accents: Blue `#3B82F6`, Purple `#8B5CF6`/`#A78BFA`, Pink `#F472B6`, Cyan `#06B6D4`
- Gradients: 220-degree angle (Cappfinity-inspired), adapted for dark

### Logo
- Custom SVG mark: hexagonal shape with network nodes + pulsing animation
- Wordmark: "AI" (blue) + "n" (muted) + "ROI" (pink-violet gradient)
- Tagline: "INSIGHTS · ANALYTICS · IMPACT"

### Layout
- Sticky header with backdrop-blur and gradient underline on active tab
- Blog listing: hero featured card + 2-column card grid
- Horizontal filter chips (replacing sidebar categories)
- Blog reader: single column (max-w-3xl) with scroll progress bar
- 3-column footer with brand+social, insights links, projects links (thought-leadership site, not corporate)

### Visual Effects
- Ambient background glow orbs (CSS animated, 3 gradient blobs)
- Dot grid pattern with radial fade mask
- Scroll-reveal animations (Framer Motion)
- Staggered card entrance animations
- Mouse-tracking glow on nav tabs
- Shimmer hover effects on chips/buttons
- Hero card: animated gradient border on hover, image zoom
- Reading progress bar (gradient, fixed top)
- Animated stat counters section
- Drop cap on first blog paragraph
- Section dividers: gradient lines with diamond accent

### Typography
- Inter (existing) with weights 300-900
- JetBrains Mono for data/code contexts
- Hero: clamp(36px, 5vw, 64px), weight 900, gradient text animation
- Body: 16px/1.85 line-height
- Headings: tight 1.1-1.2 line-height, negative letter-spacing

### Components (from blog content)
- TL;DR box: cyan accent with decorative radial glow
- Stat callout cards: gradient numbers, backdrop-blur, hover glow
- Tables: rounded, blue header tint, row hover highlights
- Blockquotes: left border gradient
- Newsletter CTA: glassmorphism card with noise texture

## File Changes Required

1. `src/main.css` — Dark theme CSS variables, new color system
2. `src/styles/theme.css` — Updated theme tokens
3. `src/App.tsx` — Complete rewrite of layout, all three tabs
4. `public/icon.svg` — New SVG logo mark
5. `index.html` — Update meta theme-color, background color
6. `tailwind.config.js` — Custom colors, animation keyframes if needed

## Reference Mockups
- `mockup.html` — Base dark theme (v2)
- `mockup-enhanced.html` — Full enhanced version with all effects (approved)
