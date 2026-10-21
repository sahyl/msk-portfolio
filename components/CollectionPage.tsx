import type { ReactNode } from "react";
import { Footer } from "./Footer";

export function CollectionPage({ title, children }: { title: string; children: ReactNode }) {
  return <div className="min-h-screen flex items-center justify-center p-4 print-p-0 relative" style={{ backgroundColor: "var(--card)" }}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#7e7e7e_1.5px,transparent_1px),linear-gradient(to_bottom,#7e7e7e_1.5px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#5f5f5f_1.5px,transparent_1px),linear-gradient(to_bottom,#5f5f5f_1.5px,transparent_1px)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)] blur-sm" />
    <main className="w-full max-w-4xl mt-16 print-shadow-none overflow-hidden border-b-slate-950 rounded-2xl relative z-10" style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-50 [background-size:20px_20px] [background-image:linear-gradient(to_right,#d4d4d4_1.5px,transparent_1.5px),linear-gradient(to_bottom,#d4d4d4_1.5px,transparent_1.5px)] dark:[background-image:linear-gradient(to_right,#4b5563_1px,transparent_1px),linear-gradient(to_bottom,#4b5563_1px,transparent_1px)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_55%,black)] opacity-70 blur-sm" />
      <div className="relative z-10 py-6">
        <h1 className="sr-only">{title}</h1>
        {children}
        <Footer />
      </div>
    </main>
  </div>;
}
