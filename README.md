# Lendsqr Frontend Assessment

A modern React + TypeScript implementation of the **Lendsqr Frontend Assessment**, built with a focus on clean architecture, scalability, performance, accessibility, and responsive design.

## Live Demo

**Application:** https://mohamed-yasser-lendsqr-fe-test.vercel.app/login

## Repository

**GitHub:** https://github.com/mohamedyasser123/lendsqr-fe-test

---

# Features

### Authentication

* Login page
* Form validation
* Protected routes

### Dashboard

* Responsive dashboard layout
* Sidebar navigation
* Header with user profile

### Users

* Fetch users from Mock API (500 records)
* Server-side pagination
* Search users
* Filter by:

  * Organization
  * Username
  * Email
  * Phone Number
  * Status
  * Date
* User actions menu
* Loading state
* Empty state
* Error state

### User Details

* Dynamic user details page
* User information sections
* React Query data fetching
* User data persistence using LocalStorage
* Cached data displayed instantly before API response
* Responsive layout

---

# Tech Stack

* React
* TypeScript
* Vite
* SCSS
* React Router DOM
* TanStack React Query
* Axios
* Vitest
* React Testing Library

---

# Project Structure

```text
src/
│
├── api/
├── assets/
├── components/
├── layouts/
├── modules/
│   ├── auth/
│   └── users/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── types/
│
├── routes/
├── styles/
└── utils/
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/lendsqr-fe-test.git
```

Go into the project

```bash
cd lendsqr-fe-test
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

# Build

```bash
npm run build
```

---

# Run Tests

```bash
npm test
```

or

```bash
npm run coverage
```

---

# Testing

The project includes unit tests covering:

* Users Table
* Filter Dropdown
* Pagination
* User Details Page
* Login Form

Current Result:

* 22 Tests Passing
* 5 Test Suites Passing

---

# Performance

* React Query caching
* Server-side pagination
* LocalStorage caching for User Details
* Optimized component rendering
* Feature-based folder structure

---

# Accessibility

* Semantic HTML
* Keyboard accessible controls
* Proper labels for form inputs
* ARIA attributes where appropriate

---

# Responsive Design

The application is fully responsive for:

* Mobile
* Tablet
* Desktop

---

# Notes

* Mock API contains 500 generated users.
* User details are cached in LocalStorage to provide instant loading on subsequent visits.
* Error, loading, and empty states are handled throughout the application.
* The project follows a feature-based architecture to improve maintainability and scalability.
