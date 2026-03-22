'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { Shield, Building2, MoreHorizontal, TrendingUp } from 'lucide-react';

function Counter({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 50, stiffness: 200 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on('change', v => {
      setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString());
    });
  }, [spring, decimals]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function Particles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 37.3) % 100,
    y: (i * 73.1) % 100,
    size: (i % 4) * 0.5 + 0.5,
    duration: (i % 8) + 4,
    delay: (i % 4),
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(52,211,153,0.5)',
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], y: [0, -20, -40] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function BarChart() {
  const bars = [28, 52, 38, 65, 42, 78, 55, 90, 68, 85, 61, 95];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          style={{
            flex: 1,
            background: 'linear-gradient(to top, #34d399, rgba(52,211,153,0.4))',
            borderRadius: '3px 3px 0 0',
            boxShadow: '0 0 8px rgba(52,211,153,0.35)',
          }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : { height: 0 }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        />
      ))}
    </div>
  );
}

function DonutChart({ value = 75 }: { value?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;

  return (
    <div ref={ref} style={{ position: 'relative', width: 70, height: 70 }}>
      <svg viewBox="0 0 70 70" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="35" cy="35" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle
          cx="35" cy="35" r={radius} fill="none" stroke="#34d399"
          strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(52,211,153,0.6))' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif',
      }}>
        {value}
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [40, 35, 45, 30, 50, 38, 55, 42, 60, 48, 65, 52];
  const w = 100, h = 30;
  const min = Math.min(...points), max = Math.max(...points);
  const normalize = (v: number) => h - ((v - min) / (max - min)) * h;
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${normalize(p)}`).join(' ');
  const area = d + ` L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 32, overflow: 'visible' }}>
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)"/>
      <path d={d} fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function FinancialDashboard() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  const card: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] as [number, number, number, number] }
    }),
  };

  return (
    <div ref={containerRef} style={{
      background: '#050508',
      padding: '48px 32px',
      minHeight: '100%',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 12, marginBottom: 12 }}>

        {/* Global Coverage */}
        <motion.div custom={0} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #060e08 0%, #0a1a0e 100%)',
            border: '1px solid rgba(52,211,153,0.12)',
            borderRadius: 14, padding: 20, overflow: 'hidden',
          }}
        >
          <Particles count={20} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 12 }}>
              Institutional Grade Analytics
            </p>
            <div style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', lineHeight: 1, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em', marginBottom: 6 }}>
              <Counter value={100} suffix="%" />
            </div>
            <p style={{ fontSize: 12, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600 }}>
              Global Coverage
            </p>
          </div>
        </motion.div>

        {/* Axiom Capital */}
        <motion.div custom={1} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'white', fontFamily: 'Syne, sans-serif' }}>Axiom Capital</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Active Deployment</p>
              </div>
            </div>
            <MoreHorizontal size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Min: $50k</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
            $<Counter value={14250000} />
            <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginLeft: 6 }}>USD</span>
          </div>
        </motion.div>

        {/* Retail Min */}
        <motion.div custom={2} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Retail Min</p>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em', marginBottom: 8 }}>
            $<Counter value={250000} />
          </div>
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: 10 }} />
          <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
            Threshold for individual accredited accounts.
          </p>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 12 }}>

        {/* Bar Chart */}
        <motion.div custom={3} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Threshold for institutional entities.
          </p>
          <BarChart />
        </motion.div>

        {/* Liquidity Velocity */}
        <motion.div custom={4} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16 }}
        >
          <p style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Liquidity Velocity</p>
          <div style={{ fontSize: 30, fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em', marginBottom: 4 }}>
            &lt; 24h
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Clearance process</p>
        </motion.div>

        {/* Base Yield */}
        <motion.div custom={5} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16 }}
        >
          <p style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Base Yield Rate</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 8 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>1.25%</div>
            <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 5, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399', fontWeight: 600, marginBottom: 3 }}>+4bps</span>
          </div>
          <Sparkline />
        </motion.div>

        {/* Asset Allocation */}
        <motion.div custom={6} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16 }}
        >
          <p style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Asset Allocation</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <DonutChart value={75} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: 8 }}>75/25</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />Debt
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />Equity
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zero Hidden Fees */}
        <motion.div custom={7} variants={card} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: '0 0 20px rgba(52,211,153,0.1)' }}
          >
            <Shield size={20} style={{ color: '#34d399' }} />
          </motion.div>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: 4 }}>Zero Hidden Fees</p>
          <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>Transparent cost structure</p>
        </motion.div>
      </div>
    </div>
  );
}
