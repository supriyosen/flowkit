'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Copy } from 'lucide-react';
import { ComponentEntry } from '@/lib/registry';
import { LivePreview } from './LivePreview';

interface ComponentCardProps {
  component: ComponentEntry;
  usageCount?: number;
}

export function ComponentCard({ component, usageCount = 0 }: ComponentCardProps) {
  // mounted ensures the thumbnail renders identically on server and client
  // initial render (used for hydration) — both server and client render nothing inside the thumbnail.
  // After hydration, useEffect fires and fills in the live preview.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <Link href={`/components/${component.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        className="component-card"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        }}
      >
        {/* Live Thumbnail — card-thumbnail CSS class gives the 16:9 ratio */}
        <div className="card-thumbnail" style={{ background: component.gradient }}>
          {mounted && (
            <div className="card-thumbnail-inner">
              <LivePreview slug={component.slug} scale={component.previewScale ?? 0.28} />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(6,6,10,0.5) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />

              {/* Category badge */}
              <div style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '3px 8px',
                fontSize: 11,
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 500,
                zIndex: 2,
              }}>
                {component.category}
              </div>

              {component.featured && (
                <div style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.7), rgba(6,182,212,0.5))',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: 6,
                  padding: '3px 8px',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 600,
                  zIndex: 2,
                }}>
                  Featured
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '16px 18px 18px' }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--text-primary)',
            marginBottom: 6,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            {component.name}
          </h3>
          <p style={{
            fontSize: 12.5,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: 14,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {component.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
            {component.tags.slice(0, 4).map(tag => (
              <span key={tag} style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 4,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--text-muted)',
                textTransform: 'lowercase',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                <Eye size={12} /> {usageCount.toLocaleString()}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                <Copy size={12} /> Free
              </span>
            </div>
            <span style={{
              fontSize: 11,
              color: component.accentColor,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {component.complexity}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
