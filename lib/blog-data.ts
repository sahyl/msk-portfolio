export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "advanced-react-patterns-concurrent-features",
    title: "Advanced React Patterns: Concurrent Features and Suspense",
    date: "2024-03-15",
    excerpt:
      "Master React's concurrent rendering, Suspense boundaries, and advanced patterns for building scalable applications. Explore use cases and implementation strategies.",
    content: `# Advanced React Patterns: Concurrent Features and Suspense

React 18 introduced concurrent features that fundamentally changed how we build performant applications. This guide explores advanced patterns for leveraging concurrent rendering, Suspense, and transitions to create responsive user experiences at scale.

## Understanding Concurrent Rendering

Concurrent rendering allows React to interrupt long renders and prioritize user interactions. Unlike traditional synchronous rendering, React can pause, abort, or reuse work based on user priorities.

### The Problem with Blocking Renders

Traditional rendering blocks the main thread, causing input lag and janky animations. Long render times prevent the browser from responding to user input, creating a frustrating experience.

### Concurrent Solution with useTransition

\`\`\`jsx
import { useState, useTransition } from 'react';

function SearchUsers() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value);
    startTransition(async () => {
      const data = await fetchUsers(value);
      setResults(data);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users..."
      />
      {isPending && <Spinner />}
      <Results data={results} />
    </div>
  );
}
\`\`\`

## Suspense: Declarative Data Fetching

Suspense allows you to defer rendering of components until they're ready, enabling clean data-fetching patterns without callback hell.

### Suspense with Server Components

\`\`\`jsx
// app/products/page.tsx (Server Component)
import { Suspense } from 'react';
import { ProductList } from './products';
import { ProductSkeleton } from './skeleton';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductList />
    </Suspense>
  );
}

// This component actually fetches data
async function ProductList() {
  const products = await db.products.findAll();
  return (
    <div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
\`\`\`

## Advanced Suspense Patterns

### Selective Hydration

\`\`\`jsx
export default function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<NavigationSkeleton />}>
        <Navigation />
      </Suspense>
      <Suspense fallback={<MainSkeleton />}>
        <Main />
      </Suspense>
    </div>
  );
}
\`\`\`

This allows non-critical sections to render independently without blocking the entire page.

### Nested Suspense Boundaries

Proper boundary placement prevents premature fallback displays:

\`\`\`jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ContentSkeleton />}>
    <MainContent />
  </Suspense>
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
</Suspense>
\`\`\`

## useDeferredValue for Optimistic Updates

\`\`\`jsx
import { useDeferredValue } from 'react';

function FilteredList({ items, query }) {
  const deferredQuery = useDeferredValue(query);
  const filtered = items.filter(item =>
    item.name.includes(deferredQuery)
  );

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ul>
        {filtered.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Best Practices for Concurrent Features

1. **Granular Suspense Boundaries**: Create boundaries at meaningful semantic points
2. **Avoid Waterfall Requests**: Parallel data fetching with Promise.all()
3. **Error Boundaries Required**: Always pair Suspense with error boundaries
4. **Strategic useTransition**: Use for non-critical, user-initiated updates
5. **Monitor Performance**: Measure INP and time-to-interactive metrics

## Performance Considerations

Concurrent features provide significant benefits but require careful planning. Monitor your Core Web Vitals and use React DevTools Profiler to identify bottlenecks. Understanding when to transition and how to structure Suspense boundaries is crucial for optimal performance.

Mastering these patterns positions you to build modern, responsive React applications that handle complex data flows gracefully.
    `,
    author: "Mohammed Sahil Khan",
    tags: ["React", "Concurrency", "Performance", "Advanced"],
  },
  {
    id: "2",
    slug: "typescript-advanced-type-system-patterns",
    title: "TypeScript Advanced Type System: Conditional Types & Inference",
    date: "2024-03-08",
    excerpt:
      "Deep dive into TypeScript's advanced type system. Learn conditional types, type inference, mapped types, and distribution patterns to build type-safe, maintainable applications.",
    content: `# TypeScript Advanced Type System: Conditional Types & Inference

TypeScript's type system is more powerful than most developers realize. Beyond basic types and generics lie advanced patterns like conditional types, type inference, and mapped types that enable building robust, self-documenting APIs.

## Conditional Types: Type-Level Logic

Conditional types allow you to select types based on conditions, creating polymorphic type logic.

### Basic Conditional Type

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>; // false
\`\`\`

### Extracting Union Types

\`\`\`typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number
\`\`\`

## Type Inference with infer

The \`infer\` keyword allows you to extract and infer types from complex structures.

\`\`\`typescript
// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyFunc = (x: number) => string;
type Result = ReturnType<MyFunc>; // string

// Extract Promise resolved value
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Unwrap<Promise<string>>; // string
type PlainNumber = Unwrap<number>; // number
\`\`\`

## Mapped Types for Transformations

Mapped types iterate over object keys and transform their values.

\`\`\`typescript
// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Convert all properties to getters
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// {
//   getName: () => string;
//   getAge: () => number;
// }
\`\`\`

## Distribution in Conditional Types

Conditional types distribute over union types automatically.

\`\`\`typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNum = ToArray<string | number>;
// (string | number)[] - NOT string[] | number[]

// To prevent distribution, wrap in tuples
type ToArrayNoDistribute<T> = [T] extends [any] ? T[] : never;
\`\`\`

## Advanced Pattern: Deep Partial

\`\`\`typescript
type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

interface Config {
  app: {
    name: string;
    port: number;
    database: {
      host: string;
      port: number;
    };
  };
}

type DeepPartialConfig = DeepPartial<Config>;
\`\`\`

## Building Type-Safe Builders

\`\`\`typescript
type Builder<T> = {
  [K in keyof T]-?: (value: T[K]) => Builder<Omit<T, K>>;
} & {
  build(): T;
};

function createBuilder<T>(initial: T): Builder<T> {
  // Implementation creates fluent API
  return null as any;
}

const user = createBuilder({ name: '', email: '' })
  .name('John')
  .email('john@example.com')
  .build();
\`\`\`

## Performance Implications

Complex conditional types can impact compilation time. Use \`type\` aliases for recursive patterns sparingly and consider breaking complex type logic into smaller, reusable units.

## SEO Keywords

Advanced TypeScript patterns enable building scalable, type-safe applications. Master conditional types, type inference, mapped types, and distribution patterns to write maintainable code that scales with your project.

Mastering TypeScript's advanced type system transforms how you build robust, self-documenting APIs and applications.
    `,
    author: "Mohammed Sahil Khan",
    tags: ["TypeScript", "Type System", "Advanced Patterns"],
  },
  {
    id: "3",
    slug: "next-js-performance-optimization-rendering-strategies",
    title: "Next.js Performance Optimization: Server vs Client Rendering Strategies",
    date: "2024-02-28",
    excerpt:
      "Master rendering strategies in Next.js 14+. Learn when to use Server Components, Client Components, ISR, and edge functions to build optimal performance applications.",
    content: `# Next.js Performance Optimization: Rendering Strategies Deep Dive

Next.js 14 introduced the App Router with Server Components as default, fundamentally changing how we approach performance optimization. Understanding when and how to use different rendering strategies is critical for building fast, scalable applications.

## Server Components vs Client Components

Server Components execute only on the server, reducing client-side JavaScript and improving security.

### Server Component Example

\`\`\`jsx
// app/dashboard/page.tsx (Server Component by default)
import { db } from '@/lib/db';

export default async function DashboardPage() {
  const user = await db.user.findUnique({
    where: { id: getCurrentUserId() }
  });

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <UserStats userId={user.id} />
    </div>
  );
}
\`\`\`

### When Client Components Are Necessary

\`\`\`jsx
'use client';

import { useState } from 'react';

export function InteractiveChart({ data }) {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <button onClick={() => setFilter('week')}>
        This Week
      </button>
      <ChartComponent data={data} filter={filter} />
    </div>
  );
}
\`\`\`

## Incremental Static Regeneration (ISR)

ISR combines static generation with dynamic updates at request time, providing the benefits of both.

\`\`\`typescript
// app/blog/[slug]/page.tsx
import { cache } from 'react';

const getBlogPost = cache(async (slug: string) => {
  const post = await db.blogPost.findUnique({
    where: { slug }
  });
  return post;
});

export async function generateStaticParams() {
  const posts = await db.blogPost.findMany();
  return posts.map(post => ({ slug: post.slug }));
}

export const revalidate = 3600; // Regenerate every hour

export default async function BlogPostPage({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(slug);
  return <BlogPost post={post} />;
}
\`\`\`

## Dynamic Rendering with Force Dynamic

\`\`\`typescript
export const dynamic = 'force-dynamic'; // Disables caching

// Or use noStore for granular control
import { noStore } from 'next/cache';

export default async function Page() {
  noStore(); // This request won't be cached
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
\`\`\`

## Route Segment Configuration

\`\`\`typescript
// Combine multiple optimization strategies
export const dynamic = 'auto';
export const revalidate = 60;
export const fetchCache = 'only-cache';
export const runtime = 'edge'; // Use Edge Runtime

export default function Page() {
  // ...
}
\`\`\`

## Edge Functions for Global Performance

\`\`\`typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Runs on Edge - incredibly fast
  const country = request.geo?.country || 'US';
  
  if (country === 'US') {
    return NextResponse.rewrite(new URL('/us', request.url));
  }
  
  return NextResponse.rewrite(new URL('/intl', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
\`\`\`

## Streaming for Progressive Rendering

\`\`\`jsx
import { Suspense } from 'react';
import { User, Posts, Comments } from './components';

export default function Dashboard() {
  return (
    <div>
      <User userId="1" />
      <Suspense fallback={<PostsSkeleton />}>
        <Posts userId="1" />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments userId="1" />
      </Suspense>
    </div>
  );
}
\`\`\`

## Image Optimization with next/image

\`\`\`jsx
import Image from 'next/image';
import img from '@/public/hero.png';

export default function Hero() {
  return (
    <Image
      src={img}
      alt="Hero"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority // LCP image
      placeholder="blur"
    />
  );
}
\`\`\`

## Monitoring and Measurement

Use Next.js Analytics to monitor real user metrics. Combine with tools like Vercel Speed Insights for comprehensive performance visibility across your application.

Understanding these rendering strategies and knowing when to apply each one is fundamental to building high-performance Next.js applications that scale.
    `,
    author: "Mohammed Sahil Khan",
    tags: ["Next.js", "Performance", "Server Components", "Optimization"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
