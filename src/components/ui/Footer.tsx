import Link from 'next/link';
import { Logo } from './Logo';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      marginTop: 80,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 40, alignItems: 'start' }}>
          {/* Brand */}
          <div>
            <Logo />
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.3)', marginTop: 14, lineHeight: 1.65, maxWidth: 280 }}>
              A free, curated collection of premium animated UI components for modern web development.
            </p>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.18)', marginTop: 16 }}>
              Created by{' '}
              <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>Supriyo Sen</span>
            </p>
          </div>

          {/* Product links */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>
              Product
            </p>
            {[
              { label: 'Components', href: '/components' },
              { label: 'Home', href: '/' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.15s ease' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>
              Connect
            </p>
            {[
              { label: 'GitHub', href: 'https://github.com', icon: <Github size={13} /> },
              { label: 'Twitter', href: 'https://twitter.com', icon: <Twitter size={13} /> },
            ].map(({ label, href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', marginBottom: 10 }}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} FlowKit · Built with ♥ by Supriyo Sen
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>
            Free to use · No attribution required
          </p>
        </div>
      </div>
    </footer>
  );
}
