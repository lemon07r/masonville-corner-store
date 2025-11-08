# Masonville Corner Store

Marketing landing site for Masonville Corner Store - a family-run convenience hub in Shelburne, Ontario offering hot meals, fresh-cut fries, poutine, fuel, and everyday essentials.

Built with [Eleventy](https://www.11ty.dev/) and [Vite](https://vitejs.dev/), powered by [Bun](https://bun.sh/).

## Features

- **Modern Static Site Generator**: Built with Eleventy for fast, SEO-friendly pages
- **Lightning-fast Development**: Vite integration for instant hot module replacement
- **Responsive Design**: Mobile-first approach with modern CSS
- **Optimized Images**: Automatic image optimization with multiple formats (AVIF, WebP, JPEG)
- **TypeScript Support**: Full TypeScript support throughout the project
- **Structured Data**: Schema.org markup for enhanced search engine visibility
- **End-to-End Testing**: Playwright integration for reliable automated testing

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)

### Installing Bun

```bash
# macOS, Linux, and WSL
curl -fsSL https://bun.sh/install | bash

# Or using npm
npm install -g bun
```

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
# Install dependencies
bun install

# Install Playwright browsers (for testing)
bun run playwright:install
```

### Development

Start the development server with hot reload:

```bash
bun run dev
```

The site will be available at `http://localhost:8080` (default Eleventy port).

### Building for Production

Build the optimized production site:

```bash
bun run build
```

The built site will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
bun run preview
```

The preview will be available at `http://localhost:4173`.

## Available Scripts

- `bun run dev` - Start development server with live reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint:css` - Lint CSS files with Stylelint
- `bun run test` - Run Playwright tests
- `bun run test:e2e` - Build and run end-to-end tests
- `bun run playwright:install` - Install Playwright browsers

## Project Structure

```
masonville-corner-store/
├── src/
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── data/            # Global data files (JSON)
│   │   ├── store.json   # Store information and metadata
│   │   ├── menu.json    # Menu items and pricing
│   │   └── reviews.json # Customer reviews
│   ├── includes/        # Reusable template partials
│   ├── layouts/         # Page layouts
│   ├── pages/           # Individual pages
│   ├── scripts/         # JavaScript/TypeScript files
│   ├── styles/          # CSS files
│   ├── index.njk        # Homepage template
│   ├── manifest.webmanifest # PWA manifest
│   └── robots.txt       # Search engine crawler instructions
├── tests/               # Playwright test files
├── dist/                # Built site (generated)
├── eleventy.config.ts   # Eleventy configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── postcss.config.cjs   # PostCSS configuration
├── stylelint.config.cjs # Stylelint configuration
├── playwright.config.ts # Playwright configuration
└── package.json         # Project dependencies and scripts
```

## Configuration

### Eleventy

The Eleventy configuration (`eleventy.config.ts`) includes:

- Vite plugin for modern asset bundling
- Custom image shortcode with automatic optimization
- Markdown-it with anchor links
- Custom filters for structured data
- Path aliases for cleaner imports

### Vite

The Vite configuration (`vite.config.ts`) provides:

- Multi-page application setup
- Path aliases matching Eleventy
- Optimized asset bundling
- CSS source maps in development

### TypeScript

TypeScript is configured with Bun-optimized settings:

- ESNext module format
- Bundler module resolution
- Path aliases for `@images`, `@styles`, and `@scripts`
- Strict type checking enabled

## Customization

### Store Information

Edit `src/data/store.json` to update:

- Store name, contact information, and address
- Opening hours
- Social media links
- Highlights and call-to-action buttons

### Menu Items

Update `src/data/menu.json` to modify menu offerings and pricing.

### Customer Reviews

Manage customer reviews in `src/data/reviews.json`.

### Styling

CSS files are located in `src/styles/`. The project uses:

- PostCSS for CSS processing
- Autoprefixer for browser compatibility
- CSS Nano for minification
- PostCSS Preset Env for modern CSS features

### Images

Images are automatically optimized when using the `image` shortcode:

```njk
{% image "photo.jpg", "Description of image", "100vw" %}
```

This generates multiple formats (AVIF, WebP, JPEG) and sizes for optimal performance.

## Testing

The project uses Playwright for end-to-end testing.

### Running Tests

```bash
# Run tests in headless mode
bun run test

# Build and run tests
bun run test:e2e

# Run tests with UI
bunx playwright test --ui

# Run tests in debug mode
bunx playwright test --debug
```

### Writing Tests

Test files are located in the `tests/` directory. See `playwright.config.ts` for configuration.

## Deployment

The project generates a static site in the `dist/` directory that can be deployed to any static hosting service:

- **Netlify**: Drop the `dist/` folder or connect your Git repository
- **Vercel**: Import project and set build command to `bun run build`
- **Cloudflare Pages**: Set build command to `bun run build` and output directory to `dist`
- **GitHub Pages**: Use GitHub Actions to build and deploy

### Example: Netlify Deployment

1. Build the site: `bun run build`
2. Deploy the `dist/` directory to Netlify
3. Or use `netlify.toml`:

```toml
[build]
  command = "bun run build"
  publish = "dist"
```

## Technology Stack

- **[Eleventy](https://www.11ty.dev/)** - Static site generator
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Bun](https://bun.sh/)** - JavaScript runtime and package manager
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Stylelint](https://stylelint.io/)** - CSS linting
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Templating engine

## Performance

The site is optimized for performance with:

- Responsive images in modern formats (AVIF, WebP)
- Minimal JavaScript
- CSS minification and optimization
- Lazy-loading images
- Optimized build output with code splitting

## Browser Support

The site supports all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC

## Contributing

This is a private project for Masonville Corner Store. For questions or updates, please contact the site administrator.

## Contact

**Masonville Corner Store**
517003 Dufferin County Rd 124
Shelburne, ON L0N 1S7
Canada

Phone: +1 519-925-0522
Email: hello@masonvillecorner.store

Website: [https://masonvillecorner.store](https://masonvillecorner.store)
