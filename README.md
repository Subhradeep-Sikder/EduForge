# 📚 EduForge - AI-Powered Lesson Planner

## 🎯 What is EduForge?

EduForge is a web app that helps teachers create lesson plans super fast using AI. Instead of spending hours planning lessons, you just tell it what topic and subject you want, and it generates a full lesson plan with sections, duration, and everything. It's basically a time-saver for busy teachers.

The whole idea came from noticing how much time teachers spend just planning lessons. EduForge takes that boring work and lets AI handle the heavy lifting so you can focus on actual teaching.

## ✨ Key Features

- 🤖 **AI-Generated Lesson Plans** - Just fill out a simple form (topic, duration, student level, objectives) and the AI creates a structured lesson plan for you
- 📖 **Multiple Subjects** - Covers Math, Science, History, Literature, and Art with tons of subtopics for each
- 💾 **Save & Access Later** - All your generated lesson plans are saved to your dashboard so you can come back to them anytime
- ✏️ **Customizable Content** - You can specify student level, lesson duration, and learning objectives to tailor the lesson to your needs
- 🌙 **Dark Mode Support** - Because who doesn't like dark mode these days?
- 🔐 **Easy Authentication** - Sign up with your email using Clerk, no complicated setup needed

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion for animations
- **Backend:** Node.js with Next.js API routes
- **Database:** PostgreSQL with Prisma ORM
- **AI:** Google Generative AI (Gemini) for generating lesson plans
- **Authentication:** Clerk for user management
- **UI Components:** Shadcn UI + Lucide React icons
- **Forms & Validation:** Zod for schema validation

## 📸 Screenshots & UI Preview

### 🏠 Home Page - Landing Page
![Home Page 1](./screenshot/home_1.png)
![Home Page 2](./screenshot/home_2.png)
![Home Page 3](./screenshot/home_3.png)

### ✍️ Create Lesson Plan Form - Multi-Step Form
![Create Form](./screenshot/create_form.png)

### 📊 Dashboard - View All Your Lesson Plans
![Dashboard](./screenshot/dashboard.png)

### 💰 Pricing Page
![Pricing Page](./screenshot/pricing_page.png)

### 📖 Individual Lesson Plan View
![Lesson Plan View 1](./screenshot/view_of_individual_lesson_plan.png)
![Lesson Plan View 2](./screenshot/view_of_individual_lesson_plan_2.png)

## 🚀 How to Set Up Locally

### 📋 Prerequisites
You'll need Node.js (v18+) and npm/yarn installed. Also make sure you have PostgreSQL running locally or have a connection string ready.

### 1️⃣ Clone and Install
```bash
git clone https://github.com/Subhradeep-Sikder/EduForge.git
cd EduForge
npm install
```

### 2️⃣ Set Up Environment Variables
Create a `.env.local` file in the root and add these (get them from the services):

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Database
DATABASE_URL=

# AI
GEMINI_API_KEY=
```

To get these keys:
- **Clerk**: Sign up at [clerk.com](https://clerk.com), create an application, grab your keys from the dashboard
- **Gemini API**: Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a new API key
- **PostgreSQL**: Either install locally or use a service like Railway, Render, or Supabase

### 3️⃣ Set Up Database
```bash
npx prisma migrate dev --name init
```

This creates your database tables based on the schema.

### 4️⃣ Run the Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and you're good to go. Sign up, create a lesson plan, and watch it work.

### 🏭 Building for Production
```bash
npm run build
npm start
```

## 🔄 How It Works (Really Quick Version)

1. User signs up with Clerk auth
2. Creates an account in the database
3. Goes to `/create` page and fills out the lesson plan form (5 steps)
4. Hits "Generate" button
5. Form data goes to our backend which sends it to Gemini AI
6. AI generates a full lesson plan with multiple sections
7. Plan gets saved to PostgreSQL database
8. User can view it on their dashboard and open individual plans to see full content

## 🎯 What's Coming Next

**💳 Stripe Integration for Subscriptions** - Right now everything is free. Planning to add:
- Usage limits and quotas based on subscription level

The code for this is partially there (you can see the `stripe_customer_id` field in the User model), but the full payment flow and subscription logic still needs to be wired up.

## 📁 Project Structure

```
EduForge/
├── app/
│   ├── (auth)/              # Auth pages (sign in, sign up)
│   ├── create/              # Lesson plan creation form
│   ├── dashboard/           # User's saved lesson plans
│   ├── plan/[id]/          # Individual lesson plan view
│   ├── pricing/            # Pricing page
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── common/             # Navbar, footer, etc.
│   ├── LessonPlanForm.tsx  # Multi-step form component
│   ├── Dashboard.tsx       # Shows user's saved plans
│   └── Plan.tsx            # Shows full lesson plan details
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── animations.ts       # Framer motion variants
├── prisma/
│   └── schema.prisma       # Database schema
└── constants.ts            # Topics, subtopics, durations, etc.
```

## 🗄️ Database Schema

We have three main tables:
- **👤 Users** - Stores user info and Clerk ID
- **📝 LessonPlans** - The actual lesson plans with title, duration, subject, etc.
- **📄 Sections** - Content sections within each lesson plan

Pretty simple structure, nothing too crazy.



## 📝 Notes

- The AI-generated lesson plans depend on Gemini API response time. Sometimes it takes a few seconds.
- Authentication is required for most features. You can only view your own lesson plans.
- All data is stored securely in PostgreSQL

---

Built with ❤️.
