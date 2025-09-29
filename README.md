# Moonology Tarot Next.js

Đây là phiên bản Next.js của ứng dụng Moonology Tarot Reading, được chuyển đổi từ giao diện HTML gốc.

## Cấu trúc dự án

Dự án được tổ chức theo cấu trúc Next.js với App Router:

```
moonology-nextjs/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── cards/
│   │   │   ├── chat/
│   │   │   ├── reading/
│   │   │   └── suggestions/
│   │   ├── cards/
│   │   ├── reading/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── cards/
│   │   ├── layout/
│   │   └── ui/
│   ├── context/
│   ├── styles/
│   ├── types/
│   └── utils/
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Tính năng

- Hiển thị danh sách lá bài Tarot Moonology
- Chọn bài thủ công hoặc rút bài ngẫu nhiên
- Hiển thị kết quả giải bài
- Tương tác với AI để đặt câu hỏi thêm về kết quả
- Giao diện người dùng huyền bí với hiệu ứng vũ trụ

## Công nghệ sử dụng

- Next.js 14 với App Router
- TypeScript
- Tailwind CSS
- Font Awesome Icons
- Context API cho quản lý state

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd moonology-nextjs
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy dự án:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập `http://localhost:3000`

## Kết nối với Backend

Dự án này kết nối với backend API Moonology thông qua các API routes. Backend API cần được chạy trên `http://localhost:8000`.

Các API endpoints:
- `/api/cards` - Lấy danh sách lá bài
- `/api/reading` - Gửi các lá bài đã chọn và nhận kết quả giải bài
- `/api/chat` - Gửi tin nhắn chat và nhận phản hồi từ AI
- `/api/suggestions` - Lấy các gợi ý câu hỏi

## Xây dựng và triển khai

Để xây dựng dự án cho production:

```bash
npm run build
```

Để chạy phiên bản production:

```bash
npm run start
```
