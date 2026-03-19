import React, { useState } from 'react';
import { 
  Bell, Search, Coins, Crown, Users, UserCheck, Heart, 
  MessageSquare, Star, MapPin, ShieldCheck, ChevronRight,
  Home, Headset, ShoppingBag, User, Globe, ArrowRight,
  Phone, Flame, Percent, Eye, Sparkles, Plus, ShoppingCart,
  Hash, Filter, MessageCircleQuestion, Edit3, Gift, Tv, Building,
  Layout, UserPlus, Zap, ArrowUpRight, CheckCheck, PhoneCall, Lock
} from 'lucide-react';

// --- MOCK DATA ---
const userProfile = {
  name: "Nguyễn Minh",
  rank: "Gold Member",
  coins: "12.5k",
  points: 4500,
  avatar: "https://i.pravatar.cc/150?img=11"
};

const banners = [
  { id: 1, title: "Đặc quyền VIP", desc: "Giảm 10% mua qua POS", color: "from-amber-400 to-orange-500", icon: <Crown size={24} className="text-white"/> },
  { id: 2, title: "Thu cũ đổi mới", desc: "Trợ giá đến 3 Triệu", color: "from-blue-500 to-indigo-600", icon: <Search size={24} className="text-white"/> },
];

const superAppActions = [
  { id: 1, label: "Cộng đồng", icon: <Users size={22} className="text-blue-500" />, bg: "bg-blue-50" },
  { id: 2, label: "Tìm Chuyên gia", icon: <UserCheck size={22} className="text-emerald-500" />, bg: "bg-emerald-50" },
  { id: 3, label: "Đổi Quà (Xu)", icon: <Gift size={22} className="text-amber-500" />, bg: "bg-amber-50" },
  { id: 4, label: "Đặc quyền VIP", icon: <Crown size={22} className="text-orange-500" />, bg: "bg-orange-50" },
  { id: 5, label: "Điện máy", icon: <Tv size={22} className="text-indigo-500" />, bg: "bg-indigo-50" },
  { id: 6, label: "Bất động sản", icon: <Building size={22} className="text-rose-500" />, bg: "bg-rose-50" },
  { id: 7, label: "Nội thất", icon: <Layout size={22} className="text-amber-700" />, bg: "bg-amber-50" },
  { id: 8, label: "Mời bạn bè", icon: <UserPlus size={22} className="text-teal-500" />, bg: "bg-teal-50" },
];

