# Backend Modules (`/backend`)

This directory houses all backend server logic, database connectivity, server actions, background workers, and AI services for the application.

## Directory Structure

```
backend/
├── actions/              # Server Actions for DB operations & API calls
│   ├── accounts.js       # Account CRUD & balance operations
│   ├── budget.js         # Monthly budget management
│   ├── dashboard.js      # Dashboard data aggregation & account creation
│   ├── seed.js           # Database seeding logic
│   ├── send-email.js     # Email notification service wrapper
│   └── transaction.js    # Transactions & Gemini AI receipt scanner
├── lib/                  # Core backend integrations & security
│   ├── arcjet.js         # Arcjet rate limiting & bot detection
│   ├── checkUser.js      # Clerk user sync with database
│   ├── prisma.js         # Prisma ORM Database client instance
│   ├── utils.js          # Shared utility functions
│   └── inngest/          # Background cron jobs & event triggers
│       ├── client.js     # Inngest client setup
│       └── functions.js  # Monthly report generation & budget alert functions
└── prisma/               # Database schema & migrations
    └── schema.prisma     # PostgreSQL Prisma Schema definition
```
