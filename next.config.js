/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ec2-3-89-255-128.compute-1.amazonaws.com'],
    unoptimized: false, // Bật tối ưu hóa hình ảnh
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: "8000",
        pathname: '/source/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Các kích thước thiết bị cho responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Các kích thước hình ảnh cho responsive images
  },
    
  // Cấu hình tối ưu hóa
  onDemandEntries: {
    // Tăng thời gian giữ trang trong bộ nhớ cache
    maxInactiveAge: 60 * 1000, // 1 phút
    pagesBufferLength: 3,
  },
  
  // Tối ưu bundle size
  swcMinify: true,
  
  // Tối ưu hóa production build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bật tính năng compression
  compress: true,
  
  // Cấu hình responsive
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  },
}

module.exports = nextConfig
