# Frontend Modules (`/frontend`)

This directory houses all user interface (UI) components, design system elements, React hooks, emails templates, and frontend static assets.

## Directory Structure

```
frontend/
├── components/           # React UI components
│   ├── create-account-drawer.jsx  # Create Account modal/drawer component
│   ├── header.jsx                 # Global header with Clerk UserButton & nav
│   ├── hero.jsx                   # Landing page Hero section
│   ├── theme-provider.jsx         # Next-themes dark/light mode provider
│   ├── theme-toggle.jsx           # Dark/light mode switcher toggle
│   └── ui/                        # Reusable UI primitives (Buttons, Cards, Dialogs, Inputs, Tables)
├── hooks/                # Custom React client hooks
│   └── use-fetch.jsx     # Async data fetch & mutation hook
├── data/                 # Static data & configuration
│   ├── categories.js     # Expense & income categories mapping
│   └── landing.js        # Landing page content, FAQs, and stats
└── emails/               # React Email templates
```
