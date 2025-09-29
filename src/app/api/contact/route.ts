import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fake data cho thông tin liên hệ
const contactInfo = {
  success: true,
  data: {
    address: "Số 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    email: "info@moonology.vn",
    phone: "+84 28 1234 5678",
    workingHours: "Thứ 2 - Thứ 6: 9:00 - 18:00, Thứ 7: 9:00 - 12:00",
    socialMedia: {
      facebook: "https://facebook.com/moonology",
      instagram: "https://instagram.com/moonology_tarot",
      youtube: "https://youtube.com/moonologytarot"
    },
    mapLocation: {
      lat: 10.773286,
      lng: 106.703396,
      zoom: 15
    },
    team: [
      {
        id: 1,
        name: "Nguyễn Minh Anh",
        position: "Nhà sáng lập & Chuyên gia Tarot",
        email: "minhanh@moonology.vn",
        phone: "+84 90 1234 567",
        avatar: "/images/team/minh-anh.jpg"
      },
      {
        id: 2,
        name: "Trần Thanh Tùng",
        position: "Chuyên gia Chiêm tinh học",
        email: "thanhtung@moonology.vn",
        phone: "+84 90 2345 678",
        avatar: "/images/team/thanh-tung.jpg"
      },
      {
        id: 3,
        name: "Lê Thị Hương",
        position: "Nhà tâm linh học & Cố vấn",
        email: "lehuong@moonology.vn",
        phone: "+84 90 3456 789",
        avatar: "/images/team/le-huong.jpg"
      }
    ],
    faq: [
      {
        question: "Làm thế nào để đặt lịch đọc bài Tarot trực tiếp?",
        answer: "Bạn có thể đặt lịch đọc bài Tarot trực tiếp bằng cách gọi điện theo số +84 28 1234 5678 hoặc gửi email đến info@moonology.vn. Chúng tôi sẽ liên hệ lại để xác nhận lịch hẹn trong vòng 24 giờ."
      },
      {
        question: "Moonology có cung cấp dịch vụ đọc bài trực tuyến không?",
        answer: "Có, chúng tôi cung cấp dịch vụ đọc bài Tarot trực tuyến qua Zoom, Google Meet hoặc các nền tảng video call khác. Bạn có thể đăng ký dịch vụ này thông qua trang web của chúng tôi hoặc liên hệ trực tiếp qua email."
      },
      {
        question: "Tôi có thể học Tarot và Chiêm tinh học tại Moonology không?",
        answer: "Chúng tôi thường xuyên tổ chức các khóa học về Tarot và Chiêm tinh học cho cả người mới bắt đầu và người đã có kinh nghiệm. Vui lòng theo dõi trang Blog của chúng tôi hoặc đăng ký nhận bản tin để cập nhật thông tin về các khóa học sắp tới."
      }
    ]
  }
};

export async function GET(request: NextRequest) {
  return NextResponse.json(contactInfo);
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Trường ${field} là bắt buộc` },
          { status: 400 }
        );
      }
    }
    
    // Fake successful submission
    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
      data: {
        id: Math.floor(Math.random() * 1000) + 1,
        submittedAt: new Date().toISOString(),
        ...body
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi gửi biểu mẫu'
      },
      { status: 500 }
    );
  }
}
