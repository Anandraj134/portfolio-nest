/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 1. Polyfills for pdfjs-dist
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // 2. Ensure .mjs files are handled correctly
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
  // Optional: Sometimes SWC minification causes issues with PDF.js
  // swcMinify: false, 
};

export default nextConfig;
