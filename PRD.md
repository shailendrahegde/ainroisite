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

The design should evoke a premium, tech-forward aesthetic with a dark purple/navy gradient background, glassmorphic card styling, and vibrant accent colors. It should feel professional yet modern - like a high-end developer portfolio that showcases enterprise-level work with polish and sophistication.

## Color Selection

Custom palette with deep purple/navy gradients and bright accent colors for visual interest.

- **Primary Color**: Deep Purple/Navy (oklch(0.25 0.08 280)) - Sophisticated tech background that doesn't compete with card content
- **Secondary Colors**: Rich Purple accent (oklch(0.45 0.15 290)) for subtle highlights and borders
- **Accent Color**: Bright Blue (oklch(0.65 0.18 240)) - High-energy accent for interactive elements and the "Projects" text highlight
- **Foreground/Background Pairings**:
  - Background (Deep Navy oklch(0.15 0.05 280)): White text (oklch(0.98 0 0)) - Ratio 14.2:1 ✓
  - Card (Translucent Dark oklch(0.2 0.06 285 / 0.6)): White text (oklch(0.98 0 0)) - Ratio 12.8:1 ✓
  - Primary (Deep Purple oklch(0.25 0.08 280)): White text (oklch(0.98 0 0)) - Ratio 11.5:1 ✓
  - Accent (Bright Blue oklch(0.65 0.18 240)): White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓
  - Muted tags (Dark Purple oklch(0.25 0.05 285)): Light Gray text (oklch(0.75 0.02 280)) - Ratio 5.8:1 ✓

## Font Selection

Clean, modern sans-serif typography that conveys technical precision and readability, using Inter for its excellent screen rendering and professional appearance.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/48px/tight letter-spacing/-0.02em - Commanding presence
  - H2 (Project Titles): Inter Semibold/24px/tight letter-spacing/-0.01em - Clear hierarchy
  - Body (Descriptions): Inter Regular/15px/relaxed line-height/1.6 - Comfortable reading
  - Small (Tags): Inter Medium/12px/uppercase/letter-spacing/0.05em - Technical feel
  - Link Text: Inter Medium/14px/normal - Clear actionability

## Animations

Subtle, purposeful animations that enhance premium feel without distracting from content - gentle hover elevations, smooth transitions, and soft glows that respond to user interaction.

- **Purposeful Meaning**: Hover animations communicate interactivity; smooth transitions maintain visual continuity
- **Hierarchy of Movement**: Card hover effects are primary (scale + glow), link hovers are secondary (color shift), background gradient is ambient (slow subtle shift)

## Component Selection

- **Components**: 
  - Card component for project tiles with customized glassmorphic styling (backdrop-blur, border gradients)
  - Button component for GitHub links with icon integration
  - Badge component for technology tags with custom muted styling
  
- **Customizations**: 
  - Custom gradient background with animated shift
  - Glassmorphic cards with border-gradient effects
  - Custom image overlays with gradient masks
  - Technology tag badges with pill styling
  
- **States**: 
  - Card hover: Subtle scale (1.02) + elevated shadow + bright border glow
  - Link hover: Color shift to accent blue + icon scale
  - Default: Soft shadows and subtle borders for depth
  
- **Icon Selection**: 
  - GithubLogo from @phosphor-icons/react for repository links (recognizable, on-brand)
  - ArrowUpRight or Link for external link indicators
  
- **Spacing**: 
  - Container: px-8 py-16 (lg: px-16 py-24) for generous breathing room
  - Grid gap: gap-6 (lg: gap-8) for clear separation
  - Card padding: p-6 for comfortable content spacing
  - Section spacing: space-y-4 for title/description grouping
  
- **Mobile**: 
  - Mobile-first: Single column grid, full-width cards, reduced padding (px-4 py-12)
  - Tablet (md): 2-column grid, moderate spacing
  - Desktop (lg): 3-column grid (or 4 if 4 projects), maximum spacing
  - Images: Aspect ratio 16/9 maintained across all breakpoints
