import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React'in sıkı modunu etkinleştirir
  images: {
    domains: ["example.com", "another-domain.com"], // Harici görüntü URL'lerini destekler
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript derleme hatalarını kontrol eder
  },
  env: {
    API_URL: "https://api.example.com", // Çevresel değişkenler
  },
};

export default nextConfig;
