import React, { useState } from 'react';
import { Copy, Check, Terminal, Info, AlertTriangle, CheckCircle, ShieldAlert, ChevronDown } from 'lucide-react';
import './MdxComponents.css';

export function CodeBlock({ children, code, language = 'text', filename = 'snippet' }) {
  const [copied, setCopied] = useState(false);

  const rawCode = code || (typeof children === 'string' ? children.trim() : String(children || '').trim());

  const handleCopy = () => {
    if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(rawCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        setCopied(false);
      });
    }
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <div className="code-block-controls">
          <span className="traffic-dot traffic-red" />
          <span className="traffic-dot traffic-yellow" />
          <span className="traffic-dot traffic-green" />
        </div>
        <span className="code-block-filename">{String(filename).substring(0, 60)} ({String(language).substring(0, 30)})</span>
        <button className="copy-btn" onClick={handleCopy} title="Copy code snippet">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-block-body">
        <code>{rawCode}</code>
      </pre>
    </div>
  );
}

export function TerminalBlock({ children, code, title = 'BASH TERMINAL' }) {
  const rawContent = code || (typeof children === 'string' ? children.trim() : String(children || '').trim());

  return (
    <div className="terminal-block-container">
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} />
          <span>{String(title).substring(0, 60)}</span>
        </div>
        <span style={{ fontSize: '11px', opacity: 0.7 }}>praman-cli v1.4</span>
      </div>
      <div className="terminal-body">{rawContent}</div>
    </div>
  );
}

export function JsonViewer({ children, code, title = 'JSON RESPONSE' }) {
  const rawContent = code || (typeof children === 'string' ? children.trim() : String(children || '').trim());

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span style={{ color: 'var(--amber)', fontSize: '12px', fontWeight: 600 }}>{String(title).substring(0, 60)}</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>application/json</span>
      </div>
      <pre className="code-block-body" style={{ color: '#FCD34D' }}>
        <code>{rawContent}</code>
      </pre>
    </div>
  );
}

export function Callout({ variant = 'info', title, children }) {
  const icons = {
    info: <Info size={18} color="var(--neon-cyan)" />,
    warning: <AlertTriangle size={18} color="var(--amber)" />,
    success: <CheckCircle size={18} color="var(--green)" />,
    security: <ShieldAlert size={18} color="var(--red)" />
  };

  const safeVariant = ['info', 'warning', 'success', 'security'].includes(variant) ? variant : 'info';

  return (
    <div className={`callout-box ${safeVariant}`}>
      <div className="callout-title">
        {icons[safeVariant]}
        <span>{title ? String(title).substring(0, 100) : safeVariant.toUpperCase()}</span>
      </div>
      <div className="callout-body">{children}</div>
    </div>
  );
}

export function ExpandableSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable-container">
      <div className="expandable-summary" onClick={() => setIsOpen(!isOpen)}>
        <span>{String(title || 'Details').substring(0, 100)}</span>
        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>
      {isOpen && <div className="expandable-content">{children}</div>}
    </div>
  );
}

export function MathBlock({ children, formula }) {
  return <div className="math-block">{formula ? String(formula).substring(0, 200) : children}</div>;
}

export function DataTable({ headers = [], rows = [] }) {
  const safeHeaders = Array.isArray(headers) ? headers : [];
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {safeHeaders.map((h, i) => <th key={i}>{String(h)}</th>)}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((row, idx) => (
            <tr key={idx}>
              {Array.isArray(row) && row.map((cell, cidx) => <td key={cidx}>{String(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ApiExample({ method = 'POST', url = '/v1/verify', children }) {
  const safeMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method) ? method : 'POST';

  return (
    <div className="api-example">
      <div className="api-header">
        <span className={`api-method ${safeMethod}`}>{safeMethod}</span>
        <span className="api-url">https://api.praman.network{String(url).substring(0, 100)}</span>
      </div>
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  );
}

export const mdxComponents = {
  CodeBlock,
  TerminalBlock,
  JsonViewer,
  Callout,
  ExpandableSection,
  MathBlock,
  DataTable,
  ApiExample,
  h2: (props) => <h2 className="heading-lg" style={{ marginTop: '40px', marginBottom: '20px' }} {...props} />,
  h3: (props) => <h3 className="heading-md" style={{ marginTop: '32px', marginBottom: '16px' }} {...props} />,
  p: (props) => <p style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)' }} {...props} />,
  hr: () => <hr style={{ border: 'none', height: '1px', background: 'linear-gradient(to right, transparent, var(--border-hover), transparent)', margin: '40px 0' }} />,
  ul: (props) => <ul style={{ paddingLeft: '24px', marginBottom: '20px', color: 'var(--text-secondary)' }} {...props} />,
  li: (props) => <li style={{ marginBottom: '8px' }} {...props} />,
  pre: ({ children }) => {
    if (children && children.props && children.props.className) {
      const lang = children.props.className.replace('language-', '');
      return <CodeBlock language={lang} code={children.props.children} />;
    }
    return <pre>{children}</pre>;
  }
};
