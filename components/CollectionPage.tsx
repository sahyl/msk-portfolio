import type { ReactNode } from "react";
import { Footer } from "./Footer";

export function CollectionPage({ title, children }: { title: string; children: ReactNode }) {
  return <main className="min-h-screen overflow-hidden px-4 pt-28 pb-12" style={{ color: "var(--foreground)", background: "var(--background)" }}>
    <div className="max-w-4xl mx-auto">
      <h1 className="sr-only">{title}</h1>
      {children}
      <Footer />
    </div>
  </main>;
}
