# Lumincash — Personal Finance Tracker

A single-page application for tracking personal income and expenses. Manage categories, view transactions, and analyze your budget through charts.

> [Документация на русском языке](./README.ru.md)

---

## Tech Stack

- **HTML5** — page templates
- **SCSS** — styling (split into partials)
- **JavaScript (ES6+)** — app logic, routing, components
- **Vite** — bundler
- **npm** — package manager
- **Bootstrap 5** + **Bootstrap Icons** — UI components and icons
- **Chart.js** — income/expense charts
- **Choices.js** — custom select elements
- **Tempus Dominus** — date picker

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/IceFrosTv2/Personal-Finance-Tracker.git
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
frontend/
├── public/
│   └── templates/
│       ├── layout.html                  # Main layout with sidebar
│       └── pages/
│           ├── auth/
│           │   ├── login.html
│           │   └── register.html
│           ├── dashboard.html
│           ├── transactions/
│           │   ├── transactions-list.html
│           │   ├── transactions-create.html
│           │   └── transactions-edit.html
│           ├── incomes/
│           │   ├── income-categories.html
│           │   ├── income-create.html
│           │   └── income-edit.html
│           └── expenses/
│               ├── expense-categories.html
│               ├── expense-create.html
│               └── expense-edit.html
├── src/
│   ├── main.js                          # Entry point
│   ├── router.js                        # Client-side router
│   ├── config/
│   │   └── config.js                    # App configuration (API, etc.)
│   ├── components/
│   │   ├── common.js                    # Shared components (layout, sidebar)
│   │   └── pages/
│   │       ├── auth/
│   │       │   ├── login.js
│   │       │   └── register.js
│   │       ├── dashboard.js
│   │       ├── transactions/
│   │       │   ├── transactions-list.js
│   │       │   ├── transactions-create.js
│   │       │   └── transactions-edit.js
│   │       ├── incomes/
│   │       │   ├── income-categories.js
│   │       │   ├── income-create.js
│   │       │   └── income-edit.js
│   │       └── expenses/
│   │           ├── expense-categories.js
│   │           ├── expense-create.js
│   │           └── expense-edit.js
│   ├── utils/
│   │   ├── validator-form.js            # Universal form validator
│   │   └── date-picker.js              # Date picker initialization
│   └── styles/
│       ├── styles.scss                  # Styles entry point
│       ├── _auth.scss
│       ├── _layout.scss
│       ├── _dashboard.scss
│       └── _transactions.scss
└── index.html
```

---

## Features

- Registration and login with client-side form validation
- Dashboard with balance overview
- Income and expense category management (create, edit, delete)
- Transaction list with period filtering
- Create and edit transactions
- Income/expense visualization with pie charts (Chart.js)
- Client-side routing without page reload

---

## Roadmap

- Add backend and REST API
- Implement pagination for the transaction list
- Add CSV/Excel data export
- Implement responsive layout for mobile devices
- Add dark theme support

---

## License

[MIT](./LICENSE)

---

## Author

**Frontend Developer** — Andrei
GitHub: [@IceFrosTv2](https://github.com/icefrostv2)
