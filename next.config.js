/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  redirects: () => [
    {
      source: "/logout",
      destination: "/signout",
      permanent: true,
    },
  ],
};

module.exports = withAxiom(nextConfig);
