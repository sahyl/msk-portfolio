import { Blog } from "@/components/Blog";
import { CollectionPage } from "@/components/CollectionPage";
import { getAllBlogPosts } from "@/lib/blog-data";

export const metadata = { title: "Blog | Sahil Khan" };

export default function Page() {
  const blogPosts = getAllBlogPosts().map(({ id, slug, title, date }) => ({ id, slug, title, date }));
  return <CollectionPage title="Blog"><Blog blogPosts={blogPosts} /></CollectionPage>;
}
