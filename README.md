# Weather Engine ☁️

A full-stack weather tracking application built with **Next.js 15**, **Prisma**, and **PostgreSQL**.

## 🚀 Features
- **Real-time API:** Fetches live weather data from OpenWeatherMap.
- **Persistent Storage:** Saves searched cities to a PostgreSQL database.
- **Server Actions:** Uses Next.js Server Actions for secure API calls and DB mutations.
- **Dynamic UI:** Instant updates using `revalidatePath` without manual page refreshes.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase/Local)
- **ORM:** Prisma
- **Validation:** Zod (for API safety)
- **Styling:** Tailwind CSS

## 📋 Setup Instructions
1. **Environment Variables:**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="your_postgresql_url"
   OPENWEATHER_API_KEY="your_api_key"

   Install Dependencies:

Bash
npm install
Database Setup:

Bash
npx prisma generate
npx prisma db push
Run Development Server:

Bash
npm run dev
📂 Project Structure
/app/page.tsx: Main UI and Search logic.

/app/actions.ts: Server-side API fetching and Prisma logic.

/prisma/schema.prisma: Database model for Saved Cities.