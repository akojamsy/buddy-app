# Buddy App

A React admin dashboard for creators and influencers. Users sign up, verify their email with a one-time code, and sign in to manage a portfolio-style workspace: dashboard metrics, groups, messages, analytics, packs, and settings.

This document is the main onboarding guide. After reading it, you should know what the app does, how it is structured, and how to run and extend it locally.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Routing and access control](#routing-and-access-control)
- [Authentication flow](#authentication-flow)
- [State management and API](#state-management-and-api)
- [UI and styling](#ui-and-styling)
- [Path aliases](#path-aliases)
- [Available scripts](#available-scripts)

---

## Features

### Public (guest) routes


| Route           | Page         | Description                                                               |
| --------------- | ------------ | ------------------------------------------------------------------------- |
| `/`             | Sign up      | Multi-step flow: landing → registration form → “check your email” success |
| `/login`        | Sign in      | Email/password login with Formik + Yup validation                         |
| `/verify-email` | Verify email | OTP entry; completes registration and logs the user in                    |


Authenticated users who visit guest routes are redirected to the dashboard.

### Protected routes

All routes below require a valid auth token (see [Authentication flow](#authentication-flow)).


| Route        | Page         | Description                                                                                 |
| ------------ | ------------ | ------------------------------------------------------------------------------------------- |
| `/dashboard` | My Portfolio | Stats, overview chart, trending posts, potential members, watchlist, revenue, trending news |
| `/my-group`  | My Group     | Placeholder shell (layout only)                                                             |
| `/messages`  | Messages     | Thread list + conversation UI (mock data)                                                   |
| `/analytics` | Analytics    | Placeholder shell                                                                           |
| `/pack`      | Pack         | Placeholder shell                                                                           |
| `/settings`  | Settings     | Placeholder shell                                                                           |


Protected routes use a shared layout: collapsible sidebar, page title, search, notifications, and scrollable content.

### Other behavior

- **Toast notifications** — API errors and successes surface via [Sonner](https://sonner.emilkowal.ski/).
- **Logout** — Clears Redux auth/messages, RTK Query cache, cookies, local storage helpers, and persisted state, then navigates to `/login`.
- **401 handling** — Invalid or expired sessions trigger logout and redirect to login (when not already on auth pages).

---

## Tech stack


| Layer         | Choice                                  |
| ------------- | --------------------------------------- |
| Framework     | React 19 + TypeScript                   |
| Build         | Vite 8 (React Compiler via Babel)       |
| Routing       | React Router 7                          |
| State         | Redux Toolkit, RTK Query, redux-persist |
| Forms         | Formik + Yup                            |
| Styling       | Tailwind CSS 4, shadcn/ui, Radix UI     |
| Charts        | Recharts                                |
| Motion        | Framer Motion                           |
| Notifications | Sonner                                  |


---

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** (or another package manager compatible with `package-lock.json`)
- A **backend API** that implements the admin auth endpoints listed under [State management and API](#state-management-and-api) (or a proxy that forwards to one)

---

## Getting started

1. **Clone and install**
  ```bash
   git clone <repository-url>
   cd buddy-test
   npm install
  ```
2. **Configure the API base URL** (see [Environment variables](#environment-variables))
  ```bash
   cp .env-example .env
  ```
   Edit `.env` and set `VITE_PUBLIC_URL` to your API origin (no trailing slash).
3. **Run the dev server**
  ```bash
   npm run dev
  ```
   Open the URL Vite prints (typically `http://localhost:5173`).
4. **Production build**
  ```bash
   npm run build
   npm run preview
  ```

---

## Environment variables

Variables must be prefixed with `VITE_` to be exposed to the client.


| Variable          | Required                  | Description                                                                                                                                   |
| ----------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_PUBLIC_URL` | Recommended in production | Base URL for all RTK Query requests (e.g. `https://api.example.com` or `http://localhost:3000`). Trailing slashes are stripped automatically. |


**Development behavior** (`src/redux/services/baseApi.ts`):

- If `VITE_PUBLIC_URL` is set, all API calls use that host.
- If it is unset and you are on `localhost` / `127.0.0.1`, the base URL is empty (`''`), so requests are **same-origin** relative to the Vite dev server. Use a dev proxy or serve the API on the same host/port if you rely on this.
- In production without `VITE_PUBLIC_URL`, the base URL is also empty — set the variable for real deployments.

Example `.env`:

```env
VITE_PUBLIC_URL=http://localhost:3000
```

Do not commit `.env` (it is gitignored). Commit `.env-example` with placeholder values only.

---

## Project structure

```
buddy-test/
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── assets/             # SVG icons, images
│   ├── components/         # Shared UI (sidebar, nav, modals, shadcn primitives)
│   ├── hooks/              # use-mobile, use-local-storage
│   ├── lib/                # Utilities (e.g. cn() for class names)
│   ├── pages/
│   │   ├── auth/           # Sign up, sign in, verify email + subcomponents
│   │   └── protected/      # Dashboard, messages, placeholders, app-layout
│   ├── redux/
│   │   ├── features/       # authSlice, messagesSlice, root-reducer
│   │   └── services/       # baseApi, authApi (RTK Query)
│   ├── routes/             # Route tree, GuestRoute, ProtectedRoute
│   ├── utils/              # routes-path, mock data (messages, overview)
│   ├── App.tsx             # Provider, PersistGate, Router, Toaster
│   └── main.tsx            # Entry point
├── .env-example
├── components.json         # shadcn/ui config
├── vite.config.ts          # Aliases, React Compiler, Tailwind
└── package.json
```

**Where to look first**


| Task                         | Start here                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------- |
| Add a route                  | `src/utils/routes-path.ts` → `src/routes/index.tsx` → new page under `src/pages/` |
| Change auth                  | `src/redux/services/authApi.ts`, `src/redux/features/auth/authSlice.ts`           |
| Change API behavior / errors | `src/redux/services/baseApi.ts`                                                   |
| Sidebar navigation           | `src/components/nav-projects.tsx`                                                 |
| Protected page layout        | `src/pages/protected/app-layout.tsx`                                              |


---

## Routing and access control

Route paths are centralized in `src/utils/routes-path.ts`. The route tree lives in `src/routes/index.tsx`.

```
                    App (BrowserRouter)
                           │
                    Suspense + Routes
                           │
         ┌─────────────────┴─────────────────┐
         │                                   │
    GuestRoute                          ProtectedRoute
  (redirect if logged in)            (redirect to /login if not)
         │                                   │
    /  sign-up                          /dashboard
    /login  sign-in                     /my-group, /messages, …
    /verify-email
```

- `**GuestRoute**` (`src/routes/guest-route.tsx`) — Renders child routes only when `selectIsAuthenticated` is false; otherwise redirects to `/dashboard`.
- `**ProtectedRoute**` (`src/routes/protected-route.tsx`) — Renders child routes only when authenticated; otherwise redirects to `/login` and preserves `location` in navigation state for possible “return after login” use.

---

## Authentication flow

### Sign up (`/`)

1. **Landing** — Entry screen; user proceeds to the form.
2. **Form** — Submits `first_name`, `last_name`, `email`, `password` to `POST /admin/register`.
3. **Success** — Shows “email sent” UI; may include OTP hint from the API response in development.

User is expected to complete verification on `/verify-email` (often linked from email; the app also supports navigation with `location.state`: `{ email, otp }`).

### Verify email (`/verify-email`)

- Submits `email` + `otp` to `POST /admin/verify-otp`.
- On success, dispatches `setAuthUser` (user + token) and can show a success step.
- **Resend OTP** — `POST /admin/resend-otp` with `{ email }`.

### Sign in (`/login`)

- Submits `email` + `password` to `POST /admin/login`.
- On success, `setAuthUser` stores user and token in Redux (and persistence).

### Session model

- **Authenticated** when `auth.token` is non-empty (`selectIsAuthenticated`).
- **Authorization header** — RTK Query sends `Bearer <token>` from, in order: `js-cookie` `token` cookie, then Redux `auth.token`.
- **Persistence** — `auth` and `messages` slices are whitelisted in redux-persist (`localStorage`).

---

## State management and API

### Redux store (`src/redux/store.ts`)

- **Persisted slices:** `auth`, `messages`
- **RTK Query:** `baseApi` middleware and reducer
- **Typed hooks:** `useAppDispatch`, `useAppSelector`

### API layer

`baseApi` (`src/redux/services/baseApi.ts`) wraps `fetchBaseQuery` with:

- Dynamic `baseUrl` from `VITE_PUBLIC_URL`
- Bearer token injection
- Centralized error toasts (400, 401, 403, 404, 409, 422, 500, 503, 405, parsing errors)

`authApi` injects endpoints:


| Hook                     | Method | Path                | Body                                         |
| ------------------------ | ------ | ------------------- | -------------------------------------------- |
| `useSigninMutation`      | POST   | `/admin/login`      | `{ email, password }`                        |
| `useSignupMutation`      | POST   | `/admin/register`   | `{ first_name, last_name, email, password }` |
| `useVerifyEmailMutation` | POST   | `/admin/verify-otp` | `{ email, otp }`                             |
| `useResendOtpMutation`   | POST   | `/admin/resend-otp` | `{ email }`                                  |


Expected response shape (simplified):

```ts
{
  success: boolean
  message: string
  data: {
    user?: Record<string, unknown>
    token?: string
    otp?: number | string  // register / resend only
  }
}
```

Sign-in and verify-email mutations automatically call `setAuthUser` when `success` and both `user` and `token` are present.

### Mock vs live data

- **Auth** — Live API (via RTK Query).
- **Dashboard / messages** — Mostly static or mock data in `src/utils/` and page components; not wired to `baseApi` yet except auth.

To add a new API domain: inject endpoints into `baseApi` (same pattern as `authApi.ts`) and optionally add tag types in `TAG_TYPES`.

---

## UI and styling

- **Global styles** — `src/index.css` (Tailwind 4).
- **Design system** — shadcn/ui components under `src/components/ui/`; configured via `components.json`.
- **Layout** — `DashboardLayout` + `AppSidebar` for protected pages; `AuthLayout` + `AuthCard` for auth pages.
- **Brand accents** — Orange `#FF8600`, neutrals `#3B3B45`, `#818187`; font utility `font-lexend` on main shell.

Adding a shadcn component (if CLI is set up):

```bash
npx shadcn@latest add <component>
```

---

## Path aliases


| Alias           | Resolves to            | Used in                                               |
| --------------- | ---------------------- | ----------------------------------------------------- |
| `@/*`           | `src/*`                | Most imports (`vite.config.ts` + `tsconfig.app.json`) |
| `#components/*` | `src/components/*.tsx` | `package.json` `imports`                              |
| `#lib/*`        | `src/lib/*.ts`         | `package.json` `imports`                              |
| `#hooks/*`      | `src/hooks/*.ts`       | `package.json` `imports`                              |


Prefer `@/` for pages, redux, and routes; `#components/` etc. match existing component imports.

---

## Available scripts


| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR                       |
| `npm run build`   | Typecheck (`tsc -b`) and production build to `dist/` |
| `npm run preview` | Serve the production build locally                   |
| `npm run lint`    | Run ESLint on the project                            |


**Note:** The [React Compiler](https://react.dev/learn/react-compiler) is enabled (Babel preset in `vite.config.ts`). It can affect dev/build performance; see React docs for details.

---

