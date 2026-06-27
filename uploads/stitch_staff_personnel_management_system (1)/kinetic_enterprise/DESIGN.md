---
name: Kinetic Enterprise
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#6a1edb'
  on-tertiary: '#ffffff'
  tertiary-container: '#8343f4'
  on-tertiary-container: '#f7edff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  code:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for high-velocity personnel management, prioritizing clarity, efficiency, and a digital-first perspective. It moves away from the heavy, stagnant aesthetics of traditional HR software toward a modern, tech-forward "SaaS" enterprise feel. 

The visual direction is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes expansive whitespace to reduce cognitive load and focuses on purposeful motion and structural hierarchy to guide the user. The emotional response should be one of confidence, precision, and ease of use, ensuring that complex data management feels intuitive rather than overwhelming.

## Colors

This design system utilizes a high-contrast palette to ensure accessibility and professional rigor. 

- **Primary**: A vibrant digital blue (#2563eb) serves as the core interactive color, used for primary actions, active states, and critical paths.
- **Secondary**: A deep slate (#0f172a) provides grounded contrast for typography and navigation sidebars, replacing traditional navy with a more modern, neutral tone.
- **Surface**: The interface relies on a crisp white background (#ffffff) with subtle light gray (#f8fafc) containers to define logical sections without the need for heavy borders.
- **Success/Warning/Error**: Standard utility colors are calibrated to match the primary blue's saturation for a cohesive look.

## Typography

Inter is the sole typeface for the design system, chosen for its exceptional legibility in data-heavy environments. 

- **Scale**: A tight typographic scale ensures that information density remains high without sacrificing clarity.
- **Weights**: Medium (500) and Semi-Bold (600) are used frequently for labels and headers to create a clear information hierarchy.
- **Hierarchy**: Display and Headline styles use negative letter-spacing to maintain a "tight," modern feel. Body text remains at default tracking for maximum readability during long-form data entry or review.

## Layout & Spacing

The design system employs a **Fluid Grid** model based on an 8px root system to maintain mathematical harmony.

- **Desktop**: A 12-column grid with a 24px gutter. The layout typically features a fixed-width left navigation (240px-280px) and a fluid content area.
- **Padding**: Generous internal padding (24px - 32px) within cards and sections prevents the UI from feeling "cramped," a common pitfall in enterprise software.
- **Reflow**: On tablet devices, the side navigation collapses into a rail or hamburger menu. On mobile, all grid elements stack vertically with a minimum 16px margin on screen edges.

## Elevation & Depth

To maintain a clean and tech-forward aesthetic, depth is communicated through **Tonal Layers** and **Ambient Shadows** rather than rigid lines.

- **Surface Levels**: Level 0 is the light gray background (#f8fafc). Level 1 is the white (#ffffff) card or content block. 
- **Shadows**: Use highly diffused, low-opacity shadows. A standard "SaaS" shadow (e.g., `0 4px 6px -1px rgb(0 0 0 / 0.1)`) is applied to cards and floating elements to provide subtle lift.
- **Interaction**: On hover, interactive elements like cards or buttons should slightly increase their shadow spread or shift upward by 1-2px to signal affordance.

## Shapes

The shape language is consistently **Rounded**, reflecting a modern and approachable software aesthetic.

- **Base Radius**: 8px (rounded-md) for standard components like buttons and input fields.
- **Large Radius**: 12px (rounded-lg) for primary content containers, cards, and modal windows.
- **Full Radius**: Used exclusively for status chips, avatars, and specific toggle switches to create visual variety and distinction from structural elements.

## Components

- **Buttons**: Primary buttons are solid Digital Blue with white text. Secondary buttons use a subtle gray border or a light blue ghost style. All buttons have 8px corner radii and a 40px standard height for touch/click efficiency.
- **Input Fields**: Focus states are critical; use a 2px Digital Blue ring with a subtle offset. Labels are positioned above the field in `label-md` bold for clarity.
- **Cards**: Cards are the primary organizational unit. They feature white backgrounds, 12px corner radii, and a subtle 1px border (#e2e8f0) paired with a soft ambient shadow.
- **Chips/Badges**: Use for status (e.g., "Active", "On Leave"). These are pill-shaped with low-saturation background tints (e.g., light green background with dark green text) to ensure they are legible but not distracting.
- **Lists/Tables**: High-density tables should use subtle zebra striping or simple dividers (#f1f5f9). Row hovers should trigger a light blue tint (#eff6ff) to help users track data horizontally.
- **Avatars**: Always circular to provide a soft counterpoint to the predominantly rectangular grid.