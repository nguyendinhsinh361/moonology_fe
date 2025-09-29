import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Lấy tham số query từ URL (nếu có)
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  
  // Fake data cho trang Blog
  const allPosts = [
    {
      id: 1,
      title: "Hiểu về các pha của mặt trăng và ý nghĩa trong Tarot",
      slug: "hieu-ve-cac-pha-cua-mat-trang",
      excerpt: "Mặt trăng trải qua 8 pha chính trong một chu kỳ, mỗi pha đều mang những năng lượng và ý nghĩa riêng biệt trong việc đọc bài Tarot.",
      content: "Mặt trăng là thiên thể gần Trái Đất nhất và có ảnh hưởng mạnh mẽ đến con người từ hàng nghìn năm qua. Trong Tarot, mặt trăng không chỉ là một lá bài mà còn là một biểu tượng quan trọng liên quan đến trực giác, cảm xúc và tiềm thức của chúng ta.\n\nTrong một chu kỳ trăng đầy đủ, mặt trăng trải qua 8 pha chính: Trăng non, Trăng khuyết đầu tháng, Trăng bán nguyệt đầu tháng, Trăng khuyết cuối tháng, Trăng tròn, Trăng khuyết đầu cuối tháng, Trăng bán nguyệt cuối tháng và Trăng khuyết cuối tháng.\n\nMỗi pha trăng mang một năng lượng riêng biệt và có thể ảnh hưởng đến kết quả đọc bài Tarot:\n\n1. **Trăng non**: Thời điểm lý tưởng để đặt ra mục tiêu mới và bắt đầu các dự án. Khi đọc bài trong pha này, bạn có thể nhận được những thông điệp về khởi đầu mới và tiềm năng chưa được khai phá.\n\n2. **Trăng tròn**: Đây là lúc năng lượng mặt trăng mạnh nhất, giúp tăng cường trực giác và khả năng nhìn nhận vấn đề một cách rõ ràng. Đọc bài trong pha trăng tròn thường mang lại những thông điệp sâu sắc và rõ ràng hơn.\n\n3. **Trăng khuyết cuối tháng**: Đây là thời điểm thích hợp để buông bỏ những điều không còn phù hợp. Khi đọc bài trong pha này, bạn có thể nhận được hướng dẫn về việc nên từ bỏ điều gì để tiến về phía trước.\n\nHiểu về các pha của mặt trăng và tác động của chúng đến việc đọc bài Tarot sẽ giúp bạn có được những thông điệp chính xác và sâu sắc hơn từ các lá bài.",
      author: {
        id: 1,
        name: "Nguyễn Minh Anh",
        avatar: "/images/team/minh-anh.jpg"
      },
      category: "Tarot & Mặt trăng",
      tags: ["mặt trăng", "tarot", "chiêm tinh học"],
      image: "/images/blog/moon-phases.jpg",
      publishedAt: "2023-06-15T08:00:00Z",
      readTime: 8
    },
    {
      id: 2,
      title: "5 lá bài Tarot mạnh mẽ nhất trong bộ bài Moonology",
      slug: "5-la-bai-tarot-manh-me-nhat",
      excerpt: "Khám phá 5 lá bài có năng lượng mạnh mẽ nhất trong bộ bài Moonology Tarot và ý nghĩa của chúng trong một trải bài.",
      content: "Bộ bài Moonology Tarot là sự kết hợp độc đáo giữa năng lượng của mặt trăng và các biểu tượng truyền thống của Tarot. Trong bộ bài này, có 5 lá bài được coi là mạnh mẽ nhất về mặt năng lượng và ý nghĩa:\n\n1. **Trăng Tròn**: Lá bài này tượng trưng cho sự viên mãn, hoàn thành và thành công. Khi xuất hiện trong một trải bài, nó thường báo hiệu một chu kỳ đang đạt đến đỉnh điểm hoặc một dự án sắp được hoàn thành với kết quả tốt đẹp.\n\n2. **Trăng Non trong Bạch Dương**: Đây là lá bài của những khởi đầu mới đầy năng lượng và nhiệt huyết. Nó mang năng lượng của lửa và sự táo bạo, thúc đẩy người hỏi bài dám nghĩ dám làm và bắt đầu những hành trình mới.\n\n3. **Trăng Tròn trong Thiên Yết**: Lá bài này liên quan đến sự chuyển hóa sâu sắc và mạnh mẽ. Nó có thể báo hiệu một thời kỳ thay đổi lớn, đôi khi đau đớn nhưng cần thiết để tái sinh và phát triển.\n\n4. **Cực Bắc**: Tượng trưng cho định mệnh và con đường tương lai. Khi lá bài này xuất hiện, nó thường gợi ý rằng người hỏi bài đang đi đúng hướng với số phận của mình và nên tiếp tục con đường đã chọn.\n\n5. **Nhật Thực**: Đây là lá bài của những thay đổi đột ngột và không thể đoán trước. Nó mang năng lượng của sự gián đoạn nhưng cũng là cơ hội để định hướng lại cuộc sống theo một hướng tích cực hơn.\n\nKhi một hoặc nhiều lá bài này xuất hiện trong trải bài của bạn, hãy đặc biệt chú ý vì chúng mang những thông điệp quan trọng và có thể báo hiệu những thời điểm quan trọng trong cuộc sống của bạn.",
      author: {
        id: 2,
        name: "Trần Thanh Tùng",
        avatar: "/images/team/thanh-tung.jpg"
      },
      category: "Tarot & Mặt trăng",
      tags: ["tarot", "moonology", "lá bài"],
      image: "/images/blog/powerful-cards.jpg",
      publishedAt: "2023-07-22T10:30:00Z",
      readTime: 6
    },
    {
      id: 3,
      title: "Cách kết nối với năng lượng mặt trăng trong cuộc sống hàng ngày",
      slug: "ket-noi-voi-nang-luong-mat-trang",
      excerpt: "Khám phá những cách đơn giản để kết nối với năng lượng của mặt trăng và áp dụng vào cuộc sống hàng ngày của bạn.",
      content: "Mặt trăng không chỉ ảnh hưởng đến thủy triều của đại dương mà còn có tác động sâu sắc đến năng lượng và cảm xúc của con người. Kết nối với các chu kỳ của mặt trăng có thể giúp bạn sống hài hòa hơn với tự nhiên và tận dụng được năng lượng của từng pha trăng khác nhau.\n\nDưới đây là một số cách đơn giản để kết nối với năng lượng mặt trăng trong cuộc sống hàng ngày:\n\n1. **Theo dõi các pha của mặt trăng**: Sử dụng lịch mặt trăng hoặc ứng dụng di động để theo dõi các pha của mặt trăng. Hiểu được bạn đang ở trong pha trăng nào sẽ giúp bạn điều chỉnh các hoạt động và mục tiêu của mình cho phù hợp.\n\n2. **Thiền định dưới ánh trăng**: Vào những đêm trăng sáng, đặc biệt là đêm trăng tròn, hãy dành thời gian ngồi thiền dưới ánh trăng. Điều này có thể giúp bạn tăng cường trực giác và kết nối sâu hơn với bản thân.\n\n3. **Sạc năng lượng cho đá quý và tinh thể**: Đặt các viên đá quý và tinh thể của bạn dưới ánh trăng (đặc biệt là trăng tròn) để sạc năng lượng cho chúng. Sau đó, bạn có thể mang theo hoặc đặt chúng trong không gian sống để tận hưởng năng lượng mặt trăng.\n\n4. **Tạo nước mặt trăng**: Đặt một bình nước sạch dưới ánh trăng qua đêm (đảm bảo bình được đậy kín). Nước này được cho là đã hấp thụ năng lượng của mặt trăng và có thể được sử dụng cho các nghi thức tâm linh hoặc đơn giản là uống để kết nối với năng lượng mặt trăng.\n\n5. **Đặt ra mục tiêu theo chu kỳ mặt trăng**: Sử dụng pha trăng non để đặt ra mục tiêu mới và bắt đầu các dự án, và sử dụng pha trăng khuyết cuối tháng để buông bỏ những điều không còn phục vụ bạn.\n\n6. **Tổ chức nghi thức mặt trăng**: Tạo ra các nghi thức đơn giản phù hợp với từng pha trăng. Ví dụ, viết ra những điều bạn biết ơn vào đêm trăng tròn hoặc viết ra những điều bạn muốn buông bỏ vào pha trăng khuyết cuối tháng.\n\nBằng cách kết hợp những thực hành này vào cuộc sống hàng ngày, bạn có thể tăng cường kết nối với các chu kỳ tự nhiên và tận dụng năng lượng mạnh mẽ của mặt trăng để hỗ trợ sự phát triển cá nhân và tâm linh của mình.",
      author: {
        id: 3,
        name: "Lê Thị Hương",
        avatar: "/images/team/le-huong.jpg"
      },
      category: "Tâm linh & Thực hành",
      tags: ["mặt trăng", "năng lượng", "thiền định", "tâm linh"],
      image: "/images/blog/moon-energy.jpg",
      publishedAt: "2023-08-10T14:15:00Z",
      readTime: 10
    },
    {
      id: 4,
      title: "Mối liên hệ giữa Tarot và Chiêm tinh học",
      slug: "moi-lien-he-giua-tarot-va-chiem-tinh-hoc",
      excerpt: "Khám phá mối quan hệ sâu sắc giữa Tarot và Chiêm tinh học và cách kết hợp cả hai để có được thông điệp sâu sắc hơn.",
      content: "Tarot và Chiêm tinh học là hai hệ thống biểu tượng cổ xưa có mối liên hệ mật thiết với nhau. Cả hai đều là công cụ giúp chúng ta hiểu rõ hơn về bản thân và thế giới xung quanh, cũng như cung cấp hướng dẫn cho tương lai.\n\nTrong bộ bài Tarot truyền thống, có nhiều lá bài có liên kết trực tiếp với các cung hoàng đạo và hành tinh trong Chiêm tinh học. Ví dụ:\n\n- Lá The Emperor liên kết với cung Bạch Dương và sao Hỏa\n- Lá The Empress liên kết với cung Kim Ngưu và sao Kim\n- Lá The Lovers liên kết với cung Song Tử và sao Thủy\n- Lá The Chariot liên kết với cung Cự Giải và Mặt Trăng\n\nKhi kết hợp Tarot và Chiêm tinh học trong một trải bài, bạn có thể có được cái nhìn toàn diện hơn về tình huống của mình. Ví dụ, nếu bạn đang trong thời kỳ sao Thủy nghịch hành và rút được lá The Tower trong một trải bài, điều này có thể báo hiệu những thay đổi đột ngột liên quan đến giao tiếp hoặc công nghệ.\n\nDưới đây là một số cách để kết hợp Tarot và Chiêm tinh học trong thực hành của bạn:\n\n1. **Trải bài theo cung hoàng đạo**: Tạo một trải bài dựa trên 12 cung hoàng đạo, mỗi vị trí tượng trưng cho một cung và ảnh hưởng của nó đến cuộc sống của bạn.\n\n2. **Trải bài theo chu kỳ mặt trăng**: Thực hiện các trải bài khác nhau vào các pha khác nhau của mặt trăng để khám phá các khía cạnh khác nhau của một tình huống.\n\n3. **Kết hợp với bản đồ sao**: Sử dụng bản đồ sao cá nhân của bạn để xác định các lĩnh vực cần tập trung trong trải bài Tarot.\n\n4. **Hiểu về các nguyên tố**: Cả Tarot và Chiêm tinh học đều sử dụng bốn nguyên tố (Lửa, Đất, Khí và Nước). Hiểu về sự cân bằng của các nguyên tố này trong trải bài và bản đồ sao của bạn có thể cung cấp thông tin quý giá.\n\nViệc kết hợp Tarot và Chiêm tinh học không chỉ làm phong phú thêm hiểu biết của bạn về cả hai hệ thống mà còn cung cấp một công cụ mạnh mẽ để tự khám phá và phát triển cá nhân.",
      author: {
        id: 2,
        name: "Trần Thanh Tùng",
        avatar: "/images/team/thanh-tung.jpg"
      },
      category: "Chiêm tinh học",
      tags: ["tarot", "chiêm tinh học", "cung hoàng đạo"],
      image: "/images/blog/tarot-astrology.jpg",
      publishedAt: "2023-09-05T09:45:00Z",
      readTime: 12
    },
    {
      id: 5,
      title: "Cách giải mã giấc mơ với sự hỗ trợ của Tarot",
      slug: "giai-ma-giac-mo-voi-tarot",
      excerpt: "Khám phá cách sử dụng bài Tarot để hiểu rõ hơn về ý nghĩa của giấc mơ và thông điệp tiềm thức.",
      content: "Giấc mơ là cánh cửa dẫn đến tiềm thức của chúng ta, nơi chứa đựng những thông điệp, nỗi sợ hãi, ước muốn và trí tuệ sâu sắc mà ý thức thường không tiếp cận được. Tarot, với hệ thống biểu tượng phong phú, có thể là một công cụ mạnh mẽ để giải mã những thông điệp này.\n\nDưới đây là một quy trình đơn giản để sử dụng Tarot giải mã giấc mơ của bạn:\n\n1. **Ghi lại giấc mơ**: Ngay khi thức dậy, hãy ghi lại giấc mơ của bạn càng chi tiết càng tốt. Chú ý đến cảm xúc, màu sắc, người, địa điểm và bất kỳ biểu tượng nổi bật nào.\n\n2. **Xác định chủ đề chính**: Từ ghi chép của bạn, hãy xác định 1-3 chủ đề hoặc biểu tượng chính trong giấc mơ.\n\n3. **Trải bài Tarot**: Có một số trải bài phổ biến để giải mã giấc mơ:\n   - **Trải bài 3 lá đơn giản**: Lá 1 - Ý nghĩa bề mặt của giấc mơ, Lá 2 - Thông điệp tiềm thức, Lá 3 - Hành động hoặc bài học cần áp dụng.\n   - **Trải bài Giấc mơ 5 lá**: Lá 1 - Chủ đề chính của giấc mơ, Lá 2 - Cảm xúc ẩn sau giấc mơ, Lá 3 - Biểu tượng cần chú ý, Lá 4 - Thông điệp tiềm thức, Lá 5 - Cách áp dụng thông điệp này vào cuộc sống thực.\n\n4. **Kết nối các lá bài với giấc mơ**: Xem xét cách các lá bài liên quan đến các yếu tố trong giấc mơ của bạn. Tìm kiếm các mẫu, biểu tượng hoặc chủ đề chung.\n\n5. **Suy ngẫm và ghi chép**: Dành thời gian suy ngẫm về các kết nối giữa giấc mơ và các lá bài. Ghi lại bất kỳ hiểu biết hoặc câu hỏi mới nào xuất hiện.\n\nVí dụ, nếu bạn mơ thấy mình đang bay và rút được lá The Fool, điều này có thể gợi ý rằng tiềm thức của bạn đang khuyến khích bạn chấp nhận rủi ro và bắt đầu một hành trình mới với tâm trí cởi mở và tự do.\n\nHoặc nếu bạn mơ thấy nước và rút được lá The Moon, điều này có thể cho thấy bạn đang xử lý những cảm xúc sâu sắc hoặc nỗi sợ hãi từ tiềm thức của mình.\n\nViệc kết hợp Tarot với giải mã giấc mơ không chỉ giúp bạn hiểu rõ hơn về thông điệp của giấc mơ mà còn cung cấp hướng dẫn thực tế về cách áp dụng những hiểu biết này vào cuộc sống hàng ngày của bạn.",
      author: {
        id: 3,
        name: "Lê Thị Hương",
        avatar: "/images/team/le-huong.jpg"
      },
      category: "Tarot & Giải mã",
      tags: ["tarot", "giấc mơ", "tiềm thức", "giải mã"],
      image: "/images/blog/dream-interpretation.jpg",
      publishedAt: "2023-10-18T16:20:00Z",
      readTime: 9
    }
  ];
  
  // Lọc theo category nếu có
  let filteredPosts = allPosts;
  if (category) {
    filteredPosts = allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  }
  
  // Phân trang
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  // Tạo response
  const response = {
    success: true,
    data: {
      posts: paginatedPosts,
      pagination: {
        total: filteredPosts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredPosts.length / limit)
      },
      categories: ["Tarot & Mặt trăng", "Tâm linh & Thực hành", "Chiêm tinh học", "Tarot & Giải mã"]
    }
  };

  return NextResponse.json(response);
}
