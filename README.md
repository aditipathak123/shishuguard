# ShishuGuard

Live Demo: https://shishuguard-ka06yii57-aditipathak123s-projects.vercel.app/

ShishuGuard is an AI-powered full-stack baby-care companion built for parents who want one calm place to manage daily routines, health records, memories, essentials, reminders, and intelligent parenting support.

The project is designed as more than a CRUD dashboard. It connects multiple real parenting workflows into one product experience: logging care activity, tracking growth and vaccines, organizing memories, monitoring baby essentials, receiving notifications, and asking an AI care assistant for context-aware help.

## Problem Statement

New parents often manage baby care through scattered notes, alarms, chats, photo galleries, medical papers, and memory apps. This creates three practical problems:

- Important care data gets fragmented across different places.
- Parents lose visibility into routines like feeding, sleep, vaccines, stock, and milestones.
- Helpful guidance is not connected to the baby data already being tracked.

ShishuGuard solves this by bringing routine tracking, medical organization, memory storage, inventory alerts, notifications, and AI support into one unified parenting workspace.

## What ShishuGuard Solves

- Centralizes baby-care data in one dashboard.
- Helps parents track daily feeding, sleep, growth, vaccines, and essentials.
- Keeps memories and media organized with private and community views.
- Uses notifications and low-stock signals to reduce mental load.
- Provides AI-powered support through ShishuGuard AI and CarePilot.
- Protects authenticated workflows with JWT-based access.

## Core Features

### Authentication

- Parent signup and login.
- JWT token based protected access.
- Baby profile onboarding after signup.
- Auth-aware routing with login prompts for protected pages.

### Dashboard

- Real-time greeting based on current time.
- Baby information overview.
- Daily stats and care-readiness indicators.
- Recent activity summaries.
- Quick action grid for common parenting workflows.
- CarePilot AI section for next-best care actions.

### Feeding Tracker

- Add and manage feeding logs.
- Track routine details for better daily visibility.
- Dashboard integration for feeding progress.

### Sleep Tracker

- Log sleep records and sleep patterns.
- View sleep tips, graphs, badges, and summaries.
- Supports bedtime routine visibility.

### Growth Tracking

- Growth chart and milestone tracking.
- Stores baby development related progress.
- Helps parents monitor long-term care trends.

### Medical Records

- Vaccine schedule management.
- Standard vaccine initialization.
- Vaccine status tracking.
- Important medical contacts section.
- Document/media support for medical records.

### Essentials Inventory

- Track baby supplies such as diapers, wipes, feeding items, medicine, toys, and cleaning supplies.
- Low-stock threshold alerts.
- Stock update actions.
- Category-based organization.

### Memories

- Upload and save baby memories.
- Private and public memory views.
- Like and comment support.
- Media upload integration.
- Community-style memory sharing.

### ShishuGuard AI

- Role-based AI chat experience.
- Supports parenting, pediatric-style guidance, and mother-focused support modes.
- Uses baby/profile context where available.
- Stores chat history per role.
- Returns clear errors when AI configuration is missing instead of fake hardcoded fallback replies.

### CarePilot Daily Agent

- Reads saved app signals such as feeding logs, sleep logs, vaccines, essentials, and memories.
- Generates next-best care actions through Gemini.
- Supports modes like daily, feeding, stock, and medical.
- Designed to turn tracked data into actionable parenting guidance.


CarePilot is the agentic workflow in ShishuGuard. It observes multiple app modules, summarizes the current care state, reasons about the next useful action, and routes parents toward the correct feature such as Feeding, Medical, Essentials, Sleep, Growth, or Memories. This makes it different from a normal chatbot because it does not only answer a question; it reviews app signals and suggests what the parent should do next.

### Notifications

- Notification context and bell UI.
- Read/unread count.
- Mark as read, mark all as read, delete notification.
- Reminder categories for feeding, sleep, vaccines, milestones, and essentials.

### Extra Parenting Tools

- Lullaby player.
- Toys and play section.
- Learning/resources page.
- FAQs.
- Speech recognition and text-to-speech helper components.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React, Tailwind CSS |
| Icons | Lucide React |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcryptjs |
| AI | Google Gemini API |
| Media | Cloudinary |
| Charts | Recharts |
| State | React Context, Zustand |
| Notifications | Sonner, React Toastify |
| Deployment Ready | Vercel Analytics and Speed Insights |

## High-Level Architecture

