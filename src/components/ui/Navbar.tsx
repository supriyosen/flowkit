'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
      background: scrolled ? 'rgba(6,6,10,0.94)' : 'rgba(6,6,10,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transition: 'all 0.2s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { href: '/', label: 'Home' },
            { href: '/components', label: 'Components' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => { if (href === '/' && pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{
              color: pathname === href ? 'rgba(244,244,248,0.9)' : 'rgba(244,244,248,0.45)',
              fontSize: 14,
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: 8,
              textDecoration: 'none',
              background: pathname === href ? 'rgba(255,255,255,0.06)' : 'transparent',
              transition: 'all 0.15s ease',
            }}>
              {label}
            </Link>
          ))}

          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />

          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(244,244,248,0.45)',
            fontSize: 13,
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.15s ease',
          }}>
            <Github size={14} />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
