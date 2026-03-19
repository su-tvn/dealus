import React from 'react';

export default function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {React.cloneElement(icon, {
        className: isActive ? 'text-blue-600' : '',
        strokeWidth: isActive ? 2.5 : 2,
      })}
      <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}
