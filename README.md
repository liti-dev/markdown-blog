# Markdown Blog

A fast, modern blog built with SvelteKit and deployed on Vercel. Features
markdown-based content with syntax highlighting, categorization, and optimized
performance.

## Features

- 📝 Markdown-based blog posts with frontmatter
- 🎨 Syntax highlighting with Shiki
- 🏷️ Category-based post organization
- 📱 Responsive design with Open Props
- ⚡ Edge Runtime for fast global performance
- 🔍 SEO-optimized with automatic sitemap generation
- 📊 Vercel Analytics and Speed Insights integration

## Tech Stack

- **Framework**: SvelteKit 2
- **Styling**: Open Props + CSS
- **Markdown**: MDsveX with Shiki highlighting
- **Deployment**: Vercel (Edge Runtime)
- **Typography**: Atkinson Hyperlegible + JetBrains Mono

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Writing Posts

Create markdown files in `src/posts/` with frontmatter:

```markdown
---
title: 'Your Post Title'
date: '2024-01-01'
categories: ['tech', 'web']
published: true
description: 'Brief description'
---

Your content here...
```

## Deployment

Optimized for Vercel with automatic deployments from GitHub. Edge Runtime
ensures fast cold starts globally.
