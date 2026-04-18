import { Metadata } from "next";
import Link from "next/link";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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

      <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* Back Button */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 mb-8 text-sm font-mono transition-colors hover:opacity-70"
            style={{ color: "var(--primary)" }}
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>

          {/* Blog Post Header */}
          <header className="mb-12">
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-dm-serif-text)",
                  }}
                >
                  {post.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono" style={{ color: "var(--muted-foreground)" }}>
                  By {post.author || "Mohammed Sahil Khan"}
                </span>
                <span className="text-sm font-mono" style={{ color: "var(--muted-foreground)" }}>
                  {formatDate(post.date)}
                </span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full border"
                      style={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        color: "var(--muted-foreground)",
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
          <article className="prose prose-invert max-w-none">
            <div
              className="prose-content text-base leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              {post.content.split("\n").map((line, idx) => {
                if (line.startsWith("# ")) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl font-bold mt-8 mb-4"
                      style={{
                        color: "var(--foreground)",
                        fontFamily: "var(--font-dm-serif-text)",
                      }}
                    >
                      {line.replace("# ", "")}
                    </h2>
                  );
                } else if (line.startsWith("## ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-semibold mt-6 mb-3"
                      style={{
                        color: "var(--foreground)",
                        fontFamily: "var(--font-dm-serif-text)",
                      }}
                    >
                      {line.replace("## ", "")}
                    </h3>
                  );
                } else if (line.startsWith("- ")) {
                  return (
                    <li key={idx} className="ml-6 mb-2">
                      {line.replace("- ", "")}
                    </li>
                  );
                } else if (line.startsWith("```")) {
                  return null; // Handle code blocks separately
                } else if (line.trim() === "") {
                  return <div key={idx} className="h-4" />;
                } else {
                  return (
                    <p key={idx} className="mb-4">
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          </article>

          {/* Footer Navigation */}
          <div
            className="h-px my-12"
            style={{ backgroundColor: "var(--border)" }}
          />
          <div className="flex justify-center">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--primary)",
              }}
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
