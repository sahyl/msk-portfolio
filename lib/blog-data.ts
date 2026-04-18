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
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    date: "2024-01-15",
    excerpt:
      "Learn the fundamentals of React and build your first interactive application.",
    content: `
# Getting Started with React

React is a powerful JavaScript library for building user interfaces with reusable components. This guide will walk you through the essentials.

## What is React?

React allows you to create dynamic, interactive user interfaces by breaking them down into small, reusable pieces called components. Each component manages its own state and can be composed with other components to build complex UIs.

## Key Concepts

### Components
Components are the building blocks of React applications. They can be functional or class-based, though functional components with hooks are now the standard.

### JSX
JSX is a syntax extension that looks like HTML but gets compiled to JavaScript. It makes writing UI code more intuitive and readable.

### State and Props
- **Props** are immutable data passed from parent to child components
- **State** is mutable data that changes within a component

### Hooks
Hooks like \`useState\`, \`useEffect\`, and \`useContext\` allow you to use state and other React features in functional components.

## Getting Started

To create a new React application:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

Or with Vite for faster development:

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

## Your First Component

\`\`\`jsx
function Welcome() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Next Steps

- Learn about component lifecycle
- Master hooks and state management
- Explore routing with React Router
- Study performance optimization techniques

React opens up endless possibilities for building interactive web applications. Start small, practice consistently, and build amazing things!
    `,
    author: "Mohammed Sahil Khan",
    tags: ["React", "JavaScript", "Web Development"],
  },
  {
    id: "2",
    slug: "mastering-typescript",
    title: "Mastering TypeScript",
    date: "2024-01-22",
    excerpt:
      "Discover how TypeScript can improve your JavaScript code with static typing and better tooling.",
    content: `
# Mastering TypeScript

TypeScript is a superset of JavaScript that adds static typing. It helps catch errors early and makes code more maintainable and self-documenting.

## Why TypeScript?

### Benefits
- **Type Safety**: Catch errors before runtime
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Documentation**: Types serve as inline documentation
- **Scalability**: Easier to maintain large codebases

## Basic Types

TypeScript provides several basic types you should know:

\`\`\`typescript
let name: string = "John";
let age: number = 25;
let isDeveloper: boolean = true;
let hobbies: string[] = ["coding", "gaming"];
let data: any = "can be anything";
\`\`\`

## Interfaces

Interfaces define contracts for objects:

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string; // optional property
}

function greetUser(user: User) {
  console.log(\`Hello, \${user.name}!\`);
}
\`\`\`

## Generics

Generics allow you to write flexible, reusable code:

\`\`\`typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = getFirstElement([1, 2, 3]);
const firstStr = getFirstElement(["a", "b", "c"]);
\`\`\`

## Advanced Features

### Union Types
\`\`\`typescript
type ID = string | number;
\`\`\`

### Type Guards
\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
\`\`\`

## Best Practices

1. Use strict mode in tsconfig.json
2. Enable "noImplicitAny" to catch untyped variables
3. Use descriptive type names
4. Leverage utility types like Partial, Record, and Pick

TypeScript transforms JavaScript development. Start using it today and experience more confident, maintainable code!
    `,
    author: "Mohammed Sahil Khan",
    tags: ["TypeScript", "JavaScript", "Web Development"],
  },
  {
    id: "3",
    slug: "web-performance-optimization",
    title: "Web Performance Optimization",
    date: "2024-02-05",
    excerpt:
      "Essential techniques to make your web applications faster and provide a better user experience.",
    content: `
# Web Performance Optimization

Web performance is critical for user experience and SEO. Slow websites lead to higher bounce rates and lower conversion. Here's how to optimize your web applications.

## Core Web Vitals

Google's Core Web Vitals are three metrics that measure user experience:

### LCP (Largest Contentful Paint)
Time it takes for the largest content element to render. Target: < 2.5 seconds

### FID (First Input Delay)
Time from user interaction to response. Target: < 100ms

### CLS (Cumulative Layout Shift)
Measure of unexpected layout shifts. Target: < 0.1

## Performance Optimization Strategies

### 1. Image Optimization
- Use modern formats like WebP
- Implement lazy loading
- Compress images appropriately
- Use responsive images with srcset

### 2. Code Splitting
\`\`\`javascript
// Instead of one large bundle
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
\`\`\`

### 3. Caching Strategies
- Browser caching with proper Cache-Control headers
- Service workers for offline support
- CDN for static assets
- Database query caching

### 4. CSS and JavaScript Optimization
- Minify and compress files
- Remove unused CSS with tools like PurgeCSS
- Defer non-critical JavaScript
- Inline critical CSS

### 5. Network Optimization
- Enable Gzip compression
- Use HTTP/2 or HTTP/3
- Implement request batching
- Minimize third-party scripts

## Tools for Measurement

- **Lighthouse**: Google's performance audit tool
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Performance monitoring and optimization
- **Bundle Analyzer**: Analyze bundle size

## Quick Wins

1. Optimize images immediately
2. Enable compression
3. Defer JavaScript loading
4. Implement lazy loading
5. Use a CDN

Performance optimization is a continuous process. Monitor metrics regularly and iterate on improvements!
    `,
    author: "Mohammed Sahil Khan",
    tags: ["Performance", "Optimization", "Web Development"],
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
