/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    
  },
  publicRuntimeConfig: {
    apiURL: process.env.API_URL
  }
}

module.exports = nextConfig
