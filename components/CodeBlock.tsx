'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const [copyError, setCopyError] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyError(false);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  return (
    <div className="relative min-w-0 rounded-lg overflow-hidden my-6 group">
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
      >
        <span className="text-xs opacity-70">{language}</span>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded transition-all duration-200"
          style={{
            backgroundColor: "var(--card)",
            color: copied ? "var(--primary)" : "var(--muted-foreground)",
          }}
          aria-label={copied ? "Copied!" : "Copy code"}
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check size={18} />
          ) : (
            <Copy size={18} />
          )}
        </button>
      </div>

      {copyError && <p role="status" className="px-4 text-sm">Could not copy. Select the code and copy it manually.</p>}
      <pre
        className="p-4 overflow-x-auto text-sm leading-relaxed"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
