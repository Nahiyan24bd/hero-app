# 🚀 HERO.IO - Modern App Showcase Platform

**HERO.IO** is a modern, responsive web application designed to showcase curated mobile and web applications with metadata, metrics, and direct links. Built with **Next.js (App Router)**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🌟 Key Features

- 📱 **Interactive Hero Section**: Clear headlines, quick-access call-to-action buttons (Google Play & App Store), and responsive mockups.
- 📊 **Key Metrics & Statistics**: Real-time display for downloads, total reviews, and active app counts.
- 🔥 **Trending Apps Grid**: Responsive multi-column grid displaying ratings, install metrics, and publisher details.
- ⚡ **Skeleton Loading States**: Visual pulse loading skeletons while fetching data asynchronously.
- 🎨 **Tailwind CSS v4 Engine**: Clean implementation using canonical spacing, aspect-ratio tokens, and modern style sheets.
- 🚫 **Custom 404 Handlers**: Dedicated fallback pages with tailored illustrations for missing routes and unlisted apps.
- 🖼️ **Optimized Media Assets**: SimpleIcons CDN support alongside robust Next.js Image handling.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Data Source:** Local static JSON (`public/data.json`)

---

## 📂 Project Structure

```text
hero-app/
├── public/
│   ├── data.json              # Complete app catalog metadata
│   ├── logo.png               # Platform brand mark
│   ├── hero.png               # Showcase device mockup
│   ├── App-Error.png          # App-specific missing illustration
│   └── error-404.png          # Route 404 illustration
├── src/
│   └── app/
│       ├── apps/              # Apps directory & dynamic routes ([id])
│       ├── components/        # Reusable interface components
│       │   ├── shered/        # Navigation, Footers, and shared modules
│       │   ├── AppCard.tsx
│       │   ├── AppNotFound.tsx
│       │   ├── Hero.tsx
│       │   ├── Stats.tsx
│       │   └── TrendingApps.tsx
│       ├── installation/      # Setup and installation guidelines
│       ├── globals.css        # Tailwind directives and core layers
│       ├── layout.tsx         # Root document layout
│       ├── not-found.tsx      # Global 404 handler
│       └── page.tsx           # Home landing page
├── package.json
└── README.md