'use client';

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHistory, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Định nghĩa kiểu dữ liệu
interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  avatar: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
}

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  history: {
    foundedYear: number;
    story: string;
  };
  team: TeamMember[];
  features: Feature[];
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      // Prevent multiple API calls
      if (hasCalledAPI.current) {
        console.log('About API already called, skipping...');
        return;
      }
      
      hasCalledAPI.current = true;
      console.log('Calling about API...');
      try {
        const response = await fetch('/api/about');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          setAboutData(result.data);
        } else {
          throw new Error('Không thể tải dữ liệu');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Error fetching about data:', err);
        
        // Fake data nếu API không hoạt động
        setAboutData({
          title: "Về Moonology Tarot",
          subtitle: "Khám phá sức mạnh của các lá bài Moonology",
          description: "Moonology Tarot là nơi kết nối giữa con người và vũ trụ thông qua năng lượng của mặt trăng và các lá bài tarot.",
          mission: "Sứ mệnh của chúng tôi là mang đến những thông điệp từ vũ trụ một cách chân thực và dễ hiểu nhất.",
          history: {
            foundedYear: 2020,
            story: "Moonology Tarot được thành lập vào năm 2020 bởi nhóm các nhà chiêm tinh học và chuyên gia tarot."
          },
          team: [
            {
              id: 1,
              name: "Nguyễn Minh Anh",
              position: "Nhà sáng lập & Chuyên gia Tarot",
              bio: "Với hơn 15 năm kinh nghiệm trong lĩnh vực chiêm tinh học và tarot.",
              avatar: "/images/team/minh-anh.jpg"
            }
          ],
          features: [
            {
              id: 1,
              title: "Đọc bài Tarot",
              description: "Chúng tôi cung cấp dịch vụ đọc bài tarot trực tuyến với độ chính xác cao."
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-cosmic-purple" />
          <p className="mt-4 text-lg">Đang tải thông tin...</p>
        </div>
      </Layout>
    );
  }

  if (error || !aboutData) {
    return (
      <Layout>
        <div className="error-container">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Đã xảy ra lỗi</h2>
          <p>{error || 'Không thể tải thông tin. Vui lòng thử lại sau.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-title">{aboutData.title}</h1>
        <p className="about-subtitle">{aboutData.subtitle}</p>
      </section>

      {/* Main Content */}
      <section className="about-content">
        <div className="about-description">
          <h2 className="section-heading">Giới thiệu</h2>
          <p>{aboutData.description}</p>
          
          <div className="mission-box">
            <h3 className="text-xl font-bold mb-2 text-cosmic-purple">Sứ mệnh của chúng tôi</h3>
            <p>{aboutData.mission}</p>
          </div>
        </div>

        {/* History Section */}
        <div className="about-history">
          <h2 className="section-heading">
            <FontAwesomeIcon icon={faHistory} className="mr-2" />
            Lịch sử hình thành
          </h2>
          <div className="history-content">
            <div className="founded-year">
              <span className="year">{aboutData.history.foundedYear}</span>
              <span className="label">Năm thành lập</span>
            </div>
            <p className="history-story">{aboutData.history.story}</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="about-team">
          <h2 className="section-heading">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Đội ngũ của chúng tôi
          </h2>
          <div className="team-grid">
            {aboutData.team.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-avatar">
                  <div className="avatar-placeholder">
                    {member.avatar ? (
                      <Image 
                        src={member.avatar} 
                        alt={member.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="placeholder-text">{member.name.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="about-features">
          <h2 className="section-heading">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            Dịch vụ của chúng tôi
          </h2>
          <div className="features-grid">
            {aboutData.features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
