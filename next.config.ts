import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.43.12","192.168.43.131","172.20.10.2", "localhost:3000"],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "cpdwazwtvjpogpwizqis.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/room-pictures/**",
      },
    ],
  },
};

export default nextConfig;
