/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/wicare',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
