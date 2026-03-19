import React from 'react';
import { ShoppingCart, Sparkles, Flame, Percent, Eye, Heart, ShieldCheck, Plus } from 'lucide-react';
import { shopCategories, shopRecommended, shopHot, shopDiscount, shopPopular } from '../data/mockShop';

export default function ShoppingScreen() {
  return (
    <div className="bg-gray-50 pb-8">

      {/* Header */}
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

      {/* Recommended */}
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

      {/* Hot */}
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

      {/* Discount */}
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

      {/* Popular */}
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
  );
}
