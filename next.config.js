/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // Để hình ảnh không bị tối ưu hóa, giữ nguyên chất lượng
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
    
  // Tắt cảnh báo hydration
  onDemandEntries: {
    // Tăng thời gian giữ trang trong bộ nhớ cache
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  
  // Cấu hình responsive
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  },
  
  // Cấu hình headers để giải quyết vấn đề "Provisional headers are shown"
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig