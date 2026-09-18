# DreamEstate — Real Estate Web App

A modern single-page real estate application built with React, Vite, and Tailwind CSS. Browse verified properties for sale and rent, compare listings side by side, save favorites, contact agents, and manage everything from a personal dashboard. Includes role-based access (user, agent, admin), dark mode, and a dedicated admin panel.

## Features

- **Property browsing** — filterable listings with search by location, type, listing type, and price range (filters sync to URL query params)
- **Property details** — photo galleries, amenities, agent info, and inquiry forms
- **Compare mode** — side-by-side comparison of up to 3 properties, persisted in localStorage
- **Favorites** — save and manage favorite properties, persisted in localStorage
- **Authentication** — login, registration with role selection (buyer/renter, agent), forgot-password flow, demo accounts included
- **User dashboard** — profile editing, favorites, inquiries, notification preferences, password change
- **Admin dashboard** — platform overview with listings, users, and activity management
- **Agents directory, blog, about, and contact pages**
- **Dark mode** — system-aware with manual toggle, persisted in localStorage
- **Responsive design** — mobile-first layouts with dedicated mobile navigation
- **Toast notifications** — global feedback system for user actions

## Tech Stack

| Technology | Version |
|------------|---------|
| React | 19 |
| Vite | 8 |
| React Router | 7 |
| Tailwind CSS | 4 |
| Lucide icons | 1.x |
| ESLint | 10 |

State is managed with React Context (`AuthContext`, `CompareContext`, `ToastContext`) plus custom hooks (`useFavorites`). Auth, favorites, compare list, and theme persist via localStorage — no backend required.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone <repository-url>
cd realestate-app
npm install
```

### Development

```bash
npm run dev
```

Opens the app with hot module replacement (default: http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

The build outputs static files to `dist/`.

### Lint

```bash
npm run lint
```

## Demo Accounts

All demo accounts use the password `123456`:

| Email | Role | Access |
|-------|------|--------|
| `admin@test.com` | Admin | Admin panel (`/admin`) + dashboard |
| `agent@test.com` | Agent | Dashboard |
| `user@test.com` | User | Dashboard |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero search, featured properties, and categories |
| `/properties` | Listings with filters (supports `?type=`, `?listingType=`, `?location=`, `?minPrice=`, `?maxPrice=`) |
| `/property/:id` | Property detail page |
| `/agents` | Agents directory |
| `/about` | About page |
| `/contact` | Contact page |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog article |
| `/compare` | Side-by-side property comparison |
| `/favorites` | Favorites (redirects to login when signed out) |
| `/dashboard` | User dashboard (requires auth) |
| `/admin` | Admin panel |
| `/login`, `/register`, `/forgot-password` | Authentication pages |

## Project Structure

```
realestate-app/
├── public/                  # Static assets (favicon, etc.)
├── src/
│   ├── assets/              # Images and media
│   ├── components/
│   │   ├── auth/            # Auth-related components
│   │   ├── common/          # Shared UI (buttons, spinners, section titles)
│   │   ├── home/            # Homepage sections (hero, cards, testimonials, ...)
│   │   ├── layout/          # Navbar, footer, page layout
│   │   └── properties/      # Listing, filters, and detail components
│   ├── context/             # Auth, compare, and toast providers
│   ├── data/                # Mock data (properties, agents, blog, testimonials)
│   ├── hooks/               # Custom hooks (favorites, ...)
│   ├── pages/               # Route-level page components
│   ├── utils/               # Helpers and utilities
│   ├── App.jsx              # Route definitions
│   ├── main.jsx             # Entry point and provider wiring
│   └── index.css            # Tailwind theme, design tokens, animations
├── index.html               # HTML shell with SEO/social meta tags
├── vercel.json              # SPA rewrites for Vercel deployment
├── vite.config.js           # Vite + React + Tailwind configuration
└── eslint.config.js         # ESLint configuration
```

## Deployment

The project is configured for zero-config deployment on Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- `vercel.json` includes SPA rewrites so deep links (e.g. `/properties`, `/dashboard`) resolve to `index.html`

Deploy via the Vercel dashboard (import the repository, framework preset: Vite) or with the CLI:

```bash
npm i -g vercel
vercel --prod
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |
