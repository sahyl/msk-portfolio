import { getAllBlogPosts } from "@/lib/blog-data";
import ClientPage from "./client-page";
import GitHubGridWrapper from "@/components/GitHubGridWrapper";

export default function Home() {
  const blogPosts = getAllBlogPosts().map(({ id, slug, title, date }) => ({ id, slug, title, date }));
  return (
    <ClientPage blogPosts={blogPosts}>
      <GitHubGridWrapper />
    </ClientPage>
  );
}