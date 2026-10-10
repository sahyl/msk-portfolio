import { Metadata } from "next";
import Link from "next/link";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/CodeBlock";

type Props = { params: Promise<{ slug: string }> };
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://sahilkhan.dev").replace(/\/$/, "");
export function generateStaticParams() {
  return getAllBlogPosts().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const url = `${baseUrl}/blog/${post.slug}`;
  return {
    title: `${post.title} | Sahil Khan`, description: post.excerpt,
    authors: [{ name: post.author, url: baseUrl }],
    alternates: { canonical: url },
    openGraph: { type: "article", title: post.title, description: post.excerpt,
      url, siteName: "Sahil Khan", publishedTime: post.date, authors: [post.author], images: [] },
    twitter: { card: "summary", title: post.title, description: post.excerpt, images: [] },
  };
}
function Diagram({ text }: { text: string }) {
  const [title, ...steps] = text.trim().split("\n");
  return <figure className="my-8 rounded-xl border p-4 sm:p-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
    <figcaption className="font-semibold mb-5 text-center">{title}</figcaption>
    <ol className="list-none m-0 p-0 flex flex-col items-center">
      {steps.map((step, index) => {
        const [label, detail] = step.split("|").map(s => s.trim());
        return <li key={step} className="w-full max-w-md text-center">
          {index > 0 && <div className="py-2 text-xl" aria-hidden="true">↓</div>}
          <div className="rounded-lg border px-4 py-3" style={{ borderColor: "var(--primary)", background: "var(--background)" }}>
            <span className="block text-sm font-semibold">{label}</span>
            <span className="block text-sm mt-1 opacity-80">{detail}</span>
          </div>
        </li>;
      })}
    </ol>
  </figure>;
}
export default async function BlogPost({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const url = `${baseUrl}/blog/${post.slug}`;
  const related = getAllBlogPosts().filter(p => p.slug !== post.slug);
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: post.excerpt, datePublished: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url }, url,
    author: { "@type": "Person", name: post.author, url: baseUrl }, inLanguage: "en" };
  return <main className="min-h-screen px-4 pt-28 pb-12" style={{ color: "var(--foreground)", background: "var(--background)" }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div className="max-w-3xl mx-auto">
      <Link href="/#blog" className="text-sm underline underline-offset-4">← All posts</Link>
      <header className="mt-8 mb-10 border-b pb-8" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight break-words">{post.title}</h1>
        <p className="mt-5 text-base leading-7 opacity-80">{post.excerpt}</p>
        <p className="mt-5 text-sm">By {post.author} · <time dateTime={post.date}>{new Date(post.date + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></p>
        <div className="flex flex-wrap gap-2 mt-4">{post.tags.map(tag => <span key={tag} className="text-xs border rounded-full px-3 py-1" style={{ borderColor: "var(--border)" }}>{tag}</span>)}</div>
      </header>
      <article className="min-w-0 text-base leading-7 [overflow-wrap:anywhere]">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
          h2: ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-4 leading-snug">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>,
          p: ({ children }) => <p className="mb-5">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
          a: ({ children, href }) => <a href={href} className="underline underline-offset-4 hover:opacity-75">{children}</a>,
          pre: ({ children }) => <div className="min-w-0">{children}</div>,
          code: ({ className, children }) => {
            const language = /language-(\w+)/.exec(className || "")?.[1];
            const text = String(children).replace(/\n$/, "");
            if (language === "diagram") return <Diagram text={text} />;
            if (language) return <CodeBlock code={text} language={language} />;
            return <code className="rounded px-1.5 py-0.5 text-sm" style={{ background: "var(--card)" }}>{children}</code>;
          },
        }}>{post.content}</ReactMarkdown>
      </article>
      <aside className="mt-12 border-t pt-8" style={{ borderColor: "var(--border)" }} aria-label="Related articles">
        <h2 className="text-xl font-semibold mb-4">Keep reading</h2>
        <ul className="space-y-3">{related.map(p => <li key={p.slug}><Link className="underline underline-offset-4" href={`/blog/${p.slug}`}>{p.title}</Link></li>)}</ul>
      </aside>
    </div>
  </main>;
}
