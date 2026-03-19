import React from 'react';

export default function DealusLogo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { container: 'w-8 h-8', svg: 'w-5 h-5' },
    md: { container: 'w-12 h-12', svg: 'w-7 h-7' },
    lg: { container: 'w-16 h-16', svg: 'w-8 h-8' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`${s.container} rounded-2xl bg-white shadow-2xl shadow-blue-500/20 flex items-center justify-center border border-white/60 relative backdrop-blur-md ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-5" />
      <svg viewBox="0 0 100 100" className={`${s.svg} text-blue-600`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <g transform="translate(50,50)">
          <g transform="rotate(0) translate(33,0) rotate(180)"><path d="M 0,-22 L 0,22 M 0,-22 A 22,22 0 0,1 0,22"/></g>
          <g transform="rotate(120) translate(33,0) rotate(180)"><path d="M 0,-22 L 0,22 M 0,-22 A 22,22 0 0,1 0,22"/></g>
          <g transform="rotate(240) translate(33,0) rotate(180)"><path d="M 0,-22 L 0,22 M 0,-22 A 22,22 0 0,1 0,22"/></g>
          <circle cx="0" cy="0" r="4" fill="currentColor" stroke="none"/>
        </g>
      </svg>
    </div>
  );
}

export function DealusLogoIcon({ className = 'w-5 h-5', color = 'text-white' }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} ${color}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <g transform="translate(50,50)">
        <g transform="rotate(0) translate(33,0) rotate(180)"><path d="M 0,-22 L 0,22 M 0,-22 A 22,22 0 0,1 0,22"/></g>
        <g transform="rotate(120) translate(33,0) rotate(180)"><path d="M 0,-22 L 0,22 M 0,-22 A 22,22 0 0,1 0,22"/></g>
        <g transform="rotate(240) translate(33,0) rotate(180)"><path d="M 0,-22 L 0,22 M 0,-22 A 22,22 0 0,1 0,22"/></g>
        <circle cx="0" cy="0" r="4" fill="currentColor" stroke="none"/>
      </g>
    </svg>
  );
}
