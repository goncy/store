/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      static: 900,
      dynamic: 0,
    },
  },
};
