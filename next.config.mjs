/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
      compiler: "modern",
      silenceDeprecations: ["legacy-js-api"],
    },
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
      unoptimized: true,
    },
};

export default nextConfig;