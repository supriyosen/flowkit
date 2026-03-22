'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const componentMap = {
  'financial-analytics-dashboard': dynamic(
    () => import('@/components/library/financial-dashboard/index'),
    { ssr: false }
  ),
  'calendar-widget': dynamic(
    () => import('@/components/library/calendar-widget/index'),
    { ssr: false }
  ),
} as const;

interface LivePreviewProps {
  slug: string;
  scale?: number;
}

export function LivePreview({ slug, scale = 0.28 }: LivePreviewProps) {
  const Component = componentMap[slug as keyof typeof componentMap];
  if (!Component) return null;

  const inverseScale = 1 / scale;
  const pct = `${inverseScale * 100}%`;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      borderRadius: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: pct,
        flexShrink: 0,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </div>
    </div>
  );
}
