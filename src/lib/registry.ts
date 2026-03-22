export interface ComponentEntry {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  complexity: 'simple' | 'medium' | 'complex';
  featured: boolean;
  gradient: string;
  accentColor: string;
  createdAt: string;
  /** Scale used for the thumbnail card preview. Defaults to 0.28 if omitted. */
  previewScale?: number;
}

export const components: ComponentEntry[] = [
  {
    id: 'calendar-widget',
    slug: 'calendar-widget',
    name: 'Calendar Widget',
    description: 'Compact dark calendar widget with animated date display, color-coded upcoming events, breathing glow, and a quick-add popup.',
    longDescription: 'A sleek dark-theme calendar widget featuring an animated date panel with a breathing blue glow, staggered event rows with colored accent bars and hover highlights, and a spinning neon-ring "+" button that opens a quick-add popup. Ideal for productivity apps, dashboards, or any UI that needs an elegant schedule summary.',
    tags: ['calendar', 'widget', 'schedule', 'events', 'dark', 'animated', 'glow', 'cards', 'productivity', 'popup', 'hover', 'neon', 'compact', 'dashboard'],
    category: 'Widget',
    complexity: 'medium',
    featured: true,
    gradient: 'linear-gradient(135deg, #1b2145 0%, #0e1330 50%, #1b2145 100%)',
    accentColor: '#6366f1',
    createdAt: '2026-03-23',
    previewScale: 0.62,
  },
  {
    id: 'financial-analytics-dashboard',
    slug: 'financial-analytics-dashboard',
    name: 'Financial Analytics Dashboard',
    description: 'Dark financial SaaS analytics section with animated metric cards, glowing bar charts, and real-time telemetry visuals.',
    longDescription: 'A premium dark-theme financial analytics dashboard section featuring animated metric cards with counter animations, a glowing green bar chart, asset allocation donut chart, liquidity velocity metrics, and particle background effects. Perfect for fintech landing pages, investor dashboards, or institutional product showcases.',
    tags: ['dashboard', 'analytics', 'finance', 'dark', 'charts', 'metrics', 'fintech', 'animated', 'bar-chart', 'donut-chart', 'cards', 'gradient', 'glow', 'data-visualization', 'saas', 'institutional', 'investment'],
    category: 'Dashboard',
    complexity: 'complex',
    featured: true,
    gradient: 'linear-gradient(135deg, #051505 0%, #0a1a0a 40%, #050f10 100%)',
    accentColor: '#34d399',
    createdAt: '2024-03-22',
  },
];

export function getComponent(slug: string): ComponentEntry | undefined {
  return components.find(c => c.slug === slug);
}

export function searchComponents(query: string, tag?: string): ComponentEntry[] {
  let results = components;

  if (tag) {
    results = results.filter(c => c.tags.includes(tag.toLowerCase()));
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.includes(q))
    );
  }

  return results;
}

export const allTags = [
  'All', 'Dashboard', 'Widget', 'Hero', 'Cards', 'Charts', 'Analytics',
  'Finance', 'Animated', 'Dark', 'Gradient', 'Fintech', 'Calendar', 'Productivity'
];
