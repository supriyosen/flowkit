'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 50, stiffness: 200 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on('change', v => {
      setDisplay(Math.round(v).toLocaleString());
    });
  }, [spring]);

  return <span ref={ref}>{display}</span>;
}

function CandlestickChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const H = 72;
  const norm = (v: number) => (v / 100) * H;

  const candles = [
    { open: 20, close: 55, high: 65, low: 10 },
    { open: 55, close: 35, high: 70, low: 30 },
    { open: 35, close: 65, high: 75, low: 25 },
    { open: 65, close: 45, high: 80, low: 40 },
    { open: 45, close: 75, high: 88, low: 35 },
    { open: 75, close: 55, high: 90, low: 50 },
    { open: 55, close: 80, high: 95, low: 45 },
    { open: 80, close: 60, high: 92, low: 55 },
    { open: 60, close: 85, high: 100, low: 50 },
    { open: 85, close: 70, high: 98, low: 65 },
  ];

  return (
    <div ref={ref} style={{ display: 'flex', gap: 4, height: H }}>
      {candles.map((c, i) => {
        const up = c.close >= c.open;
        const bodyLow = Math.min(c.open, c.close);
        const bodyHigh = Math.max(c.open, c.close);
        return (
          <div key={i} style={{ flex: 1, position: 'relative', height: '100%' }}>
            {/* Wick */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 1,
                bottom: norm(c.low),
                background: up ? 'rgba(52,211,153,0.65)' : 'rgba(52,211,153,0.18)',
              }}
              initial={{ height: 0 }}
              animate={inView ? { height: norm(c.high - c.low) } : { height: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
            />
            {/* Body */}
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: norm(bodyLow),
                background: up ? 'linear-gradient(to top, #16a34a, #34d399)' : 'rgba(52,211,153,0.1)',
                border: up ? 'none' : '1px solid rgba(52,211,153,0.2)',
                borderRadius: 2,
                boxShadow: up ? '0 0 5px rgba(52,211,153,0.4)' : 'none',
              }}
              initial={{ height: 0 }}
              animate={inView ? { height: Math.max(norm(bodyHigh - bodyLow), 3) } : { height: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            />
          </div>
        );
      })}
    </div>
  );
}

function SegmentedBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const rows = [{ filled: 4 }, { filled: 2 }, { filled: 3 }, { filled: 6 }];
  const total = 8;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: total }).map((_, si) => (
            <motion.div
              key={si}
              style={{
                flex: 1,
                height: 7,
                borderRadius: 3,
                background: si < row.filled
                  ? 'linear-gradient(90deg, #16a34a, #34d399)'
                  : 'rgba(255,255,255,0.07)',
                boxShadow: si < row.filled ? '0 0 4px rgba(52,211,153,0.35)' : 'none',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.35, delay: ri * 0.08 + si * 0.03, ease: 'easeOut' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Bars3D() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const bars = [42, 68, 52, 83, 61, 90, 55, 78, 70];

  return (
    <div ref={ref} style={{ display: 'flex', gap: 5, height: 80, alignItems: 'flex-end' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          {/* Side face for 3D effect */}
          <motion.div
            style={{
              position: 'absolute',
              right: -4,
              bottom: 0,
              width: 4,
              background: 'linear-gradient(to top, #052e11, #14532d)',
              borderRadius: '0 2px 0 0',
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : { height: 0 }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          />
          {/* Front face */}
          <motion.div
            style={{
              width: '100%',
              background: 'linear-gradient(to top, #14532d 0%, #15803d 40%, #22c55e 80%, #4ade80 100%)',
              borderRadius: '3px 3px 0 0',
              boxShadow: '0 0 8px rgba(52,211,153,0.2)',
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : { height: 0 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          />
        </div>
      ))}
    </div>
  );
}

export default function SalesReportCards() {
  return (
    <div style={{
      background: 'linear-gradient(160deg, #040809 0%, #050f0a 40%, #060a05 70%, #070909 100%)',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px',
      gap: 14,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Card 1: Candlestick */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(52,211,153,0.14)' }}
        style={{
          width: '100%',
          maxWidth: 480,
          background: 'linear-gradient(135deg, #07100a 0%, #0c1a0f 100%)',
          border: '1px solid rgba(52,211,153,0.1)',
          borderRadius: 18,
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          cursor: 'pointer',
        }}
      >
        <div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Sales Report</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.025em', lineHeight: 1 }}>
              $<Counter value={9134} />
            </span>
            <motion.span
              style={{ fontSize: 13, color: '#34d399', fontWeight: 600 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >↑2.5%</motion.span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>Avg. score $185,301</p>
        </div>
        <div style={{ width: 150, flexShrink: 0 }}>
          <CandlestickChart />
        </div>
      </motion.div>

      {/* Card 2: Segmented bars */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(52,211,153,0.14)' }}
        style={{
          width: '100%',
          maxWidth: 480,
          background: 'linear-gradient(135deg, #070f08 0%, #0b1a0d 100%)',
          border: '1px solid rgba(52,211,153,0.08)',
          borderRadius: 18,
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          cursor: 'pointer',
        }}
      >
        <div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Sales Report</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.025em', lineHeight: 1 }}>
              $<Counter value={9134} />
            </span>
            <motion.span
              style={{ fontSize: 13, color: '#34d399', fontWeight: 600 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            >↑2.5%</motion.span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>Avg. score $185,301</p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <SegmentedBars />
        </div>
      </motion.div>

      {/* Card 3: 3D bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(52,211,153,0.14)' }}
        style={{
          width: '100%',
          maxWidth: 480,
          background: 'linear-gradient(135deg, #060e07 0%, #0a1a0b 100%)',
          border: '1px solid rgba(52,211,153,0.08)',
          borderRadius: 18,
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Bars3D />
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Sales Report</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.025em', lineHeight: 1 }}>
              $<Counter value={9134} />
            </span>
            <motion.span
              style={{ fontSize: 13, color: '#34d399', fontWeight: 600 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
            >↑2.5%</motion.span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>Avg. score $185,301</p>
        </div>
      </motion.div>
    </div>
  );
}
