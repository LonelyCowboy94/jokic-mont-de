import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
       {
        protocol: 'https',
        hostname: 'jdmw.de',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // optional: dodaj path ako želiš ograničiti na određeni folder
        // pathname: "/tvoj-account-name/**"
      },
    ],
  },
};

export default nextConfig;
