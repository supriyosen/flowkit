'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { ComponentCard } from '@/components/ui/ComponentCard';
import { components, allTags, searchComponents } from '@/lib/registry';

export default function ComponentsPage() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({});
  const [filtered, setFiltered] = useState(components);

  useEffect(() => {
    fetch('/api/track-usage').then(r => r.json()).then(setUsageCounts).catch(() => {});
  }, []);

  useEffect(() => {
    const tag = activeTag === 'All' ? undefined : activeTag.toLowerCase();
    setFiltered(searchComponents(query, tag));
  }, [query, activeTag]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
        >
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: 10,
          }}>
            All Components
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            {components.length} premium animated components — free to copy and use in any project.
          </p>
        </motion.div>

        {/* Search + filters bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
            <Search size={15} style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.3)',
            }} />
            <input
              type="text"
              placeholder="Search components..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px 11px 40px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                color: 'white',
                fontSize: 14,
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          {/* Tag filter pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 100,
                  border: activeTag === tag ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.07)',
                  background: activeTag === tag ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                  color: activeTag === tag ? '#818cf8' : 'rgba(255,255,255,0.4)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            {filtered.length} {filtered.length === 1 ? 'component' : 'components'}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {filtered.map((comp, i) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <ComponentCard component={comp} usageCount={usageCounts[comp.slug] || 0} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>◎</div>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>No components found</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.1)' }}>Try a different search term or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
