'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Zap, Code2, Copy, Eye, Sparkles,
  Github, Globe, ChevronRight, Layers
} from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { ComponentCard } from '@/components/ui/ComponentCard';
import { components } from '@/lib/registry';

function AnimatedGradientBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Large glow blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
      }} />
    </div>
  );
}

function StatTicker() {
  const stats = [
    { value: components.length, suffix: '', label: 'Components' },
    { value: 100, suffix: '%', label: 'Free Forever' },
    { value: 0, suffix: '', label: 'Account Required' },
    { value: 2, suffix: '+', label: 'Dependencies' },
  ];

  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '20px 0',
      marginBottom: 0,
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 0, justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 24px' }}>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 28,
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
              }}>
                {s.value}{s.suffix}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div style={{
      padding: '28px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16,
      transition: 'all 0.2s ease',
    }}
    className="component-card">
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: 'rgba(99,102,241,0.1)',
        border: '1px solid rgba(99,102,241,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        color: '#818cf8',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 17,
        fontWeight: 700,
        color: 'white',
        marginBottom: 10,
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
        {description}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{ width: 16, height: 2, background: 'linear-gradient(90deg, #6366f1, #06b6d4)', borderRadius: 1 }} />
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
        {children}
      </span>
    </div>
  );
}

export default function HomePage() {
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({});
  const featuredRef = useRef(null);
  const featuresRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-80px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });

  useEffect(() => {
    fetch('/api/track-usage').then(r => r.json()).then(setUsageCounts).catch(() => {});
  }, []);

  const featured = components.filter(c => c.featured).slice(0, 3);
  const recent = components.slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatedGradientBg />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px 80px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 100, border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.08)', marginBottom: 28, cursor: 'default' }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1' }} />
            <span style={{ fontSize: 13, color: '#a5b4fc', fontWeight: 500 }}>Open source · Free forever · No account needed</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(44px, 7vw, 84px)',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
              marginBottom: 22,
            }}
          >
            Components
            <br />
            <span className="gradient-text">built to move.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 540,
              margin: '0 auto 40px',
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            A curated vault of premium animated UI components.
            Browse, preview live, and copy code into your project — instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/components" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(99,102,241,0.3)',
              transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
            }}>
              Browse Components
              <ArrowRight size={16} />
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 24px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.65)',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
            }}>
              <Github size={16} />
              Star on GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─── STATS TICKER ─── */}
      <StatTicker />

      {/* ─── TRENDING / FEATURED ─── */}
      <div ref={featuredRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}
        >
          <div>
            <SectionLabel>Trending This Week</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
            }}>
              Most Used Components
            </h2>
          </div>
          <Link href="/components" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
            padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
            transition: 'all 0.15s ease',
          }}>
            View all <ChevronRight size={14} />
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {featured.map((comp, i) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ComponentCard component={comp} usageCount={usageCounts[comp.slug] || 0} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── RECENTLY ADDED ─── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <SectionLabel>Recently Added</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
            }}>
              Fresh from the Vault
            </h2>
          </div>
          <Link href="/components" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
            padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
          }}>
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {recent.map((comp, i) => (
            <motion.div key={comp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
              <ComponentCard component={comp} usageCount={usageCounts[comp.slug] || 0} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <div ref={featuresRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <SectionLabel>Why FlowKit</SectionLabel>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.025em',
            marginTop: 8,
          }}>
            Built for builders.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {[
            {
              icon: <Eye size={20} />,
              title: 'Live Preview',
              description: 'See every animation and interaction running live before you copy. No surprises.',
            },
            {
              icon: <Copy size={20} />,
              title: 'One-Click Copy',
              description: 'Copy the full React + Tailwind component code instantly. Paste and ship.',
            },
            {
              icon: <Zap size={20} />,
              title: 'Zero Setup',
              description: 'No accounts, no npm installs, no tokens. Just open, copy, and build.',
            },
            {
              icon: <Code2 size={20} />,
              title: 'Clean Code',
              description: 'Every component uses framer-motion and Tailwind CSS — modern, readable, production-ready.',
            },
            {
              icon: <Layers size={20} />,
              title: 'Always Growing',
              description: 'New components added regularly. From dashboards to hero sections and beyond.',
            },
            {
              icon: <Globe size={20} />,
              title: 'Use Anywhere',
              description: 'React, Next.js, Remix, Vite — if it runs React, it runs FlowKit components.',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── CTA BANNER ─── */}
      <div style={{ maxWidth: 1280, margin: '80px auto 0', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.06) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 20,
            padding: 'clamp(36px, 5vw, 60px)',
            textAlign: 'center',
          }}
        >
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(24px, 4vw, 44px)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.025em',
            marginBottom: 14,
          }}>
            Start building today.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', marginBottom: 32, lineHeight: 1.6 }}>
            Browse all components, pick what you need, and ship faster.
          </p>
          <Link href="/components" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white',
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 0 40px rgba(99,102,241,0.25)',
            fontFamily: 'Inter, sans-serif',
          }}>
            Browse Components <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
