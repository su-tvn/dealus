import React, { useState } from 'react';
import { Phone, ArrowRight, Coins } from 'lucide-react';
import DealusLogo from '../components/common/DealusLogo';
import { ROLES, ROLE_LABELS } from '../constants/roles';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { handleLogin } = useAuth();
  const [demoRole, setDemoRole] = useState(ROLES.USER);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(demoRole);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto relative z-0">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-md absolute top-0 left-1/2 -translate-x-1/2 animate-[spin_20s_linear_infinite]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="fancy-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          <circle cx="200" cy="100" r="90" fill="#3b82f6" filter="url(#fancy-blur)" className="animate-pulse opacity-40" style={{ animationDuration: '4s' }}/>
          <circle cx="280" cy="220" r="100" fill="#8b5cf6" filter="url(#fancy-blur)" className="animate-pulse opacity-30" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
          <circle cx="120" cy="200" r="80" fill="#0ea5e9" filter="url(#fancy-blur)" className="animate-pulse opacity-40" style={{ animationDuration: '6s', animationDelay: '2s' }}/>
        </svg>
      </div>

      {/* Logo & Title */}
      <div className="relative w-full pt-20 pb-10 flex flex-col items-center justify-center min-h-[220px] z-10">
        <div className="flex flex-col items-center gap-5">
          <DealusLogo size="lg" />
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

        {/* Gift Banner */}
        <div className="bg-gradient-to-r from-white to-amber-50/50 rounded-2xl p-3.5 flex items-center gap-3 mb-6 border border-amber-100/60 shadow-sm backdrop-blur-md">
          <div className="bg-gradient-to-br from-amber-400 to-orange-400 p-2 rounded-xl shadow-inner shadow-white/20">
            <Coins size={18} className="text-white drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-sm">Nhận 100 Xu Đổi Quà</h3>
            <p className="text-[11px] text-amber-700/80 mt-0.5 font-medium">Đặc quyền dành riêng cho lần đăng nhập đầu tiên!</p>
          </div>
        </div>

        {/* Phone input form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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

          {/* Demo role selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wider">Chế độ Demo — Vai trò</label>
            <select
              value={demoRole}
              onChange={(e) => setDemoRole(e.target.value)}
              className="w-full bg-white/80 border border-gray-200 text-gray-800 font-semibold rounded-2xl py-3.5 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm appearance-none cursor-pointer"
            >
              {Object.values(ROLES).map((r) => (
                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold text-[15px] py-4 rounded-2xl shadow-xl shadow-gray-900/15 hover:bg-gray-800 hover:-translate-y-0.5 active:scale-95 transition-all mt-2 flex justify-center items-center gap-2"
          >
            Tiếp tục <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
          <span className="relative bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Hoặc đăng nhập với</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button type="button" onClick={onSubmit} className="flex items-center justify-center gap-2 border border-gray-100 bg-white rounded-2xl py-3.5 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-[13px] font-bold text-gray-600">Google</span>
          </button>
          <button type="button" onClick={onSubmit} className="flex items-center justify-center gap-2 border border-gray-100 bg-white rounded-2xl py-3.5 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook" className="w-5 h-5" />
            <span className="text-[13px] font-bold text-gray-600">Facebook</span>
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-400 p-6 mt-auto relative z-10">
        Bằng việc tiếp tục, bạn đồng ý với <br />
        <a href="#" className="text-gray-600 font-bold underline decoration-gray-300 underline-offset-2 hover:text-blue-600 transition-colors">Điều khoản</a>
        {' '}& <a href="#" className="text-gray-600 font-bold underline decoration-gray-300 underline-offset-2 hover:text-blue-600 transition-colors">Bảo mật</a> của DealUs.
      </p>
    </div>
  );
}
