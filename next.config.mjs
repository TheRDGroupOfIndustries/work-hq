/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: "https",
        hostname: "5p1n73rhe6.ufs.sh",
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com",'utfs.io', ],
//   },
// };

// export default nextConfig;
