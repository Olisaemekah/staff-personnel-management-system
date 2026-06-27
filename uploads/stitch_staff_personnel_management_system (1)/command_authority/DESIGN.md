---
name: Command Authority
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d31'
  on-tertiary-container: '#188ace'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  official-navy: '#0F172A'
  slate-muted: '#64748B'
  border-subtle: '#E2E8F0'
  status-active: '#166534'
  status-alert: '#991B1B'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-page: 32px
  margin-mobile: 16px
  max-width-content: 1280px
---

## Brand & Style

The design system is engineered for the **Staff Personnel Management System (SPMS)**, embodying a brand personality that is **authoritative, institutional, and precise**. It is designed for high-stakes administrative environments where personnel data integrity and clarity are paramount. The target audience includes government officials, military administrators, and high-level HR personnel who require a tool that feels like a dependable instrument of state.

The visual style is **Corporate / Modern with a Functionalist lean**. It prioritizes information density and logical hierarchy over decorative flair. The aesthetic is defined by a rigorous adherence to a grid, sharp edges, and a "utility-first" approach that ensures every pixel serves a purpose. The emotional response should be one of trust, order, and efficiency—evoking the feeling of an official, high-performance database.

## Colors

This design system utilizes a **high-contrast, professional palette** anchored in deep navy and cool grays to project authority.

- **Primary (Official Navy):** Used for headers, primary navigation, and high-level structural elements. It provides the "weight" of the system.
- **Secondary (Slate):** Used for supporting UI elements, secondary buttons, and icons to maintain a sober tone.
- **Tertiary (Action Blue):** A focused accent color used sparingly for active states, text links, and primary calls to action to guide the user's eye without breaking the professional facade.
- **Neutral (Ice White/Slate):** A range of near-white surfaces and cool grays provides a clean backdrop that maximizes legibility for dense personnel records.

**Status Colors:** Colors for system status (active, alert, pending) are desaturated to ensure they fit within the formal aesthetic while remaining functionally distinct.

## Typography

The typography system is built on **Inter**, chosen for its exceptional legibility in data-heavy interfaces and its neutral, systematic character.

- **Headlines:** Use tight letter spacing and bold weights to establish immediate hierarchy. The `headline-sm` level uses uppercase styling to denote section starts within personnel profiles.
- **Body Text:** Optimized for long-form reading of records and histories. `body-md` is the workhorse for most data entry and viewing.
- **Data Mono:** A secondary monospaced font (JetBrains Mono) is introduced specifically for ID numbers, timestamps, and technical strings to ensure character distinction.
- **Responsive Handling:** Large headlines scale down on mobile, but the system maintains a rigid vertical rhythm to ensure forms remain readable on all devices.

## Layout & Spacing

This design system employs a **12-column fixed-fluid hybrid grid**. 
- **Desktop:** The layout is centered with a max-width of 1280px to prevent excessive line lengths in data tables. 
- **Rhythm:** A 4px baseline grid governs all spacing. Vertical rhythm is strictly enforced (16px/24px/32px steps) to maintain the organized, "official" look.
- **Cards:** Data is organized into structured cards with 24px internal padding. 
- **Multi-step Forms:** These use a centered 8-column layout (approx. 800px) to reduce cognitive load during personnel data entry.
- **Print:** A specialized media query strips all layout backgrounds, utilizing 100% width and hairline borders to replicate official paper documentation.

## Elevation & Depth

To maintain a formal and flat aesthetic, this design system avoids heavy shadows. Hierarchy is instead conveyed through **Tonal Layering and Low-Contrast Outlines**.

- **Surface Levels:** The page background uses `neutral-color-hex` (#F8FAFC). Cards and containers use pure white (#FFFFFF) to pop against the background.
- **Outlines:** All containers and cards use a 1px solid border (`border-subtle`). This creates a "blueprint" feel that is clean and structured.
- **Shadows:** When necessary for functional separation (e.g., dropdowns or modals), a single "System Shadow" is used: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`. It is crisp and minimal.
- **Focus States:** High-visibility 2px solid outlines in `tertiary-color` are used for keyboard navigation, essential for accessibility in government-standard tools.

## Shapes

The shape language is **Soft (Level 1)**. 

- **Radius:** A standard 4px (0.25rem) radius is used for most UI components (buttons, input fields, cards). This provides just enough softness to feel modern while maintaining a serious, "square" military posture.
- **Strictness:** Avoid larger radii or pill-shapes, as they appear too casual for a personnel management system.
- **Interactive Elements:** Buttons and form inputs share the exact same radius and height increments (32px, 40px, 48px) to create a sense of systematic harmony.

## Components

- **Data Tables:** The core of the system. Use "Zebra striping" with a very faint gray for rows. Headers must be `official-navy` with white `label-bold` text. No vertical borders; use horizontal dividers only.
- **Official Profile Headers:** A full-width component with a `primary` background. Includes a 120px circular or square avatar with a thick white border, and high-contrast display text for the individual's name and rank.
- **Buttons:**
    - **Primary:** Solid `official-navy` with white text. No gradients.
    - **Secondary:** Ghost style with `slate-muted` border and text.
- **Multi-step Forms:** Use a vertical "Stepper" component on the left-hand side of the card. Completed steps show a checkmark in `status-active`, current steps are bolded with a blue indicator.
- **Inputs:** High-contrast 1px borders. Labels are always persistent (not floating) and set in `label-bold` above the field.
- **Cards:** Use as the primary container for grouping data (e.g., "Service History"). Cards should have a `headline-sm` title bar separated by a hairline divider from the content below.