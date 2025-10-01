// Utility functions for Moonology Tarot

// Show notification (to be implemented with a notification component)
export const showNotification = (type: 'success' | 'error', message: string) => {
  // This will be implemented with a React context or state management
  console.log(`${type}: ${message}`);
};

// Debounce function for search inputs
export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Image preloading utility
export const preloadImages = (imageUrls: string[]): Promise<string[]> => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    })
  );
};

// Format AI response content
export const formatAIResponse = (content: string): string => {
  if (!content) return '';
  
  // Define icons for different sections
  const sectionIcons: Record<string, string> = {
    'tổng quan': '🔮',
    'thông điệp': '💫',
    'lời khuyên': '💡',
    'lưu ý': '⚠️',
    'kết luận': '✨',
    'định hướng': '🧭',
    'cảnh báo': '🚨',
    'cơ hội': '🎯',
    'thách thức': '⚡',
    'giải pháp': '🔧',
    'tương lai': '🔮',
    'hiện tại': '🌙',
    'quá khứ': '📜',
    'tình cảm': '💕',
    'sự nghiệp': '💼',
    'sức khỏe': '🏥',
    'tài chính': '💰',
    'gia đình': '👨‍👩‍👧‍👦',
    'bạn bè': '👥',
    'học tập': '📚',
    'du lịch': '✈️',
    'mục tiêu': '🎯',
    'ước mơ': '⭐',
    'hy vọng': '🌈'
  };
  
  let formattedContent = content;
  
  // Convert numbered lists (1., 2., 3., etc.) with enhanced styling and dynamic icons
  formattedContent = formattedContent.replace(/^(\d+)\.\s+(.+?)(?:\n|$)/gm, function(match, number, title) {
    const lowerTitle = title.toLowerCase().trim();
    let icon = '🌟'; // default icon
    
    // Find matching icon based on title content
    for (const [keyword, sectionIcon] of Object.entries(sectionIcons)) {
      if (lowerTitle.includes(keyword)) {
        icon = sectionIcon;
        break;
      }
    }
    
    return `<div class="section-header"><span class="section-number">${number}.</span> <span class="section-icon">${icon}</span> ${title}</div>`;
  });
  
  // Convert sub-numbered lists (1.1, 1.2, etc.)
  formattedContent = formattedContent.replace(/^(\d+)\.(\d+)\s+(.+)$/gm, '<h4><span class="subsection-number">$1.$2</span> $3</h4>');
  
  // Convert bullet points with different symbols to li elements
  formattedContent = formattedContent.replace(/^[-•*]\s+/gm, '<li>');
  formattedContent = formattedContent.replace(/^[▪▫▬▭▮▯]\s+/gm, '<li>');
  formattedContent = formattedContent.replace(/^[◆◇◈◉◊○●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯]\s+/gm, '<li>');
  formattedContent = formattedContent.replace(/(<li>.*?)(?=\n|$)/g, '$1</li>');
  
  // Wrap consecutive li elements in ul
  formattedContent = formattedContent.replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/g, function(match) {
    return '<ul>' + match + '</ul>';
  });
  
  // Convert paragraphs
  formattedContent = formattedContent.replace(/^(?!<[h|u|o]|<li>)(.+)$/gm, '<p>$1</p>');
  
  // Clean up empty paragraphs
  formattedContent = formattedContent.replace(/<p>\s*<\/p>/g, '');
  
  // Add highlights for important words - but be more conservative
  formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert quotes
  formattedContent = formattedContent.replace(/^["""](.*?)["""]$/gm, '<blockquote>$1</blockquote>');
  
  // Add mystical highlights - but only for specific important words
  const mysticalWords = ['vũ trụ', 'mặt trăng', 'năng lượng'];
  mysticalWords.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    formattedContent = formattedContent.replace(regex, '<span class="highlight">$1</span>');
  });

  // Add special classes to important bullet points
  const importantKeywords = ['quan trọng', 'lưu ý', 'cảnh báo', 'chú ý', 'đặc biệt'];
  const warningKeywords = ['cẩn thận', 'nguy hiểm', 'tránh', 'không nên'];
  const successKeywords = ['tốt', 'tích cực', 'may mắn', 'thuận lợi', 'thành công'];

  // Add important class
  importantKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="important">'));
  });

  // Add warning class
  warningKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="warning">'));
  });

  // Add success class
  successKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="success">'));
  });

  // Add topic-specific classes
  const loveKeywords = ['tình cảm', 'tình yêu', 'tình duyên', 'hôn nhân', 'mối quan hệ'];
  const careerKeywords = ['sự nghiệp', 'công việc', 'nghề nghiệp', 'kinh doanh', 'thăng tiến'];
  const moneyKeywords = ['tài chính', 'tiền bạc', 'đầu tư', 'kinh tế', 'thu nhập'];
  const healthKeywords = ['sức khỏe', 'bệnh tật', 'thể chất', 'tinh thần', 'dinh dưỡng'];
  const familyKeywords = ['gia đình', 'con cái', 'cha mẹ', 'anh chị em', 'họ hàng'];
  const travelKeywords = ['du lịch', 'di chuyển', 'đi xa', 'nước ngoài', 'khám phá'];

  // Add love class
  loveKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="love">'));
  });

  // Add career class
  careerKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="career">'));
  });

  // Add money class
  moneyKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="money">'));
  });

  // Add health class
  healthKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="health">'));
  });

  // Add family class
  familyKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="family">'));
  });

  // Add travel class
  travelKeywords.forEach(keyword => {
    const regex = new RegExp(`(<li>.*?${keyword}.*?</li>)`, 'gi');
    formattedContent = formattedContent.replace(regex, '$1'.replace('<li>', '<li class="travel">'));
  });
  
  return formattedContent;
};
