# 🧑‍💻 Portfolio Project – Frontend

**Last updated:** 2025-07-31

## 🚀 Tech Stack
- React + TypeScript
- Styled-Components
- Zustand (state management)
- Axios (API communication)
- React-Router-DOM
- React-Markdown
- SweetAlert2 for toasts
- Framer Motion (animations)
- Cloudinary (images)
- Custom ThemeContext (dark/light mode)
- AuthContext with refresh token handling

## ✅ Features Implemented

### Authentication
- JWT-based login and registration
- Token refresh flow with Axios interceptors
- AuthContext setup
- User profile fetching with React Query

### UI & Theme
- Light/Dark themes with persistence
- Admin login/register with animated SVG icons
- Styled login/register/dashboard sections
- Theme toggle and dynamic application
- Public/Private toggling for user fields

### Admin Panel
- Dashboard with stats
- Settings Page:
  - Personal user settings
  - Site-wide settings (homepage tagline, bio, quick facts)
- QuickFacts input with emoji support
- Image upload via Cloudinary

### About Section (Public)
- Markdown bio rendering with `react-markdown`
- Quick facts list
- Theme integration

### Other Utilities
- Custom `SkeletonCard` for loading states
- Scroll-to-section handling
