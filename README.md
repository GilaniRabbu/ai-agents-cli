# 🧠 AI Agent Catalog (Next.js + TypeScript + Redux)

A responsive, SEO-optimized AI Agent catalog built with Next.js App Router and TypeScript. This project showcases a mock directory of AI agents with filtering, search, and Google OAuth authentication.

---

## 🚀 Features

- ✅ Server-Side Rendering (SSR) with Next.js App Router
- ✅ Fully typed with TypeScript
- ✅ Filterable and searchable AI Agent list
- ✅ Global state management using Redux Toolkit
- ✅ Shadcn UI for elegant, accessible components
- ✅ Framer Motion for smooth UI animations
- ✅ Google OAuth Authentication using NextAuth.js
- ✅ Mobile-first responsive design
- ✅ SEO-friendly metadata and dynamic head tags

---

## 🔐 Google OAuth Authentication

Google Sign-In is implemented using **NextAuth.js** with full support for the App Router in Next.js.

### 🔧 Steps Followed:

1. **Created Google OAuth Credentials**

   - Registered redirect URI:
     ```
     http://localhost:3000/api/auth/callback/google
     ```

2. **Configured environment variables**

   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`

3. **Created the following file for API auth route:**

   - `app/api/auth/[...nextauth]/route.ts`

4. **Wrapped the entire app in SessionProvider**

   - Location: `app/layout.tsx`

5. **Created a reusable Sign In / Sign Out button**

   - Location: `components/SignInButton.tsx`

6. **Used `useSession()` to access the signed-in user**
   - Used for conditional rendering and protecting pages

> This setup allows users to authenticate securely using their Google accounts, and session information is accessible throughout the app.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Animation**: Framer Motion
- **Authentication**: NextAuth.js

---

## 📁 Project Structure

```bash
📦 ai-agents/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/       # Google OAuth API route (NextAuth)
│   │           └── route.ts
│   ├── layout.tsx                   # Root layout with <SessionProvider>
│   └── page.tsx                     # SSR-rendered AI Agent listing
│
├── components/
│   ├── SidebarFilters.tsx           # Redux-only UI for search & filter options
│   ├── SignInButton.tsx             # Google sign-in and sign-out control
│   ├── ClientAgentCard.tsx          # Card UI to display agent details
│   └── ListOfAgents.tsx             # Main section to display & filter agents
│
├── redux/
│   ├── store.ts                     # Redux store configuration
│   └── filterSlice.ts               # Stores user-selected filter/search state
│
├── public/
│   └── favicon.ico                  # App favicon
│
├── styles/
│   └── globals.css                  # Global styles (Tailwind)
│
├── .env.local                       # Environment variables (Google OAuth keys)
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/your-repo.git
cd clone-repo
npm install
```

Create a **.env.local** file with your Google OAuth credentials and run:

```bash
npm run dev
```
