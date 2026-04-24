# Lumincash вЂ” Personal Finance Tracker

A single-page application for tracking personal income and expenses. Manage categories, view transactions, and analyze your budget through charts.

> [Р”РѕРєСѓРјРµРЅС‚Р°С†РёСЏ РЅР° СЂСѓСЃСЃРєРѕРј СЏР·С‹РєРµ](./README.ru.md)

---

## Tech Stack

- **HTML5** вЂ” page templates
- **SCSS** вЂ” styling (split into partials)
- **TypeScript** вЂ” app logic, routing, components
- **Vite** вЂ” bundler
- **npm** вЂ” package manager
- **Bootstrap 5** + **Bootstrap Icons** вЂ” UI components and icons
- **Chart.js** вЂ” income/expense pie charts
- **Tempus Dominus** вЂ” date picker

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/IceFrosTv3/Personal-Finance-Tracker.git
cd frontend

# Install dependencies
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_HOST="http://localhost:3000"
```

`VITE_HOST` вЂ” base URL of the backend API server.

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
frontend/
в”њв”Ђв”Ђ public/
в”‚   в””в”Ђв”Ђ templates/
в”‚       в”њв”Ђв”Ђ layout.html                     # Main layout with sidebar
в”‚       в””в”Ђв”Ђ pages/
в”‚           в”њв”Ђв”Ђ auth/
в”‚           в”‚   в”њв”Ђв”Ђ login.html
в”‚           в”‚   в””в”Ђв”Ђ register.html
в”‚           в”њв”Ђв”Ђ dashboard.html
в”‚           в”њв”Ђв”Ђ 404.html
в”‚           в””в”Ђв”Ђ operations/
в”‚               в””в”Ђв”Ђ operations-list.html
в”њв”Ђв”Ђ src/
в”‚   в”њв”Ђв”Ђ main.ts                             # Entry point
в”‚   в”њв”Ђв”Ђ router.ts                           # Client-side router
в”‚   в”њв”Ђв”Ђ config/
в”‚   в”‚   в””в”Ђв”Ђ config.ts                       # API base URL and route names
в”‚   в”њв”Ђв”Ђ services/
в”‚   в”‚   в”њв”Ђв”Ђ auth-service.ts                 # Login, register, logout
в”‚   в”‚   в”њв”Ђв”Ђ categories-service.ts           # Category CRUD
в”‚   в”‚   в””в”Ђв”Ђ operations-service.ts           # Operation CRUD + filters
в”‚   в”њв”Ђв”Ђ components/
в”‚   в”‚   в”њв”Ђв”Ђ layout.ts                       # Sidebar, balance, menu state
в”‚   в”‚   в””в”Ђв”Ђ pages/
в”‚   в”‚       в”њв”Ђв”Ђ auth/
в”‚   в”‚       в”‚   в”њв”Ђв”Ђ login.ts
в”‚   в”‚       в”‚   в””в”Ђв”Ђ register.ts
в”‚   в”‚       в”њв”Ђв”Ђ dashboard.ts                # Charts with period filtering
в”‚   в”‚       в”њв”Ђв”Ђ base-filters-page.ts        # Base class: period filter logic
в”‚   в”‚       в”њв”Ђв”Ђ operations/
в”‚   в”‚       в”‚   в”њв”Ђв”Ђ operations-list.ts      # Transaction list with filters
в”‚   в”‚       в”‚   в””в”Ђв”Ђ operations-form.ts      # Create and edit operations
в”‚   в”‚       в””в”Ђв”Ђ base-categories/
в”‚   в”‚           в”њв”Ђв”Ђ base-categories.ts      # Category list (used for both income/expense)
в”‚   в”‚           в”њв”Ђв”Ђ base-categories-create.ts
в”‚   в”‚           в””в”Ђв”Ђ base-categories-edit.ts
в”‚   в”њв”Ђв”Ђ utils/
в”‚   в”‚   в”њв”Ђв”Ђ tokens-utils.ts                 # Token storage and refresh logic
в”‚   в”‚   в”њв”Ђв”Ђ http-utils.ts                   # HTTP wrapper with auth headers
в”‚   в”‚   в”њв”Ђв”Ђ validator-form.ts               # Form validation
в”‚   в”‚   в”њв”Ђв”Ђ toast-utils.ts                  # Error notifications
в”‚   в”‚   в”њв”Ђв”Ђ modal-utils.ts                  # Delete confirmation modal
в”‚   в”‚   в”њв”Ђв”Ђ date-picker.ts                  # Tempus Dominus wrapper
в”‚   в”‚   в””в”Ђв”Ђ select-period.ts                # Period filter button state
в”‚   в””в”Ђв”Ђ styles/
в”‚       в”њв”Ђв”Ђ styles.scss                     # Styles entry point
в”‚       в”њв”Ђв”Ђ _auth.scss
в”‚       в”њв”Ђв”Ђ _layout.scss
в”‚       в”њв”Ђв”Ђ _dashboard.scss
в”‚       в””в”Ђв”Ђ _operations.scss
в””в”Ђв”Ђ index.html
```

---

## Features

- Registration and login with client-side form validation
- Dashboard with balance overview and income/expense pie charts
- Period filtering: today / week / month / year / all time / custom date range
- Income and expense category management (create, edit, delete with confirmation)
- Transaction list with the same period filters
- Create and edit transactions with type, category, amount, date, and comment
- Balance updates automatically after any create, edit, or delete action
- Operations with deleted categories are shown as "uncategorized" in charts
- Client-side routing without page reload
- Responsive layout: collapsible sidebar on desktop, slide-in drawer on mobile (< 650px)
- Dark theme support (toggled via button in the sidebar, preference saved in localStorage)
- Pagination for the transaction list (configurable page size, Previous / Next navigation)

---

## License

[MIT](./LICENSE)

---

## Author

**Frontend Developer** вЂ” Andrei
GitHub: [@IceFrosTv3](https://github.com/IceFrosTv3)
