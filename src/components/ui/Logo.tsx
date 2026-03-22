'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const pathname = usePathname();
  const iconSize = size === 'small' ? 28 : size === 'large' ? 40 : 32;
  const textSize = size === 'large' ? 22 : size === 'small' ? 15 : 18;

  return (
    <Link href="/" onClick={() => { if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <div style={{ width: iconSize, height: iconSize, flexShrink: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="fkbg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#06b6d4"/>
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="7" fill="url(#fkbg)"/>
          <path d="M7 9h9M7 9v14M7 16h7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 9v14M19 16l7-7M19 16l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: textSize,
        color: 'white',
        letterSpacing: '-0.02em',
      }}>
        FlowKit
      </span>
    </Link>
  );
}
