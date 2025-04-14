/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
      compiler: "modern",
      silenceDeprecations: ["legacy-js-api"],
    },
    reactStrictMode: true,
};

export default nextConfig;