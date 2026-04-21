'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden my-6 group">
      <div
        className="absolute top-3 right-3 z-10"
      >
        <button
          onClick={copyToClipboard}
          className="p-2 rounded transition-all duration-200"
          style={{
            backgroundColor: "var(--card)",
            color: copied ? "var(--primary)" : "var(--muted-foreground)",
          }}
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check size={18} />
          ) : (
            <Copy size={18} />
          )}
        </button>
      </div>

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
