'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  code: string;
  language?: string;
}

export function CodeViewer({ code, language = 'tsx' }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      background: '#0d0d14',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#111118',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'monospace',
          }}>
            React + Tailwind CSS
          </span>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              borderRadius: 7,
              border: '1px solid rgba(255,255,255,0.1)',
              background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
              color: copied ? '#34d399' : 'rgba(255,255,255,0.7)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
      </div>

      {/* Code */}
      <div style={{ maxHeight: 600, overflowY: 'auto' }}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '20px 24px',
            background: '#0d0d14',
            fontSize: 13,
            lineHeight: 1.6,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          }}
          showLineNumbers
          lineNumberStyle={{
            color: 'rgba(255,255,255,0.15)',
            userSelect: 'none',
            minWidth: '2.5em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
