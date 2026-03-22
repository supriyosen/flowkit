export const calendarWidgetCode = `'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Clock } from 'lucide-react';

const EVENTS = [
  {
    id: 1,
    title: 'Daily Meeting',
    start: '10:00',
    end: '10:30',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.5)',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    id: 2,
    title: 'Focus Time',
    start: '11:00',
    end: '13:00',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.5)',
    bg: 'rgba(168,85,247,0.08)',
  },
  {
    id: 3,
    title: 'UI Demo',
    start: '13:30',
    end: '14:00',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.5)',
    bg: 'rgba(6,182,212,0.08)',
  },
];

const QUICK_ADD = ['Team Standup', 'Design Review', 'Sprint Planning'];

export default function CalendarWidget() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1b2145 0%, #0e1330 50%, #1b2145 100%)',
        padding: 48,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 420,
          background: 'rgba(16, 20, 42, 0.95)',
          borderRadius: 24,
          padding: 14,
          display: 'flex',
          gap: 14,
          boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.055)',
          backdropFilter: 'blur(24px)',
          position: 'relative',
        }}
      >
        {/* Left date panel */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 158,
            minWidth: 158,
            height: 190,
            background: '#060810',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 18px 18px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Month + Day */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 40,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Oct
            </div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 40,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              30
            </div>
          </motion.div>

          {/* Day + event count */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: 'white',
                marginBottom: 3,
              }}
            >
              Thursday
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>
              6 events
            </div>
          </motion.div>

          {/* Breathing blue glow */}
          <motion.div
            animate={{ opacity: [0.65, 1, 0.65], scaleX: [1, 1.06, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              right: -30,
              height: 110,
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(72,100,255,0.6) 0%, rgba(50,72,230,0.35) 45%, transparent 72%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Right events panel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '6px 2px 6px 0',
            minWidth: 0,
          }}
        >
          {/* UPCOMING label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            Upcoming
          </motion.div>

          {/* Event rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.52,
                  delay: 0.38 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setHovered(ev.id)}
                onHoverEnd={() => setHovered(null)}
                style={{ display: 'flex', gap: 10, alignItems: 'flex-start', position: 'relative', cursor: 'default' }}
              >
                {/* Hover background */}
                <AnimatePresence>
                  {hovered === ev.id && (
                    <motion.div
                      key="bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: 'absolute',
                        inset: '-5px -8px',
                        borderRadius: 10,
                        background: ev.bg,
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Color bar */}
                <motion.div
                  animate={{
                    boxShadow: hovered === ev.id ? \`0 0 7px 1px \${ev.glow}\` : '0 0 0px transparent',
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: 3,
                    minHeight: 38,
                    borderRadius: 3,
                    background: ev.color,
                    flexShrink: 0,
                    marginTop: 1,
                    position: 'relative',
                    zIndex: 1,
                  }}
                />

                {/* Text */}
                <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
                  <motion.div
                    animate={{ color: hovered === ev.id ? 'white' : 'rgba(255,255,255,0.86)' }}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: 1.25,
                      fontFamily: 'Syne, sans-serif',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ev.title}
                  </motion.div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                    <Clock size={10} color="rgba(255,255,255,0.3)" />
                    <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.01em' }}>
                      {ev.start} – {ev.end}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Plus button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.78, type: 'spring', stiffness: 220, damping: 16 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(v => !v)}
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: '#0a0d1a',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            zIndex: 10,
          }}
        >
          {/* Spinning neon ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #34d399 0%, #06b6d4 30%, #6366f1 60%, transparent 75%)',
            }}
          />
          {/* Inner fill */}
          <div
            style={{
              position: 'absolute',
              inset: 2,
              borderRadius: '50%',
              background: '#0a0d1a',
            }}
          />
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={16} color="white" strokeWidth={2.5} />
          </motion.div>
        </motion.button>

        {/* Quick-add popup */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 12 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: 68,
                right: 14,
                background: '#111524',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '14px 18px',
                minWidth: 200,
                boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
                zIndex: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif' }}>
                  Quick Add
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)',
                    padding: '3px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={12} />
                </motion.button>
              </div>

              {QUICK_ADD.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                  whileHover={{ x: 4, color: 'white', backgroundColor: 'rgba(255,255,255,0.04)' }}
                  style={{
                    fontSize: 12.5,
                    color: 'rgba(255,255,255,0.5)',
                    padding: '7px 6px',
                    cursor: 'pointer',
                    borderRadius: 7,
                    borderBottom: i < QUICK_ADD.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: 'rgba(99,102,241,0.7)', fontSize: 14, lineHeight: 1 }}>+</span>
                  {label}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`;
