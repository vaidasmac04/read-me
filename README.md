# read-me

A personal archive and portfolio site built with React + TypeScript + Vite.

## Overview

This project is a lightweight one-page archive experience with hash-based routing.

The app reads data from local JSON files under the public folder and renders sorted collections using reusable card components.

## Tech stack

- React 19
- TypeScript
- Vite
- CSS Modules-style component styling in plain CSS

## Project structure

```text
src/
  components/
  data/
  hooks/
  pages/
  utils/
public/
  <data>*json
```

## Getting started

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This project includes a GitHub Pages deploy script:

```bash
npm run deploy
```