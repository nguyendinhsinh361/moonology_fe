'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faUser, 
  faClock, 
  faTag, 
  faSpinner, 
  faChevronLeft, 
  faChevronRight,
  faSearch,
  faFilter
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

interface BlogData {
  posts: BlogPost[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  categories: string[];
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lấy các tham số từ URL
  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      // Prevent multiple API calls
      if (hasCalledAPI.current) {
        console.log('Blog API already called, skipping...');
        return;
      }
      
      hasCalledAPI.current = true;
      console.log('Calling blog API...');
      setIsLoading(true);
      try {
        // Xây dựng URL với các tham số
        let url = `/api/blog?page=${page}&limit=10`;
        if (category) url += `&category=${encodeURIComponent(category)}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          setBlogData(result.data);
        } else {
          throw new Error('Không thể tải dữ liệu');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Error fetching blog data:', err);
        
        // Fake data nếu API không hoạt động
        setBlogData({
          posts: [
            {
              id: 1,
              title: "Hiểu về các pha của mặt trăng và ý nghĩa trong Tarot",
              slug: "hieu-ve-cac-pha-cua-mat-trang",
              excerpt: "Mặt trăng trải qua 8 pha chính trong một chu kỳ, mỗi pha đều mang những năng lượng và ý nghĩa riêng biệt trong việc đọc bài Tarot.",
              content: "Nội dung bài viết...",
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
            }
          ],
          pagination: {
            total: 5,
            page: 1,
            limit: 10,
            totalPages: 1
          },
          categories: ["Tarot & Mặt trăng", "Tâm linh & Thực hành", "Chiêm tinh học", "Tarot & Giải mã"]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [page, category, search]);

  // Xử lý thay đổi trang
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (blogData && newPage > blogData.pagination.totalPages)) return;
    
    // Xây dựng URL mới với tham số trang mới
    let url = `/blog?page=${newPage}`;
    if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    
    router.push(url);
  };

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    
    // Xây dựng URL mới với danh mục mới
    let url = `/blog?page=1`;
    if (newCategory) url += `&category=${encodeURIComponent(newCategory)}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    
    router.push(url);
  };

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Xây dựng URL mới với từ khóa tìm kiếm
    let url = `/blog?page=1`;
    if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    
    router.push(url);
  };

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
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

  if (error || !blogData) {
    return (
      <Layout>
        <div className="error-container">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Đã xảy ra lỗi</h2>
          <p>{error || 'Không thể tải bài viết. Vui lòng thử lại sau.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Blog Header */}
      <section className="blog-header">
        <h1 className="blog-title">Blog Moonology</h1>
        <p className="blog-subtitle">Khám phá thế giới Tarot, Chiêm tinh học và năng lượng của mặt trăng</p>
      </section>

      {/* Blog Filters */}
      <section className="blog-filters">
        <div className="filter-container">
          <div className="category-filter">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            <select 
              value={selectedCategory} 
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="category-select"
            >
              <option value="">Tất cả danh mục</option>
              {blogData.categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-posts">
        {blogData.posts.length === 0 ? (
          <div className="no-posts">
            <p>Không tìm thấy bài viết nào.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {blogData.posts.map((post) => (
              <article key={post.id} className="blog-post-card">
                <div className="post-image">
                  <Link href={`/blog/${post.slug}`}>
                    {post.image ? (
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>Moonology</span>
                      </div>
                    )}
                  </Link>
                </div>
                <div className="post-category">{post.category}</div>
                <h2 className="post-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
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
                        width={40} 
                        height={40} 
                        className="rounded-full"
                        unoptimized
                      />
                    ) : (
                      <div className="avatar-placeholder">{post.author.name.charAt(0)}</div>
                    )}
                  </div>
                  <span className="author-name">{post.author.name}</span>
                </div>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="post-tag">
                      <FontAwesomeIcon icon={faTag} className="tag-icon" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="read-more">
                  Đọc tiếp
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {blogData.pagination.totalPages > 1 && (
        <div className="blog-pagination">
          <button 
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`pagination-button ${page === 1 ? 'disabled' : ''}`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Trước</span>
          </button>
          
          <div className="pagination-info">
            Trang {page} / {blogData.pagination.totalPages}
          </div>
          
          <button 
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= blogData.pagination.totalPages}
            className={`pagination-button ${page >= blogData.pagination.totalPages ? 'disabled' : ''}`}
          >
            <span>Tiếp</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </Layout>
  );
}

// Loading fallback component
function BlogLoading() {
  return (
    <Layout>
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-cosmic-purple" />
        <p className="mt-4 text-lg">Đang tải bài viết...</p>
      </div>
    </Layout>
  );
}

// Main page component with Suspense boundary
export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent />
    </Suspense>
  );
}
