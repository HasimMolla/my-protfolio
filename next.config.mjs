/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // All imagery is served from /public now, so no remote patterns are needed.
  // (`images.domains` was removed in Next 16 in favour of `remotePatterns`.)
};

export default nextConfig;
