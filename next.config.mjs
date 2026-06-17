/** @type {import('next').NextConfig} */
const nextConfig = {
  // [ПРОБЕЖАТЬСЯ] Стандартная конфигурация Next.js
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
