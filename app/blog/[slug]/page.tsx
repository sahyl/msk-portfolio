import { Metadata } from "next";
import Link from "next/link";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/CodeBlock";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://msk-portfolio.vercel.app";
  const imageUrl = `${baseUrl}/og-image.jpg`;

  return {
    title: `${post.title} | Mohammed Sahil Khan`,
    description: post.excerpt,
    authors: [{ name: post.author || "Mohammed Sahil Khan" }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "Mohammed Sahil Khan",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    keywords: post.tags || [],
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://msk-portfolio.vercel.app";

  return (
    <>
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: `${baseUrl}/og-image.jpg`,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author || "Mohammed Sahil Khan",
            },
            publisher: {
              "@type": "Organization",
              name: "Mohammed Sahil Khan",
            },
          }),
        }}
      />

      <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ backgroundColor: "var(--card)" }}>
        {/* Outer Grid Background - More pronounced lines */}
        <div
          className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#7e7e7e_1.5px,transparent_1px),linear-gradient(to_bottom,#7e7e7e_1.5px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#5f5f5f_1.5px,transparent_1px),linear-gradient(to_bottom,#5f5f5f_1.5px,transparent_1px)]"
        />

        {/* Radial gradient mask with soft blur */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)] blur-sm"></div>

        <div
          className="w-full max-w-3xl rounded-2xl relative z-10 overflow-hidden"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* Inner Dotted Background */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )}
          />

          {/* Inner radial blur mask */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_55%,black)] opacity-70 blur-sm"></div>

          <div
            className="relative z-10 px-4 sm:px-6 py-12 md:py-16"
          >
          {/* Blog Post Header */}
          <header className="mb-12">
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold mb-2 text-black dark:text-white"
                  style={{
                    fontFamily: "var(--font-dm-serif-text)",
                  }}
                >
                  {post.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-black dark:text-white">
                  By {post.author || "Mohammed Sahil Khan"}
                </span>
                <span className="text-sm font-mono text-black dark:text-white">
                  {formatDate(post.date)}
                </span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full border text-black dark:text-white"
                      style={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              className="h-px my-6"
              style={{ backgroundColor: "var(--border)" }}
            />
          </header>

          {/* Blog Post Content */}
          <article className="max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className="text-3xl font-bold mt-8 mb-4 text-black dark:text-white"
                    style={{
                      fontFamily: "var(--font-dm-serif-text)",
                    }}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    {...props}
                    className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white"
                    style={{
                      fontFamily: "var(--font-dm-serif-text)",
                    }}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    {...props}
                    className="text-xl font-semibold mt-6 mb-3 text-black dark:text-white"
                    style={{
                      fontFamily: "var(--font-dm-serif-text)",
                    }}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    {...props}
                    className="text-lg font-semibold mt-5 mb-2 text-black dark:text-white"
                    style={{
                      fontFamily: "var(--font-dm-serif-text)",
                    }}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    className="mb-4 text-base leading-relaxed text-black dark:text-white"
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    {...props}
                    className="font-semibold text-black dark:text-white"
                  />
                ),
                em: ({ node, ...props }) => (
                  <em
                    {...props}
                    className="italic text-black dark:text-white"
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    {...props}
                    className="list-disc list-inside mb-4 space-y-2 text-black dark:text-white"
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    {...props}
                    className="list-decimal list-inside mb-4 space-y-2 text-black dark:text-white"
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    {...props}
                    className="mb-2 text-black dark:text-white"
                  />
                ),
                code: ({ node, inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "javascript";

                  if (inline) {
                    return (
                      <code
                        {...props}
                        className="px-2 py-1 rounded text-sm font-mono"
                        style={{
                          backgroundColor: "var(--card)",
                          color: "var(--primary)",
                        }}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock
                      code={String(children).replace(/\n$/, "")}
                      language={language}
                    />
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    className="mb-4"
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="underline transition-colors hover:opacity-70"
                    style={{ color: "var(--primary)" }}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-4 pl-4 py-2 my-4 italic text-black dark:text-white"
                    style={{
                      borderColor: "var(--primary)",
                    }}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

            {/* Footer Navigation */}
            <div
              className="h-px my-12"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div className="flex justify-center">
              <Link
                href="/#blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border text-black dark:text-white"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <span>←</span>
                <span>Back to Blog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
