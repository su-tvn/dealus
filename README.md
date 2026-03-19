# DealUs - Marketplace Platform Demo

Một ứng dụng web hiện đại được xây dựng với **React** + **Tailwind CSS** + **Vite**. Đây là prototype của nền tảng giao dịch và tư vấn chuyên gia hàng đầu.

## 🚀 Features

- **Đăng nhập/Xác thực**: Giao diện đăng nhập modern với hiệu ứng glassmorphism
- **Trang chủ (Home)**: Dashboard chính với bannners, menu super-app, sản phẩm gợi ý, chuyên gia nổi bật
- **Cộng đồng (Feed)**: Các phòng thảo luận theo chủ đề (BĐS, Nội thất, Tài chính, Điện máy)
- **Tin nhắn (Chat)**: Liên hệ trực tiếp với chuyên gia, quản lý cuộc hội thoại
- **Mua sắm (Shopping)**: Siêu thị với sản phẩm được đề xuất, hot items, giảm giá
- **Hồ sơ (Profile)**: Quản lý thông tin người dùng

## 📋 Yêu cầu

- Node.js 16+ 
- npm hoặc yarn

## 💻 Cài đặt cục bộ

1. **Clone hoặc tải project**
   ```bash
   cd dealus
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   ```

4. **Build cho production**
   ```bash
   npm run build
   ```

## 🌐 Triển khai lên Vercel

### Cách 1: Vercel CLI (Nhanh nhất)

```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Triển khai
vercel
```

### Cách 2: GitHub + Vercel Dashboard (Recommended)

1. **Push code lên GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dealus.git
   git push -u origin main
   ```

2. **Kết nối với Vercel**
   - Truy cập [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub
   - Click "Add New..." → "Project"
   - Chọn repository `dealus`
   - Vercel sẽ tự detect Vite + React config
   - Click "Deploy"

3. **Xác nhận thành công**
   - Sau vài phút, bạn sẽ nhận link demo
   - Ví dụ: `https://dealus-demo.vercel.app`

## 🎨 Công nghệ sử dụng

- **React 18** - UI Library
- **Vite** - Build tool & Dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **PostCSS + Autoprefixer** - CSS processing

## 📱 Responsive Design

App được tối ưu hóa cho:
- ✅ Mobile phones (360px - 480px)
- ✅ Tablets (768px+)
- ✅ Desktop (1024px+)
- ✅ PWA-ready (installable trên mobile)

## 📝 Cấu trúc Project

```
dealus/
├── src/
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── .gitignore            # Git ignore rules
```

## 🔧 Các lệnh hữu dụng

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build cho production |
| `npm run preview` | Preview build trước khi deploy |
| `npm install` | Cài đặt dependencies |

## 🎯 Demo Data

Toàn bộ dữ liệu được hardcode trong `src/App.jsx` (mock data):
- User profile
- Products
- Expert agents
- Community feeds
- Chat messages

Để tích hợp API thực, hãy thay thế mock data bằng API calls.

## 📧 Support

Nếu gặp vấn đề:
1. Kiểm tra Node.js version: `node --version` (phải ≥ 16)
2. Xóa `node_modules` và cài lại: `rm -rf node_modules && npm install`
3. Clear Vite cache: `rm -rf .vite` (nếu có)
4. Kiểm tra log lỗi trong terminal

## 📄 License

Open source - Tự do sử dụng cho mục đích demo & học tập.

---

**Made with ❤️ for DealUs demo**
