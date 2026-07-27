const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `next dev --turbo` and `next build` emit incompatible artifacts. Sharing one
  // directory produces "missing required error components" / "[turbopack]_runtime.js
  // not found", so each mode gets its own.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

module.exports = withNextIntl(nextConfig);
