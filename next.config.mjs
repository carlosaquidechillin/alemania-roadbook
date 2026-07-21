import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    // Que el nuevo service worker se active y tome el control sin esperar,
    // para que las actualizaciones lleguen al móvil sin reinstalar la PWA.
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        // Cache remote cover/stop images so the guide works offline after first load
        urlPattern: ({ url }) =>
          url.hostname === "images.unsplash.com" ||
          url.hostname === "upload.wikimedia.org",
        handler: "CacheFirst",
        options: {
          cacheName: "guide-images",
          expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 60 },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default withPWA(nextConfig);
