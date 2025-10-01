import { NextApiRequest, NextApiResponse } from 'next';

// Hàm này có thể được sử dụng để thiết lập headers cho API routes
export function disableCache(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  // Thiết lập các headers để ngăn chặn cache
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  
  // Thêm timestamp để đảm bảo mỗi request là duy nhất
  res.setHeader('X-Timestamp', Date.now().toString());
  
  // Tiếp tục xử lý request
  next();
}
