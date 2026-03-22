'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, Copy } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { CodeViewer } from '@/components/ui/CodeViewer';
import { getComponent } from '@/lib/registry';
import FinancialDashboard from '@/components/library/financial-dashboard/index';
import { financialDashboardCode } from '@/components/library/financial-dashboard/code';
import CalendarWidget from '@/components/library/calendar-widget/index';
import { calendarWidgetCode } from '@/components/library/calendar-widget/code';

const componentMap: Record<string, React.ComponentType> = {
  'financial-analytics-dashboard': FinancialDashboard,
  'calendar-widget': CalendarWidget,
};

const codeMap: Record<string, string> = {
  'financial-analytics-dashboard': financialDashboardCode,
  'calendar-widget': calendarWidgetCode,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ComponentPage({ params }: PageProps) {
  const { slug } = use(params);
  const component = getComponent(slug);

  if (!component) notFound();

  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    fetch('/api/track-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).then(r => r.json()).then(d => setUsageCount(d.count || 0)).catch(() => {});
  }, [slug]);

  const PreviewComponent = componentMap[slug];
  const code = codeMap[slug] || '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', fontSize: 14, textDecoration: 'none', marginBottom: 32, transition: 'color 0.15s ease' }}>
          <ArrowLeft size={16} />
          Back to components
        </Link>

        {/* How to use banner */}
        <div suppressHydrationWarning style={{
          background: 'rgba(52,211,153,0.05)',
          border: '1px solid rgba(52,211,153,0.12)',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Developers:</strong> Click the <strong style={{ color: '#a78bfa' }}>Code</strong> tab → copy → drop into your React/Next.js project. Requires{' '}
              <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>framer-motion</code> and{' '}
              <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>lucide-react</code>.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Vibe coders:</strong> Copy the code → paste it into <strong style={{ color: '#a78bfa' }}>Claude, ChatGPT, or Cursor</strong> → say <em style={{ color: 'rgba(255,255,255,0.4)' }}>"add this component to my project and make it work"</em>. The AI handles the rest.
            </p>
          </div>
        </div>

        {/* Preview/Code tabs */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 4 }}>
            {(['preview', 'code'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '7px 20px',
                  borderRadius: 7,
                  border: 'none',
                  background: activeTab === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.35)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textTransform: 'capitalize',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {tab === 'preview' ? '◉ Preview' : '‹› Code'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'preview' ? (
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: slug === 'calendar-widget' ? 0 : 500,
              background: '#050508',
            }}
          >
            {PreviewComponent && <PreviewComponent />}
          </div>
        ) : (
          <div>
            <CodeViewer code={code} />
          </div>
        )}

        {/* Header / Description */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)', fontWeight: 500,
                }}>
                  {component.category}
                </span>
                <span style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 6,
                  background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                  color: '#a78bfa', fontWeight: 600,
                }}>
                  {component.complexity}
                </span>
              </div>
              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(24px, 4vw, 40px)',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
                marginBottom: 12,
                lineHeight: 1.1,
              }}>
                {component.name}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 600, lineHeight: 1.6 }}>
                {component.longDescription}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                  <Eye size={14} />
                  <span style={{ fontWeight: 600, color: 'white' }}>{usageCount.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>uses</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                  <Copy size={14} />
                  <span style={{ fontWeight: 600, color: '#34d399' }}>Free</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>forever</div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
            {component.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11.5, padding: '4px 10px', borderRadius: 6,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