```text
User
  |
  v
Next.js App Router
  |
  |-- Public Pages
  |     |-- Home
  |     |-- Login
  |     |-- Signup
  |     |-- Resources
  |     |-- FAQs
  |
  |-- Protected Feature Pages
  |     |-- Dashboard
  |     |-- Feeding
  |     |-- Sleep
  |     |-- Growth
  |     |-- Medical
  |     |-- Essentials
  |     |-- Memories
  |     |-- ShishuGuard AI
  |
  |-- Context Providers
  |     |-- AuthContext
  |     |-- NotificationContext
  |     |-- AutoTaskContext
  |
  v
API Routes
  |
  |-- /api/auth/login
  |-- /api/auth/signup
  |-- /api/baby/create
  |-- /api/feeding
  |-- /api/sleep
  |-- /api/vaccine
  |-- /api/essentials
  |-- /api/memories
  |-- /api/notifications
  |-- /api/chat/ai
  |-- /api/chat/history
  |-- /api/chat/save
  |-- /api/agent/daily-care
  |
  v
Services and Integrations
  |
  |-- MongoDB / Mongoose Models
  |-- JWT Authentication
  |-- Gemini AI
  |-- Cloudinary Media Upload
```

## Data Models

The application uses Mongoose models to represent core parenting data:

- `User` - parent account data and authentication identity.
- `Baby` - baby profile and onboarding information.
- `Feeding` - feeding logs and routine details.
- `Sleep` - sleep records.
- `Vaccine` - vaccine schedule, status, notes, and documents.
- `Essentials` - inventory items, stock levels, categories, and thresholds.
- `Memory` - uploaded memories, visibility, likes, and comments.
- `Notification` - reminder and alert data.
- `Chat` - AI chat history by role.
- `Image` - uploaded image metadata.

## User Flow

```text
1. Parent visits ShishuGuard.
2. Parent signs up or logs in.
3. New user creates a baby profile.
4. User enters the dashboard.
5. Dashboard shows real-time greeting, baby info, stats, actions, and AI insights.
6. Parent logs feeding, sleep, growth, vaccines, essentials, and memories.
7. Notification system highlights important updates and reminders.
8. CarePilot reads app signals and suggests next-best actions.
9. ShishuGuard AI answers parenting questions with safe, concise guidance.
```

## API Flow

```text
Frontend Component
  |
  |-- sends request with JWT token
  v
Next.js API Route
  |
  |-- validates token
  |-- connects to MongoDB
  |-- performs model operation
  |-- optionally calls Gemini or Cloudinary
  v
JSON Response
  |
  v
UI updates state and renders latest data
```

## Folder Structure

```text
app/
  api/                  Server routes for auth, baby data, trackers, AI, media, notifications
  components/           Shared UI and feature components
  components/Dashboard/ Dashboard-specific cards, stats, actions, AI agent
  context/              Auth, notification, and auto-task providers
  models/               Mongoose schemas
  data/                 Static app data
  Login/                Login page
  Signup/               Signup page
  Dashboard/            Main care dashboard
  Feeding/              Feeding tracker
  Sleep/                Sleep tracker
  Growth/               Growth tracking
  Medical/              Vaccines and contacts
  Essentials/           Inventory tracker
  Memories/             Memory vault and community
  ShishuGuardAi/        AI chatbot experience

lib/
  auth.js               JWT authentication helpers
  connectDB.js          MongoDB connection
  cloudinary.js         Cloudinary upload helper
  chatService.js        Chat history helpers
  agent.js              Care agent logic helpers
  store/                Zustand stores

public/
  Static images, audio files, feature assets, and app media
```

## Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash-lite
GEMINI_MODEL_FALLBACKS=gemini-2.0-flash,gemini-1.5-flash-latest,gemini-1.5-pro-latest

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Depending on your local configuration, Cloudinary variable names may need to match the helper in `lib/cloudinary.js`.

`GEMINI_API` is optional during initial deployment. If it is missing or the Gemini quota is exhausted, ShishuGuard AI and CarePilot show controlled error messages while non-AI modules continue working normally. Add or update the key in the deployment platform environment variables, then redeploy to enable AI features.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```



```bash
npm run build
```

Run lint:

```bash
npx eslint .
```

## Future Scope

- Multi-baby support for families with more than one child.
- Pediatrician sharing mode for selected records.
- Calendar sync for vaccine and feeding reminders.
- Push notifications.
- Advanced growth analytics.
- Offline-first logging for low-connectivity situations.
- Role-based family access for parents, grandparents, or caregivers.
- More structured AI safety checks for urgent symptoms.

## Project Summary

ShishuGuard is a smart parenting platform that helps parents organize baby care with confidence. It combines trackers, reminders, records, memories, inventory, and AI support into one cohesive application. The goal is simple: reduce confusion, save time, and help parents make better daily care decisions from one trusted dashboard.
