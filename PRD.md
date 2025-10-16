# Planning Guide

A visually striking portfolio showcase that highlights Microsoft GitHub projects with professional, enterprise-grade presentation using a dark, modern aesthetic.

**Experience Qualities**:
1. **Professional** - Enterprise-quality presentation that reflects the technical sophistication of Microsoft projects
2. **Engaging** - Visually rich cards with compelling imagery that draws users to explore each project
3. **Accessible** - Clear information hierarchy and intuitive navigation to project repositories

**Complexity Level**: Content Showcase (information-focused)
The site presents static project information with links to external GitHub repositories, focusing on visual presentation rather than interactive features or state management.

## Essential Features

### Project Card Display
- **Functionality**: Display 4 project cards in a responsive grid with images, titles, descriptions, tech tags, and GitHub links
- **Purpose**: Provide an engaging entry point to explore Microsoft's open-source projects
- **Trigger**: Page load
- **Progression**: User views page → Scans project cards → Clicks GitHub link → Redirects to repository
- **Success criteria**: All cards render with images, text is readable, links work correctly

### GitHub Link Navigation
- **Functionality**: Each card has a GitHub icon link at the bottom that opens the repository in a new tab
- **Purpose**: Seamless navigation to project repositories
- **Trigger**: Click on GitHub link
- **Progression**: User clicks link → Opens repository in new tab
- **Success criteria**: Links open correct repositories in new tabs

## Edge Case Handling

- **Missing Images**: Graceful fallback with placeholder or project-themed background color
- **Long Descriptions**: Text truncation or consistent card heights to maintain grid alignment
- **Mobile Responsiveness**: Single column layout on mobile, 2 columns on tablet, 3-4 columns on desktop
- **Hover States**: Subtle elevation and glow effects on card hover for interactivity feedback

## Design Direction

The design should embody Microsoft's Fluent Design System principles - clean, approachable, and professional with soft shadows, subtle borders, and a light color palette. It should feel modern yet familiar, emphasizing clarity and usability with a calm, productivity-focused aesthetic that reflects Microsoft's design language.

## Color Selection

Microsoft Fluent Design System palette with light backgrounds, subtle neutrals, and the iconic Microsoft blue for primary actions.

- **Primary Color**: Microsoft Blue (oklch(0.51 0.19 264)) - The signature Microsoft brand color for interactive elements and links
- **Secondary Colors**: Light gray (oklch(0.95 0.01 264)) for subtle backgrounds and non-primary surfaces
- **Accent Color**: Microsoft Blue (oklch(0.51 0.19 264)) - Used consistently for emphasis and interactivity
- **Foreground/Background Pairings**:
  - Background (Near White oklch(0.98 0 0)): Dark Gray text (oklch(0.2 0 0)) - Ratio 16.5:1 ✓
  - Card (Pure White oklch(1 0 0)): Dark Gray text (oklch(0.2 0 0)) - Ratio 17.8:1 ✓
  - Primary (Microsoft Blue oklch(0.51 0.19 264)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓
  - Secondary (Light Gray oklch(0.95 0.01 264)): Dark Gray text (oklch(0.2 0 0)) - Ratio 15.2:1 ✓
  - Muted (Soft Gray oklch(0.96 0.005 264)): Medium Gray text (oklch(0.5 0.01 264)) - Ratio 7.1:1 ✓

## Font Selection

Segoe UI, Microsoft's signature typeface, providing a clean, modern, and highly readable interface that's optimized for clarity and accessibility.

- **Typographic Hierarchy**:
  - H1 (Page Title): Segoe UI Semibold/40px/normal letter-spacing - Clean and approachable
  - H2 (Project Titles): Segoe UI Semibold/20px/normal letter-spacing - Clear hierarchy without being heavy
  - Body (Descriptions): Segoe UI Regular/14px/relaxed line-height/1.6 - Optimal readability
  - Small (Tags): Segoe UI Regular/12px/normal - Subtle and clean
  - Link Text: Segoe UI Semibold/14px/normal - Clear actionability

## Animations

Fluent Design emphasizes subtle, responsive animations that provide feedback without distraction - gentle elevations on hover, smooth opacity transitions, and minimal movement that feels natural and predictable.

- **Purposeful Meaning**: Hover animations provide clear feedback; elevation changes indicate interactivity
- **Hierarchy of Movement**: Card hover effects are primary (slight lift + shadow increase), link hovers are secondary (color opacity change), all transitions use consistent 200ms timing

## Component Selection

- **Components**: 
  - Card component for project tiles with Fluent styling (subtle shadows, minimal borders)
  - Badge component for technology tags with soft secondary background
  - Text links with Microsoft blue color and arrow indicators
  
- **Customizations**: 
  - Clean white cards with subtle box shadows
  - Minimal 1px borders in light gray
  - Small rounded corners (4px radius) per Fluent guidelines
  - Soft secondary backgrounds for badges
  - GitHub icon badges in top-right of images
  
- **States**: 
  - Card hover: Subtle upward movement (2px) + increased shadow depth
  - Link hover: Opacity reduction (80%) + arrow translation
  - Default: Soft shadows (shadow-sm) and thin borders for definition
  
- **Icon Selection**: 
  - GithubLogo from @phosphor-icons/react for repository identification
  - Custom chevron arrow for link indicators (Fluent style)
  
- **Spacing**: 
  - Container: px-8 py-16 (lg: px-16 py-20) for clean, spacious layout
  - Grid gap: gap-4 (lg: gap-6) for comfortable but compact arrangement
  - Card padding: p-5 for balanced content spacing
  - Consistent 8px spacing units throughout
  
- **Mobile**: 
  - Mobile-first: Single column grid, full-width cards, reduced padding (px-4 py-12)
  - Tablet (md): 2-column grid, moderate spacing
  - Desktop (lg): 2-column grid (or 4 if needed), consistent spacing
  - Images: Aspect ratio 16/9 maintained across all breakpoints
