'use client';

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faClock,
  faSpinner,
  faCheck,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

// Định nghĩa kiểu dữ liệu
interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  workingHours: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  mapLocation: {
    lat: number;
    lng: number;
    zoom: number;
  };
  team: TeamMember[];
  faq: FAQ[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasCalledAPI = useRef(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  
  // Fetch contact info
  useEffect(() => {
    const fetchContactInfo = async () => {
      // Prevent multiple API calls
      if (hasCalledAPI.current) {
        console.log('Contact API already called, skipping...');
        return;
      }
      
      hasCalledAPI.current = true;
      console.log('Calling contact API...');
      try {
        const response = await fetch('/api/contact');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          setContactInfo(result.data);
        } else {
          throw new Error('Không thể tải dữ liệu');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Error fetching contact info:', err);
        
        // Fake data nếu API không hoạt động
        setContactInfo({
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
            }
          ],
          faq: [
            {
              question: "Làm thế nào để đặt lịch đọc bài Tarot trực tiếp?",
              answer: "Bạn có thể đặt lịch đọc bài Tarot trực tiếp bằng cách gọi điện theo số +84 28 1234 5678 hoặc gửi email đến info@moonology.vn."
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormStatus('success');
        setFormMessage(result.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Đã xảy ra lỗi khi gửi biểu mẫu');
      }
    } catch (err) {
      setFormStatus('error');
      setFormMessage(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi gửi biểu mẫu');
      console.error('Error submitting form:', err);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-cosmic-purple" />
          <p className="mt-4 text-lg">Đang tải thông tin liên hệ...</p>
        </div>
      </Layout>
    );
  }

  if (error || !contactInfo) {
    return (
      <Layout>
        <div className="error-container">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Đã xảy ra lỗi</h2>
          <p>{error || 'Không thể tải thông tin liên hệ. Vui lòng thử lại sau.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Contact Header */}
      <section className="contact-header">
        <h1 className="contact-title">Liên hệ với chúng tôi</h1>
        <p className="contact-subtitle">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
      </section>

      {/* Contact Info & Form */}
      <section className="contact-content">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="info-heading">Thông tin liên hệ</h2>
            
            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="info-text">
                <h3>Địa chỉ</h3>
                <p>{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="info-text">
                <h3>Email</h3>
                <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="info-text">
                <h3>Điện thoại</h3>
                <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="info-text">
                <h3>Giờ làm việc</h3>
                <p>{contactInfo.workingHours}</p>
              </div>
            </div>
            
            <div className="social-media">
              <h3>Kết nối với chúng tôi</h3>
              <div className="social-links">
                <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                  <FontAwesomeIcon icon={faFacebookF as any} />
                </a>
                <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <FontAwesomeIcon icon={faInstagram as any} />
                </a>
                <a href={contactInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="social-link youtube">
                  <FontAwesomeIcon icon={faYoutube as any} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2 className="form-heading">Gửi tin nhắn cho chúng tôi</h2>
            
            {formStatus === 'success' ? (
              <div className="form-success">
                <FontAwesomeIcon icon={faCheck} className="success-icon" />
                <h3>Gửi tin nhắn thành công!</h3>
                <p>{formMessage}</p>
                <button 
                  onClick={() => setFormStatus('idle')} 
                  className="new-message-btn"
                >
                  Gửi tin nhắn mới
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {formStatus === 'error' && (
                  <div className="form-error">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                    <p>{formMessage}</p>
                  </div>
                )}
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Họ và tên <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập địa chỉ email của bạn"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Chủ đề</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Nhập chủ đề tin nhắn"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Tin nhắn <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Nhập nội dung tin nhắn của bạn"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <span>Gửi tin nhắn</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="contact-team">
        <h2 className="team-heading">Đội ngũ của chúng tôi</h2>
        <div className="team-grid">
          {contactInfo.team.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">
                {member.avatar ? (
                  <Image 
                    src={member.avatar} 
                    alt={member.name} 
                    width={120} 
                    height={120} 
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="avatar-placeholder">{member.name.charAt(0)}</div>
                )}
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-position">{member.position}</p>
              <div className="team-contact">
                <a href={`mailto:${member.email}`} className="team-email">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>{member.email}</span>
                </a>
                <a href={`tel:${member.phone}`} className="team-phone">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>{member.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <h2 className="faq-heading">Câu hỏi thường gặp</h2>
        <div className="faq-list">
          {contactInfo.faq.map((item, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <h2 className="map-heading">Bản đồ</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <p>Bản đồ sẽ hiển thị tại đây</p>
            <p className="map-coords">Vĩ độ: {contactInfo.mapLocation.lat}, Kinh độ: {contactInfo.mapLocation.lng}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
