# Blog-app-and-deployment

# Tech Stack

Frontend: React, TypeScript, TailwindCSS, TipTap

Backend: Hono (Cloudflare Workers), TypeScript

Database: PostgreSQL, Prisma Accelerate ORM

Security: Zod (schema validation), DOMPurify (XSS protection)


# Prerequisites

Node.js (>=18)

PostgreSQL (local or cloud instance)

npm or yarn

# Setup

# Clone the repo
git clone (https://github.com/Kiran-0205/Blog-app-and-deployment.git)

cd Blog-app-and-deployment

# Install dependencies
cd fronted -> npm i
cd hono-app -> npm i

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start the dev server
npm run dev 
