# TaskFlow — Task Manager Application

A full-stack, monorepo Task Manager application built with **Next.js**, **Supabase**, and **Turborepo**.

## Project Structure

```
taskflow/
├── apps/
│   └── web/          # Next.js frontend application
├── packages/
│   └── common-types/ # Shared TypeScript types
├── .github/
│   └── workflows/
│       └── ci.yml    # CI pipeline for lint & type-check
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Package Manager**: pnpm (Monorepo with Turborepo)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **CI/CD**: GitHub Actions + Vercel

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start the development server       |
| `pnpm build`       | Build all packages and apps        |
| `pnpm lint`        | Run ESLint across the monorepo     |
| `pnpm check-types` | Run TypeScript type checking       |

## CI/CD Pipeline

This project uses **GitHub Actions** for Continuous Integration. On every pull request targeting `main`, the pipeline automatically:

1. Checks out the code
2. Sets up Node.js and enables pnpm
3. Installs all dependencies
4. Runs lint checks (`pnpm lint`)
5. Runs type checks (`pnpm check-types`)

## Deployment

The application is deployed on **Vercel** with automatic deployments on push to `main`.

### Environment Variables

The following environment variables must be set in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anonymous key

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vercel Deployment](https://vercel.com/docs)
