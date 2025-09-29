import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Fake data cho trang About (Về chúng tôi)
  const aboutData = {
    success: true,
    data: {
      title: "Về Moonology Tarot",
      subtitle: "Khám phá sức mạnh của các lá bài Moonology",
      description: "Moonology Tarot là nơi kết nối giữa con người và vũ trụ thông qua năng lượng của mặt trăng và các lá bài tarot. Chúng tôi tin rằng mỗi pha của mặt trăng đều mang những thông điệp và năng lượng riêng biệt có thể giúp bạn hiểu rõ hơn về bản thân và cuộc sống.",
      mission: "Sứ mệnh của chúng tôi là mang đến những thông điệp từ vũ trụ một cách chân thực và dễ hiểu nhất, giúp mọi người kết nối với năng lượng của mặt trăng và tìm thấy sự cân bằng trong cuộc sống.",
      history: {
        foundedYear: 2020,
        story: "Moonology Tarot được thành lập vào năm 2020 bởi nhóm các nhà chiêm tinh học và chuyên gia tarot với mong muốn tạo ra một nền tảng trực tuyến giúp mọi người dễ dàng tiếp cận với nghệ thuật đọc bài tarot và năng lượng của mặt trăng. Sau nhiều năm nghiên cứu và phát triển, chúng tôi đã tạo ra bộ bài Moonology Tarot độc đáo kết hợp giữa chiêm tinh học và tarot truyền thống."
      },
      team: [
        {
          id: 1,
          name: "Nguyễn Minh Anh",
          position: "Nhà sáng lập & Chuyên gia Tarot",
          bio: "Với hơn 15 năm kinh nghiệm trong lĩnh vực chiêm tinh học và tarot, Minh Anh đã nghiên cứu sâu về mối liên hệ giữa các pha của mặt trăng và ảnh hưởng của chúng đến con người.",
          avatar: "/images/team/minh-anh.jpg"
        },
        {
          id: 2,
          name: "Trần Thanh Tùng",
          position: "Chuyên gia Chiêm tinh học",
          bio: "Thanh Tùng tốt nghiệp chuyên ngành Thiên văn học và đã dành hơn 10 năm để nghiên cứu về ảnh hưởng của các thiên thể lên cuộc sống con người, đặc biệt là mặt trăng.",
          avatar: "/images/team/thanh-tung.jpg"
        },
        {
          id: 3,
          name: "Lê Thị Hương",
          position: "Nhà tâm linh học & Cố vấn",
          bio: "Hương là người có khả năng nhạy cảm với năng lượng tâm linh và đã giúp phát triển các thông điệp sâu sắc cho bộ bài Moonology Tarot.",
          avatar: "/images/team/le-huong.jpg"
        }
      ],
      features: [
        {
          id: 1,
          title: "Đọc bài Tarot",
          description: "Chúng tôi cung cấp dịch vụ đọc bài tarot trực tuyến với độ chính xác cao, giúp bạn hiểu rõ hơn về tình hình hiện tại và tương lai."
        },
        {
          id: 2,
          title: "Phân tích Chiêm tinh",
          description: "Dựa trên vị trí của mặt trăng và các hành tinh khác, chúng tôi cung cấp phân tích chiêm tinh chi tiết cho từng cá nhân."
        },
        {
          id: 3,
          title: "Tư vấn Tâm linh",
          description: "Đội ngũ chuyên gia tâm linh của chúng tôi luôn sẵn sàng lắng nghe và tư vấn cho bạn về các vấn đề trong cuộc sống."
        }
      ]
    }
  };

  return NextResponse.json(aboutData);
}
