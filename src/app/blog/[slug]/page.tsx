'use client';

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faUser, 
  faClock, 
  faTag, 
  faSpinner,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Định nghĩa kiểu dữ liệu
interface Author {
  id: number;
  name: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const fetchPost = async () => {
      // Prevent multiple API calls
      if (hasCalledAPI.current) {
        console.log('Blog post API already called, skipping...');
        return;
      }
      
      hasCalledAPI.current = true;
      console.log('Calling blog post API...');
      setIsLoading(true);
      try {
        // Thực tế sẽ gọi API để lấy bài viết theo slug
        // Ở đây chúng ta sẽ fake data
        const response = await fetch(`/api/blog?slug=${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Tìm bài viết có slug phù hợp
        if (result.success && result.data && result.data.posts) {
          const foundPost = result.data.posts.find((p: BlogPost) => p.slug === slug);
          if (foundPost) {
            setPost(foundPost);
          } else {
            throw new Error('Không tìm thấy bài viết');
          }
        } else {
          // Fake data nếu API không hoạt động
          setPost({
            id: 1,
            title: "Hiểu về các pha của mặt trăng và ý nghĩa trong Tarot",
            slug: slug,
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
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Error fetching blog post:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Format nội dung bài viết
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Kiểm tra nếu là tiêu đề
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="content-heading">{paragraph.substring(2)}</h2>;
      }
      
      // Kiểm tra nếu là tiêu đề phụ
      if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="content-subheading">{paragraph.substring(3)}</h3>;
      }
      
      // Kiểm tra nếu là danh sách
      if (paragraph.includes('\n1. ') || paragraph.includes('\n- ')) {
        const listItems = paragraph.split('\n').filter(item => item.trim());
        const isNumbered = listItems[0].startsWith('1. ');
        
        if (isNumbered) {
          return (
            <ol key={index} className="content-list numbered">
              {listItems.map((item, i) => {
                // Xử lý định dạng đậm và nghiêng
                const processedItem = item
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/^\d+\.\s/, '');
                
                return <li key={i} dangerouslySetInnerHTML={{ __html: processedItem }} />;
              })}
            </ol>
          );
        } else {
          return (
            <ul key={index} className="content-list">
              {listItems.map((item, i) => {
                // Xử lý định dạng đậm và nghiêng
                const processedItem = item
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/^-\s/, '');
                
                return <li key={i} dangerouslySetInnerHTML={{ __html: processedItem }} />;
              })}
            </ul>
          );
        }
      }
      
      // Xử lý định dạng đậm và nghiêng trong đoạn văn bản thông thường
      const processedParagraph = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return <p key={index} className="content-paragraph" dangerouslySetInnerHTML={{ __html: processedParagraph }} />;
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-cosmic-purple" />
          <p className="mt-4 text-lg">Đang tải bài viết...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="error-container">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Đã xảy ra lỗi</h2>
          <p>{error || 'Không thể tải bài viết. Vui lòng thử lại sau.'}</p>
          <Link href="/blog" className="back-to-blog">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Quay lại Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="blog-post-page">
        {/* Back to Blog */}
        <div className="back-link">
          <Link href="/blog" className="back-to-blog">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Quay lại Blog
          </Link>
        </div>

        {/* Post Header */}
        <header className="post-header">
          <div className="post-category">{post.category}</div>
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="meta-icon" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="meta-item">
              <FontAwesomeIcon icon={faClock} className="meta-icon" />
              <span>{post.readTime} phút đọc</span>
            </div>
          </div>
          
          <div className="post-author">
            <div className="author-avatar">
              {post.author.avatar ? (
                <Image 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  width={50} 
                  height={50} 
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <div className="avatar-placeholder">{post.author.name.charAt(0)}</div>
              )}
            </div>
            <span className="author-name">{post.author.name}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="post-featured-image">
          {post.image ? (
            <Image 
              src={post.image} 
              alt={post.title} 
              width={1200} 
              height={600} 
              className="rounded-cosmic-sm object-cover"
              unoptimized
            />
          ) : (
            <div className="image-placeholder">
              <span>Moonology</span>
            </div>
          )}
        </div>

        {/* Post Content */}
        <article className="post-content">
          {formatContent(post.content)}
        </article>

        {/* Post Tags */}
        <div className="post-tags-container">
          <h3 className="tags-heading">Thẻ:</h3>
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <Link href={`/blog?tag=${tag}`} key={index} className="post-tag">
                <FontAwesomeIcon icon={faTag} className="tag-icon" />
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Related Posts Placeholder */}
        <div className="related-posts">
          <h2 className="related-heading">Bài viết liên quan</h2>
          <div className="related-posts-placeholder">
            <p>Các bài viết liên quan sẽ hiển thị tại đây</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
