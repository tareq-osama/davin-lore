# DAVINELORÉ Storefront

<div align="center">
  <img alt="DAVINELORÉ logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
</div>

## About

**DAVINELORÉ Storefront** - A modern, performant e-commerce storefront built with Next.js 15 and powered by Medusa.

## Features

Combine Medusa's modules for your commerce backend with the newest Next.js 15 features for a performant storefront.

## Contributing

<a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs welcome!" />
</a>

## Community

<a href="https://twitter.com/intent/follow?screen_name=medusajs">
  <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
</a>

## Getting Started

### Prerequisites

To use the DAVINELORÉ Storefront, you should have a Medusa server running locally on port 9000.

### Quick Start

```bash
npx create-medusa-app@latest
```

Check out [create-medusa-app docs](https://docs.medusajs.com/learn/installation) for more details and troubleshooting.

## Tech Stack

The DAVINELORÉ Storefront is built with:

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Medusa](https://medusajs.com/) - E-commerce backend

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key_here
MEDUSA_BACKEND_URL=http://localhost:9000
```

## Integrations

You'll also need to setup the integrations in your Medusa server. See the [Medusa documentation](https://docs.medusajs.com) for more information on how to configure [Stripe](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe#main).

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentation](https://docs.medusajs.com/)