const topAgents = [
  { id: 1, name: "Trần Anh", role: "Chuyên gia Nội thất", rating: 4.9, reviews: 124, rank: "Diamond", img: "https://i.pravatar.cc/150?img=33" },
  { id: 2, name: "Lê Lan", role: "Chuyên viên Tín dụng", rating: 4.8, reviews: 89, rank: "Gold", img: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Tuấn BĐS", role: "Môi giới BĐS", rating: 4.9, reviews: 210, rank: "Diamond", img: "https://i.pravatar.cc/150?img=11" },
];

// --- MOCK DATA CHO MÀN HÌNH FEED (CỘNG ĐỒNG) ---
const feedCategories = ["Dành cho bạn", "Đang theo dõi", "Bất động sản", "Nội thất", "Tài chính", "Điện máy"];

const feedRooms = [
  {
    id: 101,
    title: "Review thực tế dự án Vinhome Smart City 2026",
    tags: ["Bất động sản", "Hà Nội"],
    memberCount: "3.2k",
    activeAgent: { name: "Tuấn BĐS", role: "Diamond Agent", avatar: "https://i.pravatar.cc/150?img=11" },
    latestPost: { 
      userName: "Hoàng Oanh", 
      userAvatar: "https://i.pravatar.cc/150?img=5", 
      content: "Cho mình hỏi phân khu S2 hiện tại giá rổ sao rồi mọi người? Mình đang tìm căn 2PN." 
    },
    unreadCount: 12,
    isHot: true
  },
  {
    id: 102,
    title: "Kinh nghiệm chọn mua Sofa phòng khách nhỏ",
    tags: ["Nội thất", "Mẹo vặt"],
    memberCount: "1.5k",
    activeAgent: { name: "Trần Anh", role: "Chuyên gia Nội thất", avatar: "https://i.pravatar.cc/150?img=33" },
    latestPost: { 
      userName: "Đức Trí", 
      userAvatar: "https://i.pravatar.cc/150?img=12", 
      content: "Nhà em 55m2 thì nên mua sofa văng hay góc ạ? Tài chính loanh quanh 10 củ." 
    },
    unreadCount: 5,
    isHot: false
  },
  {
    id: 103,
    title: "Phân tích biến động Lãi suất vay mua nhà VIB",
    tags: ["Tài chính", "Vay vốn"],
    memberCount: "4.8k",
    activeAgent: { name: "Lê Lan", role: "Chuyên viên Tín dụng", avatar: "https://i.pravatar.cc/150?img=47" },
    latestPost: { 
      userName: "Lê Lan", 
      userAvatar: "https://i.pravatar.cc/150?img=47", 
      content: "Cập nhật nóng: VIB vừa điều chỉnh room tín dụng quý này. Ai hồ sơ đang treo inbox Lan hỗ trợ check ngay nhé!" 
    },
    unreadCount: 45,
    isHot: true
  }
];

// --- MOCK DATA CHO MÀN HÌNH MUA SẮM ---
const shopCategories = ["Tất cả", "Điện máy", "Nội thất", "Bất động sản", "Thời trang", "Voucher"];

const shopRecommended = [
  { id: 101, name: "Robot hút bụi Xiaomi Vacuum X10", price: "7.990.000đ", oldPrice: "10.500.000đ", agent: "Shop Điện Máy 247", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80" },
  { id: 102, name: "Bàn ăn thông minh kéo dài mặt đá", price: "5.200.000đ", oldPrice: "7.000.000đ", agent: "Trần Anh (Nội Thất)", img: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=300&q=80" },
  { id: 103, name: "iPhone 15 Pro Max 256GB VN/A", price: "28.500.000đ", oldPrice: "30.000.000đ", agent: "Tuấn Mobile", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80" }
];

const shopHot = [
  { id: 201, name: "Tủ lạnh Samsung Inverter 400L", price: "12.300.000đ", sold: "Đã bán 124", img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=300&q=80" },
  { id: 202, name: "Voucher nghỉ dưỡng 3N2Đ Phú Quốc", price: "2.990.000đ", sold: "Đã bán 58", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=300&q=80" },
  { id: 203, name: "Máy lọc không khí Dyson V12", price: "15.000.000đ", sold: "Đã bán 42", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=300&q=80" },
  { id: 204, name: "Sofa Văng nỉ giả da nhập khẩu", price: "8.500.000đ", sold: "Đã bán 89", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=300&q=80" }
];

const shopDiscount = [
  { id: 301, name: "Smart TV LG 4K 55 inch", price: "9.900.000đ", oldPrice: "16.500.000đ", discount: "-40%", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=300&q=80" },
  { id: 302, name: "Nồi chiên không dầu Philips", price: "1.500.000đ", oldPrice: "3.000.000đ", discount: "-50%", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80" },
  { id: 303, name: "Loa Bluetooth Marshall Acton II", price: "4.900.000đ", oldPrice: "7.000.000đ", discount: "-30%", img: "https://images.unsplash.com/photo-1622323758558-8d151ceb6495?auto=format&fit=crop&w=300&q=80" }
];

const shopPopular = [
  { id: 401, name: "Căn hộ Vinhome Smart City 2PN", price: "Tư vấn", views: "3.2k quan tâm", agent: "Tuấn BĐS", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&q=80" },
  { id: 402, name: "Gói thiết kế thi công nội thất 60m2", price: "Chỉ từ 80Tr", views: "1.5k quan tâm", agent: "Trần Anh (Nội Thất)", img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80" },
];

// --- MOCK DATA CHO MÀN HÌNH CHAT ---
const chatHistory = [
  { 
    id: 1, 
    name: "Trần Anh", 
    role: "Chuyên gia Nội thất", 
    avatar: "https://i.pravatar.cc/150?img=33", 
    lastMsg: "Anh cân nhắc mẫu sofa da bò Ý này nhé, em đang xin được deal nội bộ giảm 15% cho anh.", 
    time: "10:24", 
    unread: 2, 
    context: "Tư vấn Sofa phòng khách", 
    isOnline: true,
    isAgent: true
  },
  { 
    id: 2, 
    name: "Tuấn BĐS", 
    role: "Diamond Agent", 
    avatar: "https://i.pravatar.cc/150?img=11", 
    lastMsg: "Đã gửi báo giá chi tiết qua email cho anh. Anh check xem sao nhé.", 
    time: "Hôm qua", 
    unread: 0, 
    context: "Dự án Vinhome Smart City", 
    isOnline: false,
    isAgent: true
  },
  { 
    id: 3, 
    name: "Lê Lan", 
    role: "Chuyên viên Tín dụng", 
    avatar: "https://i.pravatar.cc/150?img=47", 
    lastMsg: "Dạ hồ sơ vay của anh đã được duyệt rồi ạ.", 
    time: "T2", 
    unread: 0, 
    context: "Hỗ trợ vay vốn", 
    isOnline: true,
    isAgent: true
  },
  { 
    id: 4, 
    name: "Hệ thống DealUs", 
    role: "Thông báo", 
    avatar: "https://ui-avatars.com/api/?name=DU&background=2563eb&color=fff", 
    lastMsg: "Chúc mừng! Bạn vừa nhận được 500 Xu từ nhiệm vụ giới thiệu bạn bè thành công.", 
    time: "T7", 
    unread: 1, 
    context: "Quà tặng Gamification", 
    isOnline: true,
    isAgent: false
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [chatFilter, setChatFilter] = useState('all');

  // Xử lý giả lập đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans text-gray-800 pb-20 sm:py-8">
      {/* Mobile Simulator Container */}
      <div className="w-full max-w-md bg-white shadow-2xl relative overflow-hidden flex flex-col sm:rounded-[2.5rem] sm:border-8 sm:border-gray-900 h-[100dvh] sm:h-[850px]">
        
        {!isAuthenticated ? (
          /* =========================================
             MÀN HÌNH ĐĂNG NHẬP (MINIMAL & FANCY)
             ========================================= */
          <div className="flex-1 flex flex-col bg-white overflow-y-auto relative z-0">
            
            {/* Animated SVG Background (Glassmorphism & Soft Blobs) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-md absolute top-0 left-1/2 -translate-x-1/2 animate-[spin_20s_linear_infinite]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="fancy-blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="40" />
                  </filter>
                </defs>
                {/* Floating soft colored orbs */}
                <circle cx="200" cy="100" r="90" fill="#3b82f6" filter="url(#fancy-blur)" className="animate-pulse opacity-40" style={{animationDuration: '4s'}}/>
                <circle cx="280" cy="220" r="100" fill="#8b5cf6" filter="url(#fancy-blur)" className="animate-pulse opacity-30" style={{animationDuration: '5s', animationDelay: '1s'}}/>
                <circle cx="120" cy="200" r="80" fill="#0ea5e9" filter="url(#fancy-blur)" className="animate-pulse opacity-40" style={{animationDuration: '6s', animationDelay: '2s'}}/>
              </svg>
            </div>

            {/* Logo & Header Title */}
            <div className="relative w-full pt-20 pb-10 flex flex-col items-center justify-center min-h-[260px] z-10">
              <div className="flex flex-col items-center gap-5">
                {/* Fancy Logo Container */}
                <div className="w-16 h-16 rounded-2xl bg-white shadow-2xl shadow-blue-500/20 flex items-center justify-center border border-white/60 relative backdrop-blur-md">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-5"></div>
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-blue-600 drop-shadow-sm" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                
                <div className="text-center px-6">
                  <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1">
                    Deal<span className="text-blue-600">Us</span>
                  </h1>
                  <p className="text-sm font-medium text-gray-500">Mạng lưới giao dịch & tư vấn chuyên gia</p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="flex-1 px-8 pb-8 flex flex-col relative z-10">
              
              {/* Gamification Gift Badge */}
              <div className="bg-gradient-to-r from-white to-amber-50/50 rounded-2xl p-3.5 flex items-center gap-3 mb-8 border border-amber-100/60 shadow-sm backdrop-blur-md">
                <div className="bg-gradient-to-br from-amber-400 to-orange-400 p-2 rounded-xl shadow-inner shadow-white/20">
                  <Coins size={18} className="text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 text-sm">Nhận 100 Xu Đổi Quà</h3>
                  <p className="text-[11px] text-amber-700/80 mt-0.5 font-medium">Đặc quyền dành riêng cho lần đăng nhập đầu tiên!</p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wider">Số điện thoại</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-gray-200 pr-3 transition-colors group-focus-within:border-blue-400">
                      <Phone size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <span className="text-[13px] font-bold text-gray-700">+84</span>
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Nhập SĐT của bạn" 
                      className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl py-4 pl-[96px] pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium shadow-sm hover:border-gray-300"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gray-900 text-white font-bold text-[15px] py-4 rounded-2xl shadow-xl shadow-gray-900/15 hover:bg-gray-800 hover:-translate-y-0.5 active:scale-95 transition-all mt-2 flex justify-center items-center gap-2"
                >
                  Tiếp tục <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-8 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Hoặc đăng nhập với</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button type="button" onClick={handleLogin} className="flex items-center justify-center gap-2 border border-gray-100 bg-white rounded-2xl py-3.5 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-[13px] font-bold text-gray-600">Google</span>
                </button>
                <button type="button" onClick={handleLogin} className="flex items-center justify-center gap-2 border border-gray-100 bg-white rounded-2xl py-3.5 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook" className="w-5 h-5" />
                  <span className="text-[13px] font-bold text-gray-600">Facebook</span>
                </button>
              </div>
            </div>
            
            <p className="text-center text-[10px] text-gray-400 p-6 mt-auto relative z-10">
              Bằng việc tiếp tục, bạn đồng ý với <br/> <a href="#" className="text-gray-600 font-bold underline decoration-gray-300 underline-offset-2 hover:text-blue-600 transition-colors">Điều khoản</a> & <a href="#" className="text-gray-600 font-bold underline decoration-gray-300 underline-offset-2 hover:text-blue-600 transition-colors">Bảo mật</a> của DealUs.
            </p>
          </div>

        ) : (

          /* =========================================
             MÀN HÌNH TRANG CHỦ (MAIN APP VIEW)
             ========================================= */
          <>
            {/* HEADER AREA (Hiển thị chung cho Home, Shopping, Profile) */}
            {activeTab !== 'feed' && activeTab !== 'chat' && (
              <header className="bg-white px-4 pt-6 pb-3 sticky top-0 z-10 shadow-sm flex flex-col gap-3">
                {/* Top row: Logo & Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <span className="text-xl font-black tracking-tight text-gray-900">
                      Deal<span className="text-blue-600">Us</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Search size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full relative hover:bg-gray-200 transition-colors">
                      <Bell size={18} className="text-gray-600" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                  </div>
                </div>

                {/* Bottom row: User Greeting & Gamification Wallet */}
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img src={userProfile.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-amber-400 object-cover" />
                      <div className="absolute -bottom-1 -right-1 bg-amber-400 p-0.5 rounded-full border border-white">
                        <Crown size={10} className="text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-gray-900 text-[13px] leading-tight">Chào, {userProfile.name}</h1>
                      <div className="flex items-center text-[11px] text-amber-600 font-medium mt-0.5">
                        {userProfile.rank} <ChevronRight size={12} className="ml-0.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-1.5 border border-amber-100 shadow-sm cursor-pointer hover:bg-amber-50">
                    <Coins size={14} className="text-amber-500" />
                    <span className="text-sm font-bold text-amber-600">{userProfile.coins}</span>
                  </div>
                </div>
              </header>
            )}

            {/* MAIN CONTENT SCROLLABLE */}
            <div className={`flex-1 overflow-y-auto hide-scrollbar pb-24 ${activeTab === 'chat' || activeTab === 'feed' || activeTab === 'shopping' ? 'bg-gray-50' : 'bg-gray-50'}`}>
              
              {/* === TAB CONTENT RENDERER === */}
              {activeTab === 'home' && (
                <div className="flex flex-col gap-5 pb-6">
                  
                  {/* 1. OFFERS TỪ DEALUS: VIP Membership Banner */}
                  <div className="px-4 pt-4">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-5 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
                      {/* Background Effects */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/0 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                            <Crown size={14} className="text-amber-400" />
                            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">DealUs VIP Club</span>
                          </div>
                          <span className="text-[10px] font-medium text-gray-400">Chỉ từ 99k/tháng</span>
                        </div>
                        
                        <h3 className="font-black text-xl leading-tight mb-2">Nâng cấp đặc quyền,<br/>mua sắm với giá sỉ.</h3>
                        <p className="text-xs text-gray-300 mb-5 max-w-[85%]">Giảm ngay 10% khi mua qua hệ thống, ưu tiên xem sớm các deal nội bộ.</p>
                        
                        <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 text-sm font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform flex items-center gap-2">
                          Nâng cấp ngay <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. SUPER-APP GRID MENU */}
                  <div className="px-4">
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 grid grid-cols-4 gap-y-5 gap-x-2">
                      {superAppActions.map(action => (
                        <button key={action.id} className="flex flex-col items-center gap-2 group">
                          <div className={`w-12 h-12 ${action.bg} rounded-[1rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            {action.icon}
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 text-center leading-tight px-1">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. SẢN PHẨM CÓ THỂ BẠN SẼ THÍCH */}
                  <div className="px-4">
                    <div className="flex justify-between items-end mb-3">
                      <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        <Sparkles size={18} className="text-blue-500" /> Có thể bạn sẽ thích
                      </h2>
                      <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('shopping');}} className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5">
                        Xem siêu thị <ChevronRight size={12}/>
                      </a>
                    </div>
                    
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x pb-2 -mx-4 px-4">
                      {shopRecommended.map(item => (
                        <div key={item.id} className="flex-none w-[160px] bg-white border border-gray-100 rounded-2xl p-2 shadow-sm snap-center flex flex-col">
                          <img src={item.img} alt={item.name} className="w-full h-28 object-cover rounded-xl mb-2" />
                          <h4 className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight mb-2">{item.name}</h4>
                          <div className="mt-auto">
                            <div className="text-rose-600 font-bold text-[13px]">{item.price}</div>
                            <div className="text-gray-400 text-[10px] line-through mb-1.5">{item.oldPrice}</div>
                            <div className="pt-2 border-t border-gray-50">
                              <span className="text-[9px] text-gray-500 flex items-center gap-1 line-clamp-1">
                                <ShieldCheck size={10} className="text-emerald-500 shrink-0"/> {item.agent}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. CHUYÊN GIA GIỎI ĐỀ XUẤT */}
                  <div className="px-4">
                    <div className="bg-gradient-to-b from-emerald-50 to-white rounded-3xl p-4 border border-emerald-100">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            <UserCheck size={18} className="text-emerald-600" /> Chuyên gia nổi bật
                          </h2>
                          <p className="text-[11px] text-gray-500 mt-0.5">Sẵn sàng tư vấn trực tiếp 1:1</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2">
                        {topAgents.map(agent => (
                          <div key={agent.id} className="flex-none w-[140px] bg-white border border-gray-100 rounded-2xl p-3 shadow-sm text-center flex flex-col items-center hover:border-emerald-200 transition-colors">
                            <div className="relative mb-2">
                              <img src={agent.img} alt={agent.name} className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400" />
                              <div className="absolute -bottom-1 inset-x-0 mx-auto w-fit bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                {agent.rank}
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xs">{agent.name}</h3>
                            <p className="text-[10px] text-gray-500 mb-2 line-clamp-1">{agent.role}</p>
                            
                            <div className="flex items-center justify-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-[10px] text-amber-700 font-bold mb-3 w-full">
                              <Star size={10} className="fill-amber-400 text-amber-400" />
                              {agent.rating}
                            </div>
                            
                            <button onClick={() => setActiveTab('chat')} className="w-full bg-emerald-50 text-emerald-700 text-[10px] font-bold py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                              Nhắn tin
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 5. CỘNG ĐỒNG NÓNG */}
                  <div className="px-4">
                    <div className="flex justify-between items-end mb-3">
                      <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        <Flame size={18} className="text-rose-500 fill-rose-100" /> Đang thảo luận
                      </h2>
                      <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('feed');}} className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5">
                        Vào Feed <ChevronRight size={12}/>
                      </a>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {feedRooms.slice(0, 2).map(room => (
                        <div key={room.id} onClick={() => setActiveTab('feed')} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-start gap-3 cursor-pointer hover:border-blue-200 transition-colors">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                            <Hash size={20} className="text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{room.title}</h3>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                              <span className="flex items-center gap-0.5"><Users size={12}/> {room.memberCount}</span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                              <span className="text-rose-500 font-bold">+{room.unreadCount} bài mới</span>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 self-center" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 6. BẠN BÈ & ĐỐI TÁC (REFERRAL GAMIFICATION) */}
                  <div className="px-4 mt-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-1 relative overflow-hidden shadow-lg shadow-blue-500/20">
                      <div className="bg-white/10 absolute inset-0 backdrop-blur-sm"></div>
                      <div className="bg-white rounded-[1.35rem] p-4 relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0 relative">
                          <Coins size={24} className="text-amber-500" />
                          <div className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full animate-ping opacity-75"></div>
                          <div className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-sm">Mời bạn bè, nhận Quà Khủng!</h3>
                          <p className="text-[11px] text-gray-500 leading-snug mt-0.5">Tặng ngay 500 Xu cho bạn & đối tác khi họ hoàn tất đăng ký.</p>
                        </div>
                        <button className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-md">
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* =========================================
                  MÀN HÌNH FEED (CỘNG ĐỒNG)
                  ========================================= */}
              {activeTab === 'feed' && (
                <div className="bg-gray-50 pb-8 min-h-full relative">
                  
                  {/* Feed Header */}
                  <div className="bg-white px-4 pt-6 pb-2 shadow-sm border-b border-gray-100 sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="font-black text-xl text-gray-900 tracking-tight">Khám phá <span className="text-blue-600">Cộng đồng</span></h2>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">Nơi người mua & chuyên gia cùng thảo luận</p>
                      </div>
                      <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
                        <Filter size={18} />
                      </button>
                    </div>
                    
                    {/* Filter Categories */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                      {feedCategories.map((cat, idx) => (
                        <button key={idx} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${idx === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feed List */}
                  <div className="px-4 py-4 flex flex-col gap-4">
                    {feedRooms.map(room => (
                      <div key={room.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col relative overflow-hidden group">
                        {/* Tags & Hot Badge */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-1.5">
                            {room.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-0.5">
                                <Hash size={10} className="text-gray-400"/> {tag}
                              </span>
                            ))}
                          </div>
                          {room.isHot && (
                            <div className="bg-rose-50 text-rose-600 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-rose-100">
                              <Flame size={12} className="fill-rose-100" /> Hot
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 pr-8">
                          {room.title}
                        </h3>

                        {/* Unread Badge Overlay */}
                        {room.unreadCount > 0 && (
                          <div className="absolute top-12 right-4 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                            +{room.unreadCount}
                          </div>
                        )}

                        {/* Agent Banner */}
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5 flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img src={room.activeAgent.avatar} className="w-8 h-8 rounded-full border border-emerald-200" alt="Agent"/>
                            <div>
                              <p className="text-[11px] text-gray-500 leading-none mb-1">Được quản trị & tư vấn bởi</p>
                              <p className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                                {room.activeAgent.name} <ShieldCheck size={12} className="text-emerald-500" />
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{room.activeAgent.role}</span>
                        </div>

                        {/* Latest Post Snippet */}
                        <div className="bg-gray-50 rounded-xl p-3 flex gap-3 items-start border border-gray-100">
                          <img src={room.latestPost.userAvatar} className="w-6 h-6 rounded-full mt-0.5 shrink-0" alt="User"/>
                          <div>
                            <p className="text-[11px] font-bold text-gray-700 mb-0.5">{room.latestPost.userName}</p>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">"{room.latestPost.content}"</p>
                          </div>
                        </div>

                        {/* Footer Info & Action */}
                        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                            <Users size={14} className="text-gray-400" /> {room.memberCount} thành viên
                          </div>
                          <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-gray-800 transition-colors flex items-center gap-1.5">
                            <MessageCircleQuestion size={14} /> Tham gia ngay
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Floating Action Button (Create Post) */}
                  <button className="absolute bottom-6 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform z-20 border-2 border-white">
                    <Edit3 size={24} />
                  </button>
                </div>
              )}

              {/* =========================================
                  MÀN HÌNH CHAT (TIN NHẮN & CUỘC GỌI)
                  ========================================= */}
              {activeTab === 'chat' && (
                <div className="bg-gray-50 pb-8 min-h-full">
                  
                  {/* Chat Header */}
                  <div className="bg-white px-4 pt-6 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-10">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="font-black text-xl text-gray-900 tracking-tight">Tin nhắn & Tư vấn</h2>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">Hỗ trợ chốt deal trực tiếp từ Chuyên gia</p>
                      </div>
                      <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
                        <PhoneCall size={18} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Tìm tin nhắn, tên môi giới..." 
                        className="w-full bg-gray-50 text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none border border-gray-100 focus:border-blue-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Security Banner (Ẩn số điện thoại) */}
                  <div className="px-4 mt-4">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-start gap-3">
                      <div className="bg-indigo-100 p-1.5 rounded-lg shrink-0">
                        <Lock size={16} className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-indigo-900 mb-0.5">Bảo mật ẩn số tuyệt đối</h3>
                        <p className="text-[10px] text-indigo-700 leading-snug">Toàn bộ cuộc gọi và tin nhắn trên DealUs đều được mã hóa, không lộ số điện thoại cá nhân của bạn cho đối tác.</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Filters */}
                  <div className="flex gap-2 px-4 mt-4 overflow-x-auto hide-scrollbar">
                    <button onClick={() => setChatFilter('all')} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${chatFilter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                      Tất cả
                    </button>
                    <button onClick={() => setChatFilter('unread')} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${chatFilter === 'unread' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                      Chưa đọc (3)
                    </button>
                    <button onClick={() => setChatFilter('agents')} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${chatFilter === 'agents' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                      Chuyên gia
                    </button>
                  </div>

                  {/* Chat List */}
                  <div className="mt-4 flex flex-col">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className="px-4 py-3 flex gap-3 hover:bg-white transition-colors cursor-pointer group border-b border-gray-100/50 last:border-0">
                        
                        {/* Avatar & Online Status */}
                        <div className="relative shrink-0">
                          <img src={chat.avatar} alt={chat.name} className={`w-14 h-14 rounded-full object-cover ${chat.isAgent ? 'border-2 border-emerald-400' : 'border border-gray-200'}`} />
                          {chat.isOnline && (
                            <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-1.5 truncate pr-2">
                              <h3 className={`text-sm truncate ${chat.unread > 0 ? 'font-black text-gray-900' : 'font-bold text-gray-800'}`}>
                                {chat.name}
                              </h3>
                              {chat.isAgent && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                            </div>
                            <span className={`text-[10px] shrink-0 mt-0.5 ${chat.unread > 0 ? 'font-bold text-blue-600' : 'font-medium text-gray-400'}`}>
                              {chat.time}
                            </span>
                          </div>

                          <p className={`text-xs line-clamp-1 mb-1.5 ${chat.unread > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                            {chat.lastMsg}
                          </p>

                          {/* Context & Badges */}
                          <div className="flex items-center justify-between mt-auto">
                            <div className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold truncate max-w-[75%]">
                              {chat.context}
                            </div>
                            
                            {/* Unread / Read indicator */}
                            {chat.unread > 0 ? (
                              <div className="bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                                {chat.unread}
                              </div>
                            ) : (
                              <CheckCheck size={14} className="text-blue-500 shrink-0" />
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}
              
              {/* =========================================
                  MÀN HÌNH MUA SẮM (SIÊU THỊ DEALUS)
                  ========================================= */}
              {activeTab === 'shopping' && (
                <div className="bg-gray-50 pb-8">
                  
                  {/* Banner Siêu thị & Thanh Danh Mục */}
                  <div className="bg-white px-4 pt-4 pb-2 shadow-sm border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="font-black text-xl text-gray-900 tracking-tight">Siêu thị <span className="text-blue-600">DealUs</span></h2>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">Sản phẩm giá sỉ trực tiếp từ đại lý</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center relative">
                        <ShoppingCart size={20} className="text-blue-600" />
                        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                      {shopCategories.map((cat, idx) => (
                        <button key={idx} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border ${idx === 0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 1. Đề xuất cho bạn (Horizontal Scroll) */}
                  <div className="mt-4 px-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-3">
                      <Sparkles size={20} className="text-amber-500" /> Đề xuất cho bạn
                    </h3>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x pb-2">
                      {shopRecommended.map(item => (
                        <div key={item.id} className="flex-none w-[180px] bg-white border border-gray-100 rounded-2xl p-2 shadow-sm snap-center flex flex-col">
                          <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                          <div className="flex-1 flex flex-col">
                            <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-2">{item.name}</h4>
                            <div className="mt-auto">
                              <div className="text-rose-600 font-bold text-sm">{item.price}</div>
                              <div className="text-gray-400 text-[10px] line-through">{item.oldPrice}</div>
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                <span className="text-[9px] text-gray-500 flex items-center gap-1 line-clamp-1"><ShieldCheck size={10} className="text-emerald-500"/> {item.agent}</span>
                                <button className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 hover:bg-blue-600 hover:text-white transition-colors">
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Đang hot (Grid 2 cột) */}
                  <div className="mt-6 px-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-3">
                      <Flame size={20} className="text-rose-500 fill-rose-100" /> Đang hot
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {shopHot.map(item => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm flex flex-col relative">
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full z-10 flex items-center gap-1">
                            <Flame size={10} className="text-rose-400" /> Hot
                          </div>
                          <img src={item.img} alt={item.name} className="w-full h-28 object-cover rounded-xl mb-2" />
                          <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">{item.name}</h4>
                          <div className="mt-auto flex items-end justify-between">
                            <div>
                              <div className="text-blue-600 font-bold text-sm">{item.price}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{item.sold}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Giảm giá nhiều (Big Discount Badges) */}
                  <div className="mt-6 bg-rose-50 py-6 px-4 border-y border-rose-100">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        <Percent size={20} className="text-white bg-rose-500 rounded-full p-0.5" /> Giảm giá sâu
                      </h3>
                      <a href="#" className="text-xs text-rose-600 font-bold">Xem tất cả &gt;</a>
                    </div>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                      {shopDiscount.map(item => (
                        <div key={item.id} className="flex-none w-36 bg-white border border-rose-100 rounded-2xl p-2 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 bg-rose-500 text-white font-black text-xs px-2 py-1 rounded-bl-xl z-10">
                            {item.discount}
                          </div>
                          <img src={item.img} alt={item.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                          <h4 className="text-[11px] font-medium text-gray-800 line-clamp-2 leading-snug mb-1">{item.name}</h4>
                          <div className="text-rose-600 font-bold text-sm">{item.price}</div>
                          <div className="text-gray-400 text-[10px] line-through">{item.oldPrice}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Được quan tâm nhiều (Vertical List) */}
                  <div className="mt-6 px-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-3">
                      <Eye size={20} className="text-blue-500" /> Được quan tâm nhiều
                    </h3>
                    <div className="flex flex-col gap-3">
                      {shopPopular.map(item => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center gap-3">
                          <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">{item.name}</h4>
                            <div className="text-amber-600 font-bold text-sm mb-1">{item.price}</div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-gray-500 flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                <Heart size={10} className="text-gray-400" /> {item.views}
                              </span>
                              <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full shrink-0">
                                Nhờ tư vấn
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'profile' && (
                <div className="p-8 text-center flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-2">
                    <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-xl font-bold">{userProfile.name}</h2>
                  <p className="text-gray-500 text-sm">Quản lý hồ sơ và xác thực</p>
                  
                  <div className="w-full max-w-xs mt-4">
                    <button onClick={() => setIsAuthenticated(false)} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                      Đăng xuất an toàn
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* BOTTOM NAVIGATION (FIXED) - REDESIGNED */}
            <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-20 pb-safe">
              <NavItem icon={<Home size={22} />} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <NavItem icon={<Globe size={22} />} label="Feed" isActive={activeTab === 'feed'} onClick={() => setActiveTab('feed')} />
              
              {/* Main Action Button (Chat Hub) */}
              <div className="relative -top-5">
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform border-4 border-white ${
                    activeTab === 'chat' 
                    ? 'bg-gray-900 text-white shadow-gray-500/30 scale-105' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 hover:scale-105'
                  }`}
                >
                  <MessageSquare size={24} />
                  {/* Global unread indicator */}
                  {activeTab !== 'chat' && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full"></span>
                  )}
                </button>
                <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold ${activeTab === 'chat' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Chat
                </span>
              </div>

              <NavItem icon={<ShoppingBag size={22} />} label="Mua sắm" isActive={activeTab === 'shopping'} onClick={() => setActiveTab('shopping')} />
              <NavItem icon={<User size={22} />} label="Cá nhân" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            </nav>
          </>
        )}

      </div>
      
      {/* Global CSS to hide scrollbars for cleaner UI */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom), 12px); }
      `}} />
    </div>
  );
}

// Sub-component for Bottom Nav Items
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {React.cloneElement(icon, { 
        className: isActive ? 'text-blue-600' : '',
        strokeWidth: isActive ? 2.5 : 2
      })}
      <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}
