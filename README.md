# EduForge — AI-Powered Lesson Planner

EduForge is a full-stack, responsive web application designed to help educators generate comprehensive, structured, and customized lesson plans in seconds. 

By integrating advanced generative AI via the Google Gemini API, EduForge transforms the complex task of drafting structured lesson plans into an intuitive, multi-step workflow. The project showcases modern software architecture, robust user authentication, database persistence, and clean frontend design.

---

## Key Features and Technical Benefits

*   **High Performance:** Generates complete lesson plans in under 30 seconds through optimized API integration.
*   **Dynamic Customization:** Adapts content generation dynamically to varying inputs such as subject, grade level, and duration.
*   **Structured Outline Generation:** Automatically schedules timed class activities and discussions.
*   **Persistent Storage:** Features a secure educator dashboard backed by PostgreSQL for easy planning management and reuse.

---

## Application Workflow

1. **Authentication:** Secure user signup and sign-in managed via Clerk.
2. **Form Entry:** Access the wizard form via the navigation bar to start creating a new lesson plan.
3. **Wizard Configuration (5 Steps):** Form collection of metadata including Topic, Subtopic, Duration, Student Level, and Learning Objective.
4. **AI Generation:** Dispatches structured API requests to the Google Gemini AI engine.
5. **Display & Retrieval:** Renders timed lesson layouts dynamically and saves them in the database for access via the user's dashboard.

---

## Tech Stack

*   **Frontend:** Next.js 16 (React 19), Tailwind CSS 4
*   **Database & ORM:** PostgreSQL & Prisma ORM
*   **Authentication:** Clerk
*   **AI Engine:** Google Gemini API (`@google/generative-ai`)

---

## Screenshots and UI Preview

<table width="100%">
  <tr>
    <td align="center">
      <p><b>Landing Page (Header)</b></p>
      <img src="./screenshot/home_1.png" alt="Home Page Header" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Landing Page (Features)</b></p>
      <img src="./screenshot/home_2.png" alt="Home Page Features" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Landing Page (Reviews)</b></p>
      <img src="./screenshot/home_3.png" alt="Home Page Reviews" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Lesson Plan Creator Wizard</b></p>
      <img src="./screenshot/create_form.png" alt="Create Form Wizard" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Educator Dashboard</b></p>
      <img src="./screenshot/dashboard.png" alt="Dashboard" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Tiered Pricing Plans</b></p>
      <img src="./screenshot/pricing_page.png" alt="Pricing Page" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Detailed Lesson View (Part 1)</b></p>
      <img src="./screenshot/view_of_individual_lesson_plan.png" alt="Lesson Plan View 1" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p><b>Detailed Lesson View (Part 2)</b></p>
      <img src="./screenshot/view_of_individual_lesson_plan_2.png" alt="Lesson Plan View 2" style="max-width:100%; border-radius:8px;"/>
    </td>
  </tr>
</table>

---

## How to Set Up Locally

### 1. Clone the Project & Install Dependencies
```bash
git clone https://github.com/Subhradeep-Sikder/EduForge.git
cd EduForge
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project's root directory and define the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# PostgreSQL Database Connection
DATABASE_URL=your_postgresql_database_url

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
```
Get keys: [Gemini API Key](https://aistudio.google.com/app/apikey) | [Prisma Console (Database)](https://console.prisma.io) | [Clerk Dashboard (Auth)](https://clerk.com)

### 3. Setup Database Schema & Run
Sync the database tables and start the Next.js development server:
```bash
npx prisma migrate dev --name init
npm run dev
```
Navigate to `http://localhost:3000` in your web browser.



---

## Future Roadmap

1. **Stripe Integration:** Enable subscription payment processing (Prisma schema already includes `stripe_customer_id`).
2. **Export Capabilities:** Build document export options for PDF, Word, and Markdown formats.
3. **Interactive Features:** Add features to auto-generate quizzes, homework assignments, and worksheets.
4. **Collaboration Tools:** Support folder sharing and public read-only URLs to share plans with peers.

---

<p align="center">Built by Subhradeep Sikder</p>
