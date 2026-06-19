# WCAG 2.1 Accessibility Review

This document records the accessibility review for the Dashboard Assignment UI. The app was reviewed against practical WCAG 2.1 AA expectations for this assignment scope.

## Summary

Status: reviewed and addressed for common WCAG 2.1 AA issues.

The dashboard includes semantic controls, labeled form fields, dialog semantics through Radix UI, keyboard-accessible buttons, visible focus states from browser/Tailwind defaults, screen-reader-only helper text, alert regions for errors, active navigation state, reduced-motion support, and responsive layout behavior.

## Implemented Accessibility Measures

- Login/register fields use visible labels connected with `htmlFor`.
- Login modal uses accessible dialog primitives from Radix UI.
- Invalid credentials and API failures are exposed with `role="alert"`.
- Sidebar active page uses `aria-current="page"`.
- Mobile menu uses `role="dialog"` and `aria-modal="true"`.
- Icon-only buttons include `aria-label`.
- Decorative images use empty alt text.
- Informative user/team images use alt text.
- A skip link allows keyboard users to jump to dashboard content.
- Reduced motion is supported through `prefers-reduced-motion`.
- The app uses semantic buttons instead of clickable divs.
- Color is not the only feedback for validation; messages are shown as text.
- Layout is responsive across desktop, tablet, and mobile.
- Unknown frontend routes redirect to the dashboard instead of trapping users.

## WCAG 2.1 AA Checklist

| Area | Status | Notes |
| --- | --- | --- |
| 1.1.1 Non-text Content | Pass | Informative images have alt text; decorative card assets use empty alt text. |
| 1.3.1 Info and Relationships | Pass | Forms, headings, lists, nav, and sections use semantic relationships. |
| 1.4.1 Use of Color | Pass | Errors include text, not color alone. |
| 1.4.3 Contrast | Pass with visual review | Main text/buttons use high-contrast colors. Some muted decorative text is intentionally secondary. |
| 1.4.10 Reflow | Pass | Layout adapts to mobile/tablet/desktop. |
| 2.1.1 Keyboard | Pass | Interactive elements are native buttons/links/inputs. |
| 2.4.1 Bypass Blocks | Pass | Skip link added. |
| 2.4.3 Focus Order | Pass | DOM order follows visual workflow. |
| 2.4.4 Link Purpose | Pass | Buttons/links have visible text or aria labels. |
| 2.4.7 Focus Visible | Pass | Native/Tailwind focus styling remains available. |
| 2.5.3 Label in Name | Pass | Visible labels match input purpose. |
| 3.3.1 Error Identification | Pass | Validation and API errors are shown in text. |
| 3.3.2 Labels or Instructions | Pass | Form inputs have labels. |
| 4.1.2 Name, Role, Value | Pass | Dialog, tabs, buttons, nav state, and alerts expose accessible roles/state. |

## Known Limitations

- This is a code and manual review, not a certified third-party accessibility audit.
- Automated axe/Lighthouse reports are not included because the assignment does not include a browser-based test runner.
- Exact contrast values should be rechecked if the color palette is changed later.

## Suggested Manual Test Steps

1. Navigate through the app with only the keyboard.
2. Open and close the login modal with keyboard controls.
3. Submit invalid login/register forms and confirm errors are announced/visible.
4. Toggle dark mode and verify text remains readable.
5. Use browser zoom at 200 percent and confirm content remains usable.
6. Enable reduced motion in the OS/browser and confirm animations are minimized.
